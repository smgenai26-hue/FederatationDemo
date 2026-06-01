# Federation Portal — Client Deployment Workbook

**Organization:** All India Distributors & Retail Federation (AIDR)  
**Project:** Federation Management Portal (production go-live)  
**Document version:** 1.0  
**Purpose:** Checklist of tasks **owned by the client** (registrations, billing, KYC, credentials). Development and deployment are handled separately by your technical team.

**Leadership (1 page):** [CLIENT_DEPLOYMENT_EXECUTIVE_SUMMARY.md](./CLIENT_DEPLOYMENT_EXECUTIVE_SUMMARY.md)

---

## How to use this workbook

1. Assign a **single point of contact (SPOC)** for vendor accounts and DNS.
2. Work through sections in order where possible (see timeline at the end).
3. Mark each row: ☐ Not started · ◐ In progress · ☑ Done
4. Fill **Sign-off** when a section is complete.
5. Hand **Credentials** to your developer via a password manager or encrypted share — never email secrets in plain text.

**Legend**

| Tag | Meaning |
|-----|---------|
| **MIN** | Required for minimum go-live |
| **FULL** | Needed for full feature set (can launch later) |
| **DEV** | Developer implements after client provides access |

---

## Sign-off log

| Section | Client responsible | Target date | Status | Signed |
|---------|-------------------|-------------|--------|--------|
| 0. Organization & legal | | | ☐ | |
| 1. Domain | | | ☐ | |
| 2. Hosting | | | ☐ | |
| 3. SSL & DNS | | | ☐ | |
| 4. Razorpay | | | ☐ | |
| 5. QR strategy | | | ☐ | |
| 6. SMS / OTP | | | ☐ | |
| 7. Email | | | ☐ | |
| 8. WhatsApp | | | ☐ | |
| 9. File storage | | | ☐ | |
| 10. Database | | | ☐ | |
| 11. Admin access policy | | | ☐ | |
| 12. Compliance | | | ☐ | |
| 13. Credentials handoff | | | ☐ | |
| 14. Go-live | | | ☐ | |

---

# Track A — Minimum go-live

*Enough to run the portal with real registration, OTP, payments, and admin use. WhatsApp, advanced QR verification, and heavy reporting can follow in Track B.*

| # | Task | Owner | Status | Notes |
|---|------|-------|--------|-------|
| A1 | Domain registered and DNS access available | Client | ☐ | |
| A2 | Hosting live (Vercel **or** VPS) with HTTPS | Client + DEV | ☐ | |
| A3 | Production database provisioned | Client + DEV | ☐ | |
| A4 | Razorpay KYC complete, **Live** keys issued | Client | ☐ | |
| A5 | SMS provider + DLT OTP template approved | Client | ☐ | |
| A6 | Transactional email domain verified (SPF/DKIM) | Client | ☐ | |
| A7 | Staging UAT signed off | Client | ☐ | |
| A8 | Live launch approved | Client | ☐ | |

---

# Track B — Full features (post go-live or parallel)

| # | Task | Owner | Status | Notes |
|---|------|-------|--------|-------|
| B1 | WhatsApp Business + approved templates | Client | ☐ | |
| B2 | Document storage (S3/R2) for circulars & uploads | Client | ☐ | |
| B3 | Server-side QR verification (if required) | Client + DEV | ☐ | |
| B4 | Razorpay Subscriptions / auto-renewal (if required) | Client + DEV | ☐ | |
| B5 | Real PDF/Excel report export storage | Client + DEV | ☐ | |
| B6 | Meeting QR check-in (if required) | Client + DEV | ☐ | |

---

## Phase 0 — Organization & legal

**Tag:** MIN · **Client SPOC:** _________________________

| ☐ | Task | Details / your answer |
|---|------|----------------------|
| ☐ | Official portal & federation naming confirmed | |
| ☐ | Authorized signatory identified for all vendor KYC | Name: _________________ |
| ☐ | GSTIN, registered address, support phone/email | GSTIN: _________________ |
| ☐ | Membership fees finalized | Annual ₹ ______ · Lifetime ₹ ______ |
| ☐ | Privacy Policy published | URL: _________________ |
| ☐ | Terms of use published | URL: _________________ |
| ☐ | Refund / cancellation policy published | URL: _________________ |
| ☐ | Data retention policy agreed (with advisor if needed) | |

