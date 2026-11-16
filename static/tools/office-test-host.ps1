#Requires -RunAsAdministrator
<#
  Windows test host for mobile development: WeChat DevTools and an Android phone
  on USB, driven from a Linux machine over Tailscale (SSH, plus a remote adb server).

  Download and run in an elevated PowerShell:
    irm https://docs.alphacargo.io/tools/office-test-host.ps1 -OutFile setup.ps1
    Set-ExecutionPolicy -Scope Process Bypass
    .\setup.ps1 -PublicKey (Get-Content .\keys.pub -Raw)

  It installs Git, GitHub CLI, Node LTS + pnpm, Tailscale, adb, scrcpy and
  WeChat DevTools (winget); enables key-only OpenSSH with PowerShell as the shell;
  opens SSH (22) and adb (5037) to -AllowFrom only; runs the adb server at startup
  for remote clients; and disables sleep on AC power.

  Safe to re-run. Keep this file ASCII-only: Windows PowerShell 5.1 reads a .ps1
  without a BOM in the system code page, which would mangle any non-ASCII text.
#>
param(
  # One OpenSSH public key per line: the machines allowed to log in over SSH.
  [Parameter(Mandatory = $true)]
  [string]$PublicKey,

  # Who may reach SSH (22) and the adb server (5037). Default: the whole tailnet.
  # Narrow it to the machines that need it, e.g. -AllowFrom 100.x.y.z
  [string[]]$AllowFrom = @('100.64.0.0/10')
)

$ErrorActionPreference = 'Stop'

function Step($msg) { Write-Host "`n==> $msg" -ForegroundColor Cyan }

function Install-Winget($id) {
  $listed = winget list --id $id -e --accept-source-agreements 2>$null | Select-String -SimpleMatch $id
  if ($listed) {
    Write-Host "  $id already installed"
  } else {
    winget install --id $id -e --silent --accept-package-agreements --accept-source-agreements
    if ($LASTEXITCODE -ne 0) { throw "winget install $id failed ($LASTEXITCODE)" }
  }
}

function Add-MachinePath($dir) {
  $path = [Environment]::GetEnvironmentVariable('Path', 'Machine')
  if (($path -split ';') -notcontains $dir) {
    [Environment]::SetEnvironmentVariable('Path', "$path;$dir", 'Machine')
  }
}

function Refresh-Path {
  $env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' +
              [Environment]::GetEnvironmentVariable('Path', 'User')
}

# ---------------------------------------------------------------- packages
Step 'Installing packages'
@(
  'Git.Git',
  'GitHub.cli',
  'OpenJS.NodeJS.LTS',
  'Tailscale.Tailscale',
  'Google.PlatformTools',     # adb
  'Genymobile.scrcpy',        # phone screen mirroring
  'Tencent.WeixinDevTools'    # WeChat DevTools
) | ForEach-Object { Install-Winget $_ }
Refresh-Path

Step 'Enabling pnpm via corepack'
corepack enable pnpm

Step 'Putting the WeChat DevTools CLI on PATH'
# The install folder has a Chinese name; find it rather than spelling it here.
$tencent = Join-Path ${env:ProgramFiles(x86)} 'Tencent'
$cli = Get-ChildItem $tencent -Filter cli.bat -Recurse -Depth 2 -ErrorAction SilentlyContinue |
  Select-Object -First 1
if (-not $cli) {
  $tencent = Join-Path $env:ProgramFiles 'Tencent'
  $cli = Get-ChildItem $tencent -Filter cli.bat -Recurse -Depth 2 -ErrorAction SilentlyContinue |
    Select-Object -First 1
}
if ($cli) {
  Add-MachinePath $cli.DirectoryName
  Refresh-Path
  Write-Host "  cli.bat found in $($cli.DirectoryName)"
} else {
  Write-Warning 'cli.bat not found under Program Files\Tencent. Install WeChat DevTools by hand and re-run.'
}

