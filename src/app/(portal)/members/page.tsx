"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Eye, QrCode, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/PageHeader";
import { MembershipCard } from "@/components/members/MembershipCard";
import { memberService } from "@/services/member.service";
import { INDIAN_STATES } from "@/data/constants";
import type { Member } from "@/types";
import { formatDate } from "@/lib/utils";

const statusVariant: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
  active: "success",
  pending: "warning",
  inactive: "secondary",
  suspended: "destructive",
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [state, setState] = useState("all");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<Member | null>(null);
  const [showQR, setShowQR] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const res = await memberService.getAll({
      search,
      state: state === "all" ? undefined : state,
      status: status as "all" | Member["status"],
      page,
      pageSize: 10,
    });
    setMembers(res.data);
    setTotal(res.total);
    setTotalPages(res.totalPages);
    setLoading(false);
  }, [search, state, status, page]);

  useEffect(() => {
    const t = setTimeout(fetchMembers, 300);
    return () => clearTimeout(t);
  }, [fetchMembers]);

  return (
    <div>
      <PageHeader
        title="Member Management"
        description={`${total} members registered across India`}
        action={<Button variant="gold" onClick={() => window.location.href = "/registrations"}>+ New Registration</Button>}
      />

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, firm, ID, mobile, GST..."
                className="pl-10"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <Select value={state} onValueChange={(v) => { setState(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="State" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                {["Member ID", "Name", "Firm", "State", "Mobile", "GST", "Type", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}><td colSpan={9} className="p-4"><Skeleton className="h-10" /></td></tr>
                  ))
                : members.map((m, i) => (
                    <motion.tr
                      key={m.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b hover:bg-muted/30"
                    >
                      <td className="px-4 py-3 font-mono text-xs">{m.memberId}</td>
                      <td className="px-4 py-3 font-medium whitespace-nowrap">{m.name}</td>
                      <td className="px-4 py-3 max-w-[180px] truncate">{m.firmName}</td>
                      <td className="px-4 py-3">{m.state}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{m.mobile}</td>
                      <td className="px-4 py-3 font-mono text-xs">{m.gstNo}</td>
                      <td className="px-4 py-3 capitalize">{m.membershipType}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant[m.status]}>{m.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setSelected(m)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => { setSelected(m); setShowQR(true); }}>
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t p-4">
          <p className="text-sm text-muted-foreground">Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, total)} of {total}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="flex items-center px-2 text-sm">Page {page} of {totalPages}</span>
            <Button variant="outline" size="icon" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={!!selected && !showQR} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Member Details</DialogTitle></DialogHeader>
          {selected && (
            <div className="grid gap-3 text-sm">
              {[
                ["Member ID", selected.memberId],
                ["Name", selected.name],
                ["Firm", selected.firmName],
                ["Email", selected.email],
                ["Mobile", selected.mobile],
                ["State / City", `${selected.state}, ${selected.city}`],
                ["GST No", selected.gstNo],
                ["Membership", selected.membershipType],
                ["Joined", formatDate(selected.joinedDate)],
                ["Valid Until", formatDate(selected.validityDate)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium text-right">{v}</span>
                </div>
              ))}
              <Badge variant={statusVariant[selected.status]} className="w-fit">{selected.status}</Badge>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showQR} onOpenChange={(o) => { if (!o) { setShowQR(false); setSelected(null); } }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Membership Card</DialogTitle></DialogHeader>
          {selected && <MembershipCard member={selected} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