**Sign-off:** _________________ Date: _________

---

## Phase 1 — Domain name registration

**Tag:** MIN · **Registrar:** ☐ GoDaddy ☐ Hostinger ☐ BigRock ☐ Other: _________

| ☐ | Task | Details |
|---|------|---------|
| ☐ | Domain chosen and registered | Domain: _________________ |
| ☐ | Registrar login stored securely | |
| ☐ | Auto-renew enabled | Expiry date: _________ |
| ☐ | Subdomains planned with developer | www · api · staging |
| ☐ | Developer can add DNS records | ☐ Full access ☐ Delegated DNS only |

**Sign-off:** _________________ Date: _________

---

## Phase 2 — Web hosting

**Tag:** MIN · Choose **one** path.

### Option A — Managed hosting (recommended for Next.js)

| ☐ | Task | Provider: _________________ |
|---|------|---------------------------|
| ☐ | Account created in federation / client name | |
| ☐ | Billing method added | |
| ☐ | GitHub repo connected (or dev invited to team) | |
| ☐ | Production environment created | |
| ☐ | Staging environment created (recommended) | |

### Option B — VPS / cloud server

| ☐ | Task | Provider: ☐ AWS ☐ DigitalOcean ☐ Hostinger ☐ Other _______ |
|---|------|-------------------------------------------------------------|
| ☐ | Cloud account created | Account ID: _________ |
| ☐ | Billing alerts configured | Threshold: ₹ / $ _________ |
| ☐ | Server region: India (e.g. Mumbai) | |
| ☐ | Server provisioned | Spec: _________ |
| ☐ | SSH keys saved securely | |
| ☐ | Managed database ordered (if separate) | |

**Sign-off:** _________________ Date: _________

---

## Phase 3 — SSL & DNS

**Tag:** MIN · **Dev provides:** DNS record values

| ☐ | Task | Record type | Host | Value / status |
|---|------|-------------|------|----------------|
| ☐ | Root / www points to hosting | CNAME/A | | |
| ☐ | API subdomain (if used) | | api | |
| ☐ | Staging subdomain (if used) | | staging | |
| ☐ | HTTPS certificate active | | | ☐ Yes |
| ☐ | Email SPF record | TXT | | |
| ☐ | Email DKIM record | TXT/CNAME | | |
| ☐ | Email DMARC record (recommended) | TXT | | |

**Sign-off:** _________________ Date: _________

---

## Phase 4 — Razorpay (payments)

**Tag:** MIN · **Dashboard:** https://dashboard.razorpay.com

| ☐ | Task | Details |
|---|------|---------|
| ☐ | Business account registered (legal entity name) | |
| ☐ | KYC submitted and **approved** | |
| ☐ | Bank account linked for settlements | Account: ****____ |
| ☐ | Payment methods enabled | ☐ UPI ☐ Cards ☐ Netbanking |
| ☐ | **Test** API keys shared with developer (UAT) | Key ID: rzp_test______ |
| ☐ | **Live** API keys shared securely (go-live only) | Key ID: rzp_live______ |
| ☐ | Webhook URL configured (developer provides) | URL: _________________ |
| ☐ | Webhook secret shared securely | |
| ☐ | Authorized redirect URLs whitelisted | |
| ☐ | Accounts team receives settlement reports | Email: _________________ |

### Optional — Recurring membership (Track B)

| ☐ | Razorpay Subscriptions or Payment Links enabled | Plan names: _________________ |
| ☐ | Renewal reminder process agreed | |

**Important:** Key **Secret** must never be pasted in email or committed to GitHub.

**Sign-off:** _________________ Date: _________

---

## Phase 5 — QR codes (strategy — not a paid “QR subscription”)

**Tag:** MIN decision · **FULL** if server verification required

The demo app generates QR codes in the browser (no third-party QR vendor required).

| ☐ | Decision recorded | Choice (circle one) |
|---|-------------------|---------------------|
| ☐ | **Option 1 — Display only** | QR encodes member ID; office verifies manually |
| ☐ | **Option 2 — Server verification** | Scan hits your API; active/expired checked in database |

