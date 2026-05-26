"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CreditCard,
  Calendar,
  FileText,
  MessageSquareWarning,
  BarChart3,
  Bell,
  Settings,
  X,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FEDERATION_INFO } from "@/data/constants";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/members", label: "Members", icon: Users },
  { href: "/registrations", label: "Registrations", icon: UserPlus },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/meetings", label: "Meetings", icon: Calendar },
  { href: "/circulars", label: "Circulars", icon: FileText },
  { href: "/grievances", label: "Grievances", icon: MessageSquareWarning },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col navy-gradient text-white transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gold-gradient">
              <Shield className="h-6 w-6 text-federation-navy" />
            </div>
            <div>
              <p className="text-xs font-medium text-federation-gold-light">AIDR</p>
              <p className="text-sm font-bold leading-tight">Federation Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded p-1 hover:bg-white/10 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {menuItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "gold-gradient text-federation-navy shadow"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="text-xs text-white/50">{FEDERATION_INFO.shortName}</p>
          <p className="mt-1 text-xs text-federation-gold-light">Demo Prototype v1.0</p>
        </div>
      </aside>
    </>
  );
}
