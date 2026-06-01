# Federation Portal — Executive Summary (Leadership)

**For:** AIDR / Federation leadership · **Purpose:** Go-live decisions and approvals · **Detail checklist:** [CLIENT_DEPLOYMENT_WORKBOOK.md](./CLIENT_DEPLOYMENT_WORKBOOK.md)

---

## What we are launching

A **membership portal** for distributors and retailers: online registration, fee collection, digital membership cards (QR), member records, circulars, grievances, meetings, and admin reporting. The current build is a **working demo**; production requires **vendor accounts, a domain, hosting, and payment/SMS services** funded and owned by the federation.

---

## Leadership decisions required (before work starts)

| # | Decision | Options / recommendation |
|---|----------|-------------------------|
| 1 | **Go-live scope** | **Phase 1 (recommended):** Portal + registration + OTP + Razorpay + email. **Phase 2:** WhatsApp alerts, document storage, advanced QR scan-verification, auto-renewal. |
| 2 | **Official domain** | e.g. `aidrfederation.in` — register in federation name; budget ~₹500–₹1,500/year. |
| 3 | **Membership fees** | Confirm annual and lifetime amounts (demo used ₹5,000 / ₹25,000). |
| 4 | **Authorized signatory** | One person for Razorpay KYC, SMS (DLT), and cloud accounts. |
| 5 | **Legal pages** | Privacy, terms, refund policy — required for payments and public signup. |
| 6 | **Admin access** | Who is Super Admin and Accounts in production (real emails, not demo logins). |

---

## What leadership does *not* need to operate day-to-day

Technical build, hosting setup, and API integration are handled by your **development team** after leadership completes registrations and hands credentials securely. Leadership role: **approve budget, sign KYC, assign SPOC, sign off UAT, approve go-live date.**

---

## Estimated cost (indicative)

| Item | Rough cost | Who pays |
|------|------------|----------|
| Domain | ₹500–₹1,500 / year | Federation |
| Hosting + database | ₹2,000–₹8,000 / month (scales with traffic) | Federation |
| Razorpay | ~2% + GST per successful payment | Deducted from collections |
| SMS (OTP & alerts) | ~₹0.15–₹0.30 per SMS + one-time DLT setup | Federation |
| Email | Often low at start; ₹0–₹1,000 / month | Federation |
| WhatsApp (Phase 2) | Per-message / monthly plan to Meta or partner | Federation |
| Development / maintenance | Per your contract with vendor | Federation |

**Phase 1 startup (excl. development):** often **₹5,000–₹15,000** one-time setup + **₹3,000–₹10,000/month** running costs at modest scale.

---

## Timeline (typical)

| Weeks | Leadership / federation | Outcome |
|-------|-------------------------|---------|
| 1–2 | Appoint SPOC; register domain; start Razorpay KYC; approve legal text | Accounts opened |
| 2–4 | Complete KYC; SMS DLT registration; approve fees and admin users | Vendors ready |
| 4–5 | **UAT on staging** — leadership tests registration & payment | Sign-off sheet |
| 5–6 | Approve **go-live**; switch to live payments | Public portal live |
| 6+ | Phase 2: WhatsApp, document archive, optional QR verification | Full feature set |

---

## Risks if delayed or skipped

- **No Razorpay KYC** → cannot collect real membership fees online.  
- **No SMS DLT (India)** → cannot send legal OTP for mobile verification.  
- **No privacy/terms** → compliance and payment-gateway risk.  
- **Shared demo passwords in production** → security breach; must use real admin accounts only.

---

## Single point of contact (fill in)

| Role | Name | Phone | Email |
|------|------|-------|-------|
| Federation SPOC (vendors & DNS) | | | |
| President / signatory for KYC | | | |
| Accounts (Razorpay settlements) | | | |
| Technical vendor | | | |

---

## Go-live approval (leadership sign-off)

| Item | Approved ☐ | Name | Date |
|------|-------------|------|------|
| Phase 1 scope and budget | | | |
| Membership fee structure | | | |
| Domain name: _________________________ | | | |
| Staging UAT completed satisfactorily | | | |
| **Authorize public launch** | | | |

---

*One page — March 2026. Operational steps and vendor checklists are in the full [Client Deployment Workbook](./CLIENT_DEPLOYMENT_WORKBOOK.md).*