| ☐ | Task | Track |
|---|------|-------|
| ☐ | Client confirmed QR option with developer | MIN |
| ☐ | If Option 2: API hosting budget approved | FULL |
| ☐ | If Option 2: Fraud / expired-member messaging agreed | FULL |

**Sign-off:** _________________ Date: _________

---

## Phase 6 — SMS & OTP (registration)

**Tag:** MIN · **Provider:** ☐ MSG91 ☐ TextLocal ☐ Kaleyra ☐ Twilio ☐ Other _______

| ☐ | Task | Details |
|---|------|---------|
| ☐ | Business account created | |
| ☐ | **DLT** registration completed (India TRAI) | Entity ID: _________ |
| ☐ | Sender ID approved | Sender: _________ |
| ☐ | OTP SMS template approved | Template ID: _________ |
| ☐ | Credits / plan purchased | |
| ☐ | Test numbers provided for UAT | Numbers: _________________ |
| ☐ | API key shared securely with developer | |

**Sign-off:** _________________ Date: _________

---

## Phase 7 — Email (transactional)

**Tag:** MIN · **Provider:** ☐ Amazon SES ☐ SendGrid ☐ Resend ☐ ZeptoMail ☐ Other _______

| ☐ | Task | Details |
|---|------|---------|
| ☐ | Account created | |
| ☐ | Sending domain verified | Domain: _________________ |
| ☐ | SPF, DKIM (and DMARC) DNS records added | |
| ☐ | From addresses created | noreply@ · accounts@ · |
| ☐ | Templates agreed | Welcome · Receipt · Renewal · Meeting |
| ☐ | API key / SMTP credentials shared securely | |

**Sign-off:** _________________ Date: _________

---

## Phase 8 — WhatsApp notifications

**Tag:** FULL (Track B) · **Provider:** ☐ Meta Cloud API ☐ Gupshup ☐ Interakt ☐ WATI ☐ Other _______

| ☐ | Task | Details |
|---|------|---------|
| ☐ | Meta Business Manager account | |
| ☐ | WhatsApp Business phone number dedicated | Number: _________________ |
| ☐ | Business verification completed | |
| ☐ | Message templates submitted & **approved** | |
| ☐ | Billing / conversation plan active | |
| ☐ | API token, phone number ID shared securely | |
| ☐ | Webhook verify token shared with developer | |

**Sign-off:** _________________ Date: _________

---

## Phase 9 — File storage (documents & circulars)

**Tag:** FULL (Track B) · **Provider:** ☐ AWS S3 ☐ Cloudflare R2 ☐ GCS ☐ Azure Blob

| ☐ | Task | Details |
|---|------|---------|
| ☐ | Bucket created (private) | Name: _________________ |
| ☐ | Region: India / nearest | Region: _________ |
| ☐ | IAM / API keys with least privilege | |
| ☐ | Versioning or backup policy enabled | |
| ☐ | Credentials shared securely with developer | |

**Sign-off:** _________________ Date: _________

---

## Phase 10 — Database

**Tag:** MIN · **Type:** ☐ PostgreSQL ☐ MySQL · **Hosting:** ☐ Managed ☐ On VPS

| ☐ | Task | Details |
|---|------|---------|
| ☐ | Database instance provisioned | Host: _________________ |
| ☐ | Strong password set | |
| ☐ | Access restricted to app server IP only | |
| ☐ | Automated daily backups enabled | Retention: ___ days |
| ☐ | Connection string shared securely (DEV only) | |

**Sign-off:** _________________ Date: _________

---

## Phase 11 — Admin access & roles

**Tag:** MIN

| Role | Real email (production) | Name | Access granted |
|------|-------------------------|------|----------------|
| Super Admin | | | ☐ |
| Accounts | | | ☐ |
| Member (test) | | | ☐ |

| ☐ | Task | |
|---|------|---|
| ☐ | Demo credentials (`admin@federation.com`) retired for production | |
| ☐ | Password reset process defined | ☐ Email OTP ☐ Manual by office |
| ☐ | Optional 2FA for admins approved | ☐ Yes ☐ No |

**Sign-off:** _________________ Date: _________

---

## Phase 12 — Compliance & security

**Tag:** MIN

