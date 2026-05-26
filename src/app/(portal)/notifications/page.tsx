"use client";

import { Mail, MessageSquare, Phone, Send, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageHeader";
import { NOTIFICATIONS } from "@/data";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

const channelConfig = {
  email: { icon: Mail, color: "text-blue-600", label: "Email" },
  sms: { icon: Phone, color: "text-green-600", label: "SMS" },
  whatsapp: { icon: MessageSquare, color: "text-green-500", label: "WhatsApp" },
};

const statusConfig = {
  sent: { variant: "success" as const, icon: CheckCircle },
  pending: { variant: "warning" as const, icon: Clock },
  failed: { variant: "destructive" as const, icon: XCircle },
};

export default function NotificationsPage() {
  const sent = NOTIFICATIONS.filter((n) => n.status === "sent").length;
  const pending = NOTIFICATIONS.filter((n) => n.status === "pending").length;
  const failed = NOTIFICATIONS.filter((n) => n.status === "failed").length;

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Email, SMS, and WhatsApp communication logs"
        action={
          <Button variant="gold" onClick={() => toast.success("Compose notification (demo)")}>
            <Send className="h-4 w-4 mr-2" /> Send Notification
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Sent", count: sent, color: "border-green-200 bg-green-50 dark:bg-green-950/20" },
          { label: "Pending", count: pending, color: "border-amber-200 bg-amber-50 dark:bg-amber-950/20" },
          { label: "Failed", count: failed, color: "border-red-200 bg-red-50 dark:bg-red-950/20" },
        ].map((s) => (
          <Card key={s.label} className={s.color}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-bold">{s.count}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Channels</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
        </TabsList>

        {["all", "email", "sms", "whatsapp"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4 space-y-2">
            {NOTIFICATIONS.filter((n) => tab === "all" || n.channel === tab).map((n) => {
              const ch = channelConfig[n.channel];
              const st = statusConfig[n.status];
              const ChIcon = ch.icon;
              const StIcon = st.icon;
              return (
                <Card key={n.id}>
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted ${ch.color}`}>
                      <ChIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{ch.label}</Badge>
                        <Badge variant={st.variant} className="gap-1">
                          <StIcon className="h-3 w-3" />{n.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{n.type}</span>
                      </div>
                      <p className="font-medium mt-1 truncate">{n.subject}</p>
                      <p className="text-sm text-muted-foreground">To: {n.recipient}</p>
                    </div>
                    <p className="text-sm text-muted-foreground shrink-0">{formatDate(n.sentAt)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">WhatsApp Preview (Demo)</h3>
          <div className="max-w-sm rounded-2xl bg-[#ECE5DD] p-4 dark:bg-[#1f2c34]">
            <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-[#005c4b] dark:text-white">
              <p className="text-xs font-bold text-green-700 dark:text-green-300 mb-1">AIDR Federation</p>
              <p className="text-sm">Dear Member, your membership renewal is due on 30 June 2025. Renew now to continue enjoying federation benefits.</p>
              <p className="text-xs text-muted-foreground mt-2 text-right">10:30 AM ✓✓</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
