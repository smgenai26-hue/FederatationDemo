# Development Guide — Federation Management Portal

This document preserves how the project is built so you can continue development after the demo phase.

**Repository:** https://github.com/smgenai26-hue/FederatationDemo  
**Current phase:** Demo prototype (mock data, no real backend)

---

## Prerequisites

- Node.js 18+ (tested on v22)
- npm 9+

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
npm run lint     # ESLint
```

If port 3000 is blocked: `npx next dev -p 3001`

---

## Architecture Overview

```
Browser
   │
   ▼
Next.js App Router (src/app/)
   │
   ├── (portal)/          # Authenticated pages (sidebar layout)
   ├── login/             # Public login
   └── providers.tsx      # AuthGuard + Theme + Toasts
   │
   ▼
React hooks (useAuth, useTheme)
   │
   ▼
Services (src/services/*.service.ts)  ← Replace with real APIs here
   │
   ▼
Mock data (src/data/) + generators
```

### Key design decisions

| Area | Current (demo) | Production path |
|------|----------------|-----------------|
| Auth | `localStorage` + `auth.service.ts` | NextAuth, JWT, or session cookies |
| Data | In-memory generators | REST/GraphQL API + database |
| Payments | `RazorpayModal` fake UI | Real Razorpay SDK + webhooks |
| Files | Click-to-upload toasts | S3 / cloud storage |
| Notifications | Static logs | SMS/email/WhatsApp providers |

---

## Folder map

| Path | Purpose |
|------|---------|
| `src/app/(portal)/` | All main modules (dashboard, members, etc.) |
| `src/app/login/` | Login page |
| `src/components/layout/` | Sidebar, Header, DashboardLayout |
| `src/components/ui/` | Reusable ShadCN-style primitives |
| `src/components/members/` | MembershipCard, member UI |
| `src/components/payment/` | RazorpayModal |
| `src/data/constants.ts` | States, demo users, federation info |
| `src/data/generators.ts` | Fake Indian member/payment generators |
| `src/data/index.ts` | Exported singleton mock datasets |
| `src/services/` | Mock API layer (add delays here) |
| `src/types/index.ts` | Shared TypeScript interfaces |
| `src/hooks/useAuth.tsx` | Auth context provider |
| `src/hooks/useTheme.tsx` | Dark mode |

---

## Adding a new module

1. **Route:** Create `src/app/(portal)/your-module/page.tsx`
2. **Sidebar:** Add entry in `src/components/layout/Sidebar.tsx`
3. **Title:** Add route title in `src/app/(portal)/layout.tsx`
4. **Types:** Extend `src/types/index.ts` if needed
5. **Data:** Add mock data in `src/data/` or generators
6. **Service:** Create `src/services/your-module.service.ts` and export from `src/services/index.ts`
7. **Page:** Call service from `"use client"` page with loading states

---

## Replacing mock APIs with a real backend

### Step 1 — Environment variables

Create `.env.local` (never commit secrets):

```env
NEXT_PUBLIC_API_URL=https://api.yourfederation.com
```

### Step 2 — Update services

Example pattern for `member.service.ts`:

```typescript
const API = process.env.NEXT_PUBLIC_API_URL;

export const memberService = {
  async getAll(filters: MemberFilters) {
    const res = await fetch(`${API}/members?` + new URLSearchParams(filters));
    if (!res.ok) throw new Error("Failed to fetch members");
    return res.json();
  },
};
```

Keep the same return shape as mock services so pages need minimal changes.

### Step 3 — Auth

Replace `auth.service.ts` + `useAuth` with your auth provider. Update `AuthGuard` redirect logic if routes change.

### Step 4 — Server components (optional)

For SEO or security, move data fetching to Server Components or Route Handlers:

- `src/app/api/members/route.ts` — Next.js API routes as BFF layer

---

## Demo users (for testing)

Defined in `src/data/constants.ts` → `DEMO_USERS`:

| Role | Email | Password |
|------|-------|----------|
| super_admin | admin@federation.com | admin123 |
| accounts | accounts@federation.com | accounts123 |
| member | member@federation.com | member123 |

Extend `UserRole` in `src/types/index.ts` for new roles and gate routes in `AuthGuard` or per-page.

---

## Styling & branding

- **Colors:** `tailwind.config.ts` → `federation.navy`, `federation.gold`
- **CSS variables:** `src/app/globals.css` (`:root` and `.dark`)
- **Federation name:** `src/data/constants.ts` → `FEDERATION_INFO`

---

## Suggested production roadmap

### Phase 1 — Foundation
- [ ] PostgreSQL / MySQL schema (members, payments, grievances)
- [ ] Real authentication & role-based access
- [ ] Admin CRUD for members

### Phase 2 — Core workflows
- [ ] Registration approval workflow
- [ ] Razorpay live integration + webhooks
- [ ] PDF circular upload & storage
- [ ] Email/SMS notification providers

### Phase 3 — Advanced
- [ ] QR verification API (scan → validate member)
- [ ] Meeting attendance & QR check-in
- [ ] Reports export (real PDF/Excel)
- [ ] State chapter multi-tenancy

---

## Deployment

**Client-owned go-live tasks:** [CLIENT_DEPLOYMENT_WORKBOOK.md](./CLIENT_DEPLOYMENT_WORKBOOK.md) — domain, hosting, Razorpay, SMS/OTP, email, WhatsApp, credentials handoff, and sign-off templates (minimum vs full features).

**Vercel (recommended):** Import GitHub repo → auto-deploy on push to `main`.

**Manual:**

```bash
npm run build
npm start
```

---

## Git workflow

```bash
git pull origin main
# make changes
npm run build
git add .
git commit -m "Describe your change"
git push origin main
```

**Tags:** `demo-v0.1.0` marks the initial saved demo baseline.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 3000 EACCES | Use `npx next dev -p 3001` |
| Auth loop | Clear `localStorage` key `federation_auth` |
| Build type errors | Run `npm run build` and fix paths in `tsconfig.json` |
| Charts not showing | Ensure page is `"use client"` (Recharts needs client) |

---

## Contact / handoff notes

- **Client:** All India Distributors & Retail Federation (AIDR) — demo branding
- **Purpose:** UI/UX visualization and sales presentation only
- **Do not** use demo payment or auth in production without replacement
