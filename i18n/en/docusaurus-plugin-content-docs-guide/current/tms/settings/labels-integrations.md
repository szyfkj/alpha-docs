---
id: labels-integrations
title: Label templates and integrations
sidebar_position: 6
---

# Label templates and integrations

## Label templates

**Settings → Label Templates** manages label layouts.

**Create Template** opens a visual editor. In the list you can **set a default** — what
[printing labels](../waybills/labels) uses unless something else is specified.

Setting the current default again tells you "This template is already set as default".

:::warning
**The default template cannot be deleted** — you get "Cannot delete the default
template". Make another one the default first.
:::

Deleting a template asks for confirmation.

### Template selection rules

**Template Selection Rules**, on the same page, decide which template prints each waybill:
by the waybill's **route**, **service** and the [subcontractor](../partners/subcontractors)
you hand it to.

Click **Add Rule**, set the conditions and pick a **Template**. A condition left at **Any**
matches every waybill, but a rule needs at least one condition. Only one rule can have a
given set of conditions.

When several rules match a waybill, **the rule matching the most conditions wins**; on a tie,
route comes before service, then subcontractor. Waybills no rule matches use the default
template. With no rules, every waybill uses the default template.

A rule with a subcontractor also sets **Subcontractor printing**:

| Option | Effect |
|---|---|
| **Doesn't affect the subcontractor** | Only you print with this template |
| **Subcontractor must print with this template** | The subcontractor prints these labels with your template too |
| **Subcontractor prints its own; relabel with this template at handoff** | The subcontractor uses its own template; the packages are relabelled with yours at handoff |

Templates you had set on a subcontractor before have been turned into rules like these. A
[subcontractor's](../partners/subcontractors#label-templates) details show the rules that
name it.

## Third-party integrations

**Settings → Integrations** configures credentials for third-party carriers and payment
channels.

Each channel is a card. **Channels not in your plan appear locked** — you can see they
exist but not configure them. See the plan gate in
[Finding your way around](../getting-started/navigation).

What you enter are the credentials that provider gave you. Once saved, services can
order through that channel.

:::note
Connecting **your own** system to TMS is the other direction — use the keys under
**Settings → Organization → API Credentials**, and see the
[Developer Guide](/tms/authentication).
:::
