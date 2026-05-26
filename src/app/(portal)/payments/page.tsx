"use client";

import { useEffect, useState } from "react";
import { Download, Receipt, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/PageHeader";
import { paymentService } from "@/services/payment.service";
import type { Payment } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";

const statusConfig = {
  success: { variant: "success" as const, icon: CheckCircle },
  pending: { variant: "warning" as const, icon: Clock },
  failed: { variant: "destructive" as const, icon: XCircle },
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState({ totalCollected: 0, pendingCount: 0, successCount: 0 });
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState<Payment | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    Promise.all([
      paymentService.getAll(filter === "all" ? undefined : filter as Payment["status"]),
      paymentService.getStats(),
    ]).then(([p, s]) => {
      setPayments(p);
      setStats(s);
      setLoading(false);
    });
  }, [filter]);

  return (
    <div>
      <PageHeader title="Payment History" description="All membership and event payments" />

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Total Collected", value: formatCurrency(stats.totalCollected), color: "text-green-600" },
          { label: "Successful", value: stats.successCount, color: "text-federation-navy" },
          { label: "Pending", value: stats.pendingCount, color: "text-amber-600" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={filter} onValueChange={(v) => { setFilter(v); setLoading(true); setTimeout(() => setLoading(false), 400); }}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="success">Success</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>
        <TabsContent value={filter} className="mt-4">
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    {["Transaction ID", "Member", "Type", "Amount", "Method", "Date", "Status", ""].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-medium text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i}><td colSpan={8} className="p-4"><Skeleton className="h-8" /></td></tr>
                      ))
                    : payments.map((p) => {
                        const cfg = statusConfig[p.status];
                        const Icon = cfg.icon;
                        return (
                          <tr key={p.id} className="border-b hover:bg-muted/30">
                            <td className="px-4 py-3 font-mono text-xs">{p.transactionId}</td>
                            <td className="px-4 py-3">
                              <p className="font-medium">{p.memberName}</p>
                              <p className="text-xs text-muted-foreground">{p.memberId}</p>
                            </td>
                            <td className="px-4 py-3">{p.type}</td>
                            <td className="px-4 py-3 font-semibold">{formatCurrency(p.amount)}</td>
                            <td className="px-4 py-3">{p.method}</td>
                            <td className="px-4 py-3">{formatDate(p.date)}</td>
                            <td className="px-4 py-3">
                              <Badge variant={cfg.variant} className="gap-1">
                                <Icon className="h-3 w-3" />{p.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              {p.status === "success" && (
                                <Button variant="ghost" size="sm" onClick={() => setReceipt(p)}>
                                  <Receipt className="h-4 w-4" />
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!receipt} onOpenChange={() => setReceipt(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Payment Receipt</DialogTitle></DialogHeader>
          {receipt && (
            <div className="space-y-4">
              <div className="rounded-lg border p-6 bg-muted/20 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{formatCurrency(receipt.amount)}</p>
                <p className="text-sm text-muted-foreground">Payment Successful</p>
              </div>
              {[
                ["Transaction ID", receipt.transactionId],
                ["Member", `${receipt.memberName} (${receipt.memberId})`],
                ["Type", receipt.type],
                ["Method", receipt.method],
                ["Date", formatDate(receipt.date)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm border-b pb-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
              <Button className="w-full" onClick={() => toast.success("Receipt downloaded (demo)")}>
                <Download className="h-4 w-4 mr-2" /> Download Receipt
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
