"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { FEDERATION_INFO } from "@/data/constants";

const DEMO_ACCOUNTS = [
  { email: "admin@federation.com", password: "admin123", role: "Super Admin" },
  { email: "accounts@federation.com", password: "accounts123", role: "Accounts" },
  { email: "member@federation.com", password: "member123", role: "Member" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome to Federation Portal!");
      router.push("/dashboard");
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 navy-gradient flex-col justify-between p-12 text-white">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl gold-gradient">
              <Shield className="h-8 w-8 text-federation-navy" />
            </div>
            <div>
              <p className="text-federation-gold-light text-sm font-medium">AIDR Federation</p>
              <h1 className="text-2xl font-bold">Management Portal</h1>
            </div>
          </div>
          <h2 className="text-3xl font-bold leading-tight mb-4">
            {FEDERATION_INFO.name}
          </h2>
          <p className="text-white/70 text-lg max-w-md">
            Unified platform for member management, registrations, payments, circulars, and federation operations.
          </p>
        </motion.div>
        <div className="space-y-4">
          {["120+ Active Members", "Digital QR Membership Cards", "Integrated Payment & Reports"].map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="h-2 w-2 rounded-full bg-federation-gold" />
              <span className="text-white/80">{f}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-white/40">Demo Prototype • For Client Presentation Only</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 bg-federation-gray dark:bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-6 text-center lg:hidden">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl gold-gradient">
              <Shield className="h-7 w-7 text-federation-navy" />
            </div>
            <h1 className="text-xl font-bold text-federation-navy">Federation Portal</h1>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to access the portal</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@federation.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" variant="gold" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6">
                <p className="text-xs text-muted-foreground mb-3 text-center">Quick Demo Login</p>
                <div className="space-y-2">
                  {DEMO_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.email}
                      type="button"
                      onClick={() => quickLogin(acc)}
                      className="w-full rounded-lg border px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
                    >
                      <span className="font-medium">{acc.role}</span>
                      <span className="block text-xs text-muted-foreground">{acc.email}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