| ☐ | Item | Status |
|---|------|--------|
| ☐ | Card data never stored on federation servers (Razorpay checkout only) | |
| ☐ | Registration consent for personal data (mobile, GST, documents) | |
| ☐ | Aadhaar handling reviewed with advisor | ☐ Collect ☐ Do not store |
| ☐ | GST invoicing process for membership fees | Owner: _________ |
| ☐ | Security incident contact | Name: _________ Phone: _________ |

**Sign-off:** _________________ Date: _________

---

## Phase 13 — Credentials handoff to developer

**Tag:** MIN before production deploy · Use password manager or encrypted vault.

| Service | Test / staging delivered | Production delivered | Date |
|---------|--------------------------|----------------------|------|
| Domain DNS access | ☐ | ☐ | |
| Hosting deploy access | ☐ | ☐ | |
| Database URL | ☐ | ☐ | |
| Razorpay Key ID + Secret | ☐ | ☐ | |
| Razorpay Webhook Secret | ☐ | ☐ | |
| SMS API + template ID | ☐ | ☐ | |
| Email API / SMTP | ☐ | ☐ | |
| WhatsApp API (Track B) | ☐ | ☐ | |
| Object storage (Track B) | ☐ | ☐ | |

**Client confirmation:** All production secrets handed via secure channel only.  
**Signed:** _________________ **Developer acknowledged:** _________________ **Date:** _________

---

## Phase 14 — Go-live checklist

**Tag:** MIN

| ☐ | Task | Date |
|---|------|------|
| ☐ | Staging URL tested by client team | |
| ☐ | Test payment completed (Razorpay test mode) | |
| ☐ | Live OTP received on real mobile | |
| ☐ | Welcome / receipt email received | |
| ☐ | Razorpay switched to **Live** mode | |
| ☐ | First 10 live payments monitored by accounts | |
| ☐ | Support email & phone visible on portal | |
| ☐ | Internal announcement to members | |

**Go-live approved by:** _________________ **Role:** _________________ **Date:** _________

---

## Budget reference (indicative — verify with vendors)

| Item | Typical range (India) | Frequency |
|------|----------------------|-----------|
| Domain | ₹500 – ₹1,500 | / year |
| Hosting (managed or small VPS) | ₹0 – ₹3,000+ | / month |
| Managed database | ₹1,500 – ₹6,000+ | / month |
| Razorpay | ~2% + GST per transaction | per payment |
| SMS OTP | ₹0.15 – ₹0.30 per SMS + DLT setup | per SMS |
| Email | Free tier – ₹1,000+ | / month |
| WhatsApp | Per Meta conversation pricing | per message |
| Object storage | Often &lt; ₹500 at low volume | / month |

---

## Recommended timeline

```
Week 1–2   Phase 0 (legal) + Phase 1 (domain) + Phase 2 (hosting)
Week 2–3   Phase 3 (DNS/SSL) + Phase 10 (database) + Razorpay KYC started
Week 3–4   Phase 6 (SMS/DLT) + Phase 7 (email DNS)
Week 4–5   Developer staging deploy → client UAT
Week 5–6   Razorpay Live + Phase 14 go-live
Week 6+    Track B: WhatsApp, storage, QR verification API
```

---

## Portal modules vs client setup

| Portal module | Client vendor needed |
|---------------|---------------------|
| Login / roles | Admin emails (MIN); auth built by DEV |
| Dashboard, members, grievances | Database (MIN) |
| Registrations (5-step + OTP) | SMS/DLT (MIN) |
| Payments | Razorpay (MIN) |
| Membership card QR | None for display; API host if verifying (FULL) |
| Circulars / document upload | Object storage (FULL) |
| Notifications page | Email (MIN), SMS (MIN), WhatsApp (FULL) |
| Settings (payment keys) | Razorpay keys (MIN) |
| Reports export | Storage optional (FULL) |

---

## Contact & references

| Role | Name | Email | Phone |
|------|------|-------|-------|
| Client SPOC | | | |
| Technical lead (developer) | | | |
| Accounts / Razorpay | | | |

**Repository (demo):** https://github.com/smgenai26-hue/FederatationDemo  
**Technical guide (developer):** [DEVELOPMENT.md](./DEVELOPMENT.md)

---

*This workbook lists client-owned tasks only. Implementation, code changes, and deployment are out of scope for this document.*
