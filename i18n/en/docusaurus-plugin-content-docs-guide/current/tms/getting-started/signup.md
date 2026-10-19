---
id: signup
title: Signing up and signing in
sidebar_position: 1
---

# Signing up and signing in

Accounts come from one of two places: **you sign up and create a new organization**, or
**an admin invites you** into an existing one. The two see different things after
signing in, so work out which you are first.

## Signing up a new organization

Signing up creates a new organization, and whoever signs up is its **owner** — full
permissions, and the person who invites everyone else.

1. Open the sign-up page and fill in **Organization Information**:
   - **Organization Name** (required) — must be unique platform-wide; a duplicate is
     rejected.
   - **Organization Type** and **Organization Size** — optional, they tell us about
     your business and don't change any behaviour.
2. Carry on into **Administrator Information**: **First Name**, **Last Name**,
   **Email Address**, **Phone Number**, **Password**, **Confirm Password**.
3. Click **Create Account**.

The password rule is enforced on the spot:

> 8–128 characters, with at least one lowercase letter, one uppercase letter, one
> number and one special character.

### Verifying your email

You **cannot sign in yet**. A confirmation email goes out; click the link in it and the
page confirms success and sends you into the system.

An expired or already-used link reports a failed confirmation — ask an admin to resend.

:::tip No email?
Check the spam folder first. Corporate mail servers often hold this kind of message.
:::

### Common sign-up errors

| Message | What it means |
|---|---|
| An account with this email already exists | Go and sign in instead |
| An organization with this name already exists | Pick a different organization name |
| Too many signup attempts | Too many tries too quickly; wait a few minutes |

<Staging source="tms#241">

### When signing up didn't finish

If **Create Account** reports an error, the attempt leaves no half-made account behind:
sign up again with the same email.

If an earlier sign-up created your login but not your organization, signing in takes you
to **Finish setting up your organization**. The page is filled in with what you entered
when you signed up (organization name, type and size, your name). Check it, add your
**Phone Number** and click **Create organization**: you go straight into the system as the
organization's owner. To leave it for later, click **Sign Out**.

"This email already belongs to another account. Please contact support." means another account
already uses this email; contact us to sort it out.

</Staging>

## Being invited into an existing organization

Colleagues don't sign up for their own organization. Someone with the right permission
creates the account under **Settings → Sub Accounts**, the system emails an invitation,
and the recipient follows the link to set their own password.

The invitation link carries your email address in it, so it **must be opened whole**.
Mail clients sometimes wrap long links, and copying half of one produces the
"invalid invitation / missing email address" page. If that happens:

- check the link in the email is complete; or
- ask your admin to send a fresh invitation.

Your permissions are ticked by whoever created the account, not chosen by you. If menus
are missing after you sign in, see [Finding your way around](./navigation).

## Signing in

Sign in with your email and password. **Forgot password?** sends a reset email; follow
the link to set a new one.

Drivers don't use this entrance — they use the mobile scanner, see
[Driver scanning](../driver/scan).
