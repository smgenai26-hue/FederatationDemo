"use client";

import { useState } from "react";
import { Save, Building2, CreditCard, Bell, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageHeader";
import { FEDERATION_INFO } from "@/data/constants";
import { toast } from "sonner";

export default function SettingsPage() {
  const [profile, setProfile] = useState({ ...FEDERATION_INFO });
  const [notif, setNotif] = useState({
    emailEnabled: true,
    smsEnabled: true,
    whatsappEnabled: true,
    renewalReminders: true,
    meetingAlerts: true,
  });
  const [payment, setPayment] = useState({
    razorpayKey: "rzp_demo_xxxxxxxx",
    merchantName: "AIDR Federation",
    annualFee: "5000",
    lifetimeFee: "25000",
  });

  const save = () => toast.success("Settings saved (demo)");

  return (
    <div>
      <PageHeader title="Settings" description="Configure federation portal preferences" />

      <Tabs defaultValue="profile">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="profile"><Building2 className="h-4 w-4 mr-1" />Federation Profile</TabsTrigger>
          <TabsTrigger value="payment"><CreditCard className="h-4 w-4 mr-1" />Payment</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-1" />Notifications</TabsTrigger>
          <TabsTrigger value="email"><Mail className="h-4 w-4 mr-1" />Email Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Federation Profile</CardTitle>
              <CardDescription>Organization details displayed across the portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-xl">
              {[
                { key: "name", label: "Federation Name" },
                { key: "address", label: "Address" },
                { key: "phone", label: "Phone" },
                { key: "email", label: "Email" },
                { key: "website", label: "Website" },
                { key: "gstin", label: "GSTIN" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Input
                    value={profile[key as keyof typeof profile]}
                    onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                  />
                </div>
              ))}
              <Button onClick={save}><Save className="h-4 w-4 mr-2" />Save Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Razorpay integration (Demo configuration)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-xl">
              <div>
                <Label>Razorpay Key ID (Demo)</Label>
                <Input value={payment.razorpayKey} onChange={(e) => setPayment((p) => ({ ...p, razorpayKey: e.target.value }))} />
              </div>
              <div>
                <Label>Merchant Display Name</Label>
                <Input value={payment.merchantName} onChange={(e) => setPayment((p) => ({ ...p, merchantName: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Annual Fee (₹)</Label>
                  <Input value={payment.annualFee} onChange={(e) => setPayment((p) => ({ ...p, annualFee: e.target.value }))} />
                </div>
                <div>
                  <Label>Lifetime Fee (₹)</Label>
                  <Input value={payment.lifetimeFee} onChange={(e) => setPayment((p) => ({ ...p, lifetimeFee: e.target.value }))} />
                </div>
              </div>
              <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg">
                Demo Mode: No real payment gateway connected. Payments are simulated for presentation.
              </p>
              <Button onClick={save}><Save className="h-4 w-4 mr-2" />Save Payment Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure automated member communications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-xl">
              {[
                { key: "emailEnabled", label: "Email Notifications" },
                { key: "smsEnabled", label: "SMS Notifications" },
                { key: "whatsappEnabled", label: "WhatsApp Notifications" },
                { key: "renewalReminders", label: "Membership Renewal Reminders" },
                { key: "meetingAlerts", label: "Meeting & Event Alerts" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between rounded-lg border p-4">
                  <Label>{label}</Label>
                  <Switch
                    checked={notif[key as keyof typeof notif]}
                    onCheckedChange={(v) => setNotif((n) => ({ ...n, [key]: v }))}
                  />
                </div>
              ))}
              <Button onClick={save}><Save className="h-4 w-4 mr-2" />Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Predefined templates for automated emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Welcome Email", subject: "Welcome to AIDR Federation!" },
                { name: "Renewal Reminder", subject: "Membership Renewal Due – Action Required" },
                { name: "Payment Receipt", subject: "Payment Confirmation – AIDR Federation" },
                { name: "Meeting Invitation", subject: "You're Invited: Federation Meeting" },
              ].map((t) => (
                <div key={t.name} className="rounded-lg border p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.subject}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.info(`Editing: ${t.name} (demo)`)}>
                    Edit
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
