import { DEMO_USERS } from "@/data/constants";
import { delay } from "@/lib/utils";
import type { DemoUser } from "@/types";

const STORAGE_KEY = "federation_auth";

export const authService = {
  async login(email: string, password: string): Promise<DemoUser> {
    await delay(800);
    const user = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) throw new Error("Invalid email or password");
    const { password: _pw, ...safe } = user;
    void _pw;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    }
    return safe as DemoUser;
  },

  async logout(): Promise<void> {
    await delay(300);
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser(): DemoUser | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as DemoUser;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  },
};
