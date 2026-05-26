"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/members": "Member Management",
  "/registrations": "Member Registration",
  "/payments": "Payment History",
  "/meetings": "Meetings",
  "/circulars": "Circulars",
  "/grievances": "Grievances",
  "/reports": "Reports & Analytics",
  "/notifications": "Notifications",
  "/settings": "Settings",
  "/membership-card": "QR Membership Card",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = titles[pathname] || "Federation Portal";

  return <DashboardLayout title={title}>{children}</DashboardLayout>;
}
