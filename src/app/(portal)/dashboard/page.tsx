"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users, UserCheck, CreditCard, Calendar, FileText, MessageSquareWarning,
  TrendingUp, Bell,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { dashboardService } from "@/services";
import type { DashboardStats, Activity } from "@/types";

const COLORS = ["#0B1F3A", "#1E3A5F", "#C9A227", "#4A90D9", "#2ECC71", "#E74C3C", "#9B59B6", "#F39C12"];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stateData, setStateData] = useState<{ name: string; value: number }[]>([]);
  const [growthData, setGrowthData] = useState<{ month: string; members: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      dashboardService.getStats(),
      dashboardService.getActivities(),
      dashboardService.getStateDistribution(),
      dashboardService.getMemberGrowth(),
    ]).then(([s, a, st, g]) => {
      setStats(s);
      setActivities(a);
      setStateData(st);
      setGrowthData(g);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your federation overview.</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard title="Total Members" value={stats?.totalMembers ?? 0} icon={Users} color="navy" delay={0} trend="+12 this month" />
        <StatCard title="Active Members" value={stats?.activeMembers ?? 0} icon={UserCheck} color="green" delay={1} />
        <StatCard title="Pending Payments" value={stats?.pendingPayments ?? 0} icon={CreditCard} color="amber" delay={2} />
        <StatCard title="Upcoming Meetings" value={stats?.upcomingMeetings ?? 0} icon={Calendar} color="blue" delay={3} />
        <StatCard title="Circulars" value={stats?.circularsPublished ?? 0} icon={FileText} color="gold" delay={4} />
        <StatCard title="Open Grievances" value={stats?.openGrievances ?? 0} icon={MessageSquareWarning} color="red" delay={5} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-5 w-5 text-federation-gold" />
              Member Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="members" stroke="#0B1F3A" strokeWidth={2} dot={{ fill: "#C9A227" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[280px] overflow-y-auto">
            {activities.map((a) => (
              <div key={a.id} className="flex gap-3 text-sm border-b pb-3 last:border-0">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-federation-gold" />
                <div>
                  <p className="leading-snug">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.user} • {new Date(a.timestamp).toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">State-wise Member Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stateData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" fontSize={11} />
                <YAxis dataKey="name" type="category" width={100} fontSize={11} />
                <Tooltip />
                <Bar dataKey="value" fill="#0B1F3A" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Membership by State (Top 8)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={stateData.slice(0, 8)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {stateData.slice(0, 8).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Quick Notifications</CardTitle>
          <Badge variant="gold">3 New</Badge>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          {[
            { title: "AGM 2025 Notice Published", time: "2 hours ago" },
            { title: "23 Membership Renewals Pending", time: "5 hours ago" },
            { title: "Annual Conference Registration Open", time: "1 day ago" },
          ].map((n) => (
            <div key={n.title} className="rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
