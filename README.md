# Federation Management Portal

**Demo Prototype** for **All India Distributors & Retail Federation (AIDR)**

A polished localhost demo application for client presentation — showcasing federation workflows, dashboards, member management, registration, payments, and more. **No real backend** — all data is mocked.

**Repository:** https://github.com/smgenai26-hue/FederatationDemo  
**Future development:** See [DEVELOPMENT.md](./DEVELOPMENT.md) for architecture, extension guide, and production roadmap.

**Client go-live:** [Executive summary (1 page)](./CLIENT_DEPLOYMENT_EXECUTIVE_SUMMARY.md) for leadership · [Full workbook](./CLIENT_DEPLOYMENT_WORKBOOK.md) for operations (domain, hosting, Razorpay, SMS/OTP, email, WhatsApp, sign-off).

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Super Admin** | admin@federation.com | admin123 |
| **Accounts** | accounts@federation.com | accounts123 |
| **Member** | member@federation.com | member123 |

Use the **Quick Demo Login** buttons on the login page for one-click access.

---

## Modules

| Module | Route | Description |
|--------|-------|-------------|
| Dashboard | `/dashboard` | Stats, charts, activity feed |
| Members | `/members` | 120+ members, search, filters, QR preview |
| Registrations | `/registrations` | 5-step form with OTP & fake Razorpay |
| Payments | `/payments` | Transaction history & receipts |
| Meetings | `/meetings` | Events, registration, calendar |
| Circulars | `/circulars` | Notices, PDF preview, download |
| Grievances | `/grievances` | Tickets, status, reply thread |
| Reports | `/reports` | Charts & export buttons (demo) |
| Notifications | `/notifications` | Email, SMS, WhatsApp logs |
| Settings | `/settings` | Federation, payment, notification config |
| Membership Card | `/membership-card` | QR digital card |

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ShadCN-style UI** (Radix primitives)
- **Recharts** — dashboards & reports
- **Framer Motion** — animations
- **Lucide Icons**
- **QRCode** — membership cards
- **Sonner** — toast notifications

---

## Project Structure

```
src/
  app/              # Pages & routing
  components/       # UI, layout, feature components
  data/             # Mock data generators
  services/         # Mock API services (with delays)
  hooks/            # Auth & theme providers
  lib/              # Utilities
  types/            # TypeScript interfaces
```

---

## Mock Data

- **120** generated members (Indian names, states, GST)
- **30** payment transactions
- **18** grievance tickets
- **12** circulars
- **8** meetings
- **24** notification logs

---

## Features

- Fake authentication (localStorage)
- Dark mode toggle
- Responsive sidebar (mobile-friendly)
- Fake Razorpay payment popup
- Multi-step registration with OTP demo
- QR membership cards
- Loading skeletons & animations
- Role-based demo users

---

## Important

This is a **client demo prototype only**. It is not production-ready code. No real payments, emails, or backend services are connected.

---

## Build for Production Demo

```bash
npm run build
npm start
```

---

## Save & update the project

```bash
git pull origin main
git add .
git commit -m "Your update message"
git push origin main
```

See [DEVELOPMENT.md](./DEVELOPMENT.md) and [CHANGELOG.md](./CHANGELOG.md) for continuing development after the demo phase.