# ---------------------------------------------------------------- SSH
Step 'OpenSSH server'
if ((Get-WindowsCapability -Online -Name 'OpenSSH.Server*').State -ne 'Installed') {
  Add-WindowsCapability -Online -Name 'OpenSSH.Server~~~~0.0.1.0' | Out-Null
}
Set-Service sshd -StartupType Automatic
Start-Service sshd

# Keys for administrators live in one shared file, which sshd ignores unless only
# Administrators and SYSTEM can read it.
$authKeys = 'C:\ProgramData\ssh\administrators_authorized_keys'
$existing = @()
if (Test-Path $authKeys) { $existing = @(Get-Content $authKeys | ForEach-Object { $_.Trim() }) }
$PublicKey -split "`r?`n" | ForEach-Object { $_.Trim() } |
  Where-Object { $_ -and ($existing -notcontains $_) } |
  ForEach-Object { Add-Content -Path $authKeys -Value $_ -Encoding ascii }
icacls $authKeys /inheritance:r /grant 'Administrators:F' /grant 'SYSTEM:F' | Out-Null

# Keys only.
$sshdConfig = 'C:\ProgramData\ssh\sshd_config'
$cfg = @(Get-Content $sshdConfig)
if ($cfg -match '^\s*#?\s*PasswordAuthentication\b') {
  $cfg = $cfg -replace '^\s*#?\s*PasswordAuthentication\b.*', 'PasswordAuthentication no'
} else {
  $cfg = @('PasswordAuthentication no') + $cfg   # before any Match block
}
Set-Content -Path $sshdConfig -Value $cfg -Encoding ascii

# PowerShell as the login shell.
New-ItemProperty -Path 'HKLM:\SOFTWARE\OpenSSH' -Name DefaultShell `
  -Value "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe" `
  -PropertyType String -Force | Out-Null
Restart-Service sshd

# ---------------------------------------------------------------- firewall
Step "Firewall: SSH and adb only from $($AllowFrom -join ', ')"
# The capability adds a rule open to everyone; narrow it.
Get-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -ErrorAction SilentlyContinue |
  Set-NetFirewallRule -RemoteAddress $AllowFrom
foreach ($r in @(@{ Name = 'alpha-ssh'; Port = 22 }, @{ Name = 'alpha-adb'; Port = 5037 })) {
  Remove-NetFirewallRule -Name $r.Name -ErrorAction SilentlyContinue
  New-NetFirewallRule -Name $r.Name -DisplayName $r.Name -Direction Inbound -Protocol TCP `
    -LocalPort $r.Port -RemoteAddress $AllowFrom -Action Allow | Out-Null
}

# ---------------------------------------------------------------- adb server
Step 'adb server for remote clients (the phone stays on USB here)'
$adb = (Get-Command adb).Source
$action   = New-ScheduledTaskAction -Execute $adb -Argument '-a -P 5037 nodaemon server start'
$trigger  = New-ScheduledTaskTrigger -AtStartup
$settings = New-ScheduledTaskSettingsSet -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 1) `
  -ExecutionTimeLimit ([TimeSpan]::Zero) -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName 'alpha-adb-server' -Action $action -Trigger $trigger `
  -Settings $settings -User 'SYSTEM' -RunLevel Highest -Force | Out-Null
& $adb kill-server 2>$null
Start-ScheduledTask -TaskName 'alpha-adb-server'

# ---------------------------------------------------------------- power
Step 'Never sleep on AC power'
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0

# ---------------------------------------------------------------- done
Step 'Done. Manual steps left:'
Write-Host @"
  1. Tailscale: sign in from the tray icon, name the machine (e.g. office-test),
     and disable key expiry for it in the admin console.
  2. Phone: USB debugging on, plug in, accept the prompt with 'Always allow'.
  3. WeChat DevTools: open it, scan the login QR code, and turn on the
     service port (Settings > Security).
  4. Windows: sign this account in automatically (netplwiz).
"@
