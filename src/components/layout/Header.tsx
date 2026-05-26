"use client";

import { Menu, Moon, Sun, LogOut, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { toast } from "sonner";
import Link from "next/link";

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function Header({ onMenuClick, title }: HeaderProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 shadow-sm lg:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-federation-navy dark:text-foreground">{title}</h1>
          <p className="hidden text-xs text-muted-foreground sm:block">
            All India Distributors & Retail Federation
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/membership-card">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <QrCode className="h-4 w-4" />
            My Card
          </Button>
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        <div className="hidden items-center gap-2 rounded-lg border px-3 py-1.5 sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-federation-navy text-xs font-bold text-white">
            {user?.name?.charAt(0) ?? "U"}
          </div>
          <div className="text-sm">
            <p className="font-medium leading-none">{user?.name}</p>
            <p className="text-xs capitalize text-muted-foreground">{user?.role?.replace("_", " ")}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
