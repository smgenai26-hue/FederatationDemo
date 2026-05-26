"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/PageHeader";
import { grievanceService } from "@/services/grievance.service";
import type { Grievance } from "@/types";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

const statusVariant: Record<string, "success" | "warning" | "destructive"> = {
  open: "destructive",
  in_progress: "warning",
  resolved: "success",
};

const priorityVariant: Record<string, "destructive" | "warning" | "secondary"> = {
  high: "destructive",
  medium: "warning",
  low: "secondary",
};

export default function GrievancesPage() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Grievance | null>(null);
  const [reply, setReply] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    grievanceService.getAll(filter === "all" ? undefined : filter as Grievance["status"]).then((g) => {
      setGrievances(g);
      setLoading(false);
    });
  }, [filter]);

  const sendReply = () => {
    if (!reply.trim()) return;
    toast.success("Reply sent (demo)");
    setReply("");
  };

  return (
    <div>
      <PageHeader title="Grievance Management" description="Member support tickets and resolution tracking" />

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        <TabsContent value={filter} className="mt-4 space-y-3">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-lg" />)
            : grievances.map((g) => (
                <Card key={g.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelected(g)}>
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-muted-foreground">{g.ticketNo}</span>
                        <Badge variant={statusVariant[g.status]}>{g.status.replace("_", " ")}</Badge>
                        <Badge variant={priorityVariant[g.priority]}>{g.priority} priority</Badge>
                      </div>
                      <h3 className="font-semibold">{g.subject}</h3>
                      <p className="text-sm text-muted-foreground">{g.memberName} • {g.category}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{formatDate(g.createdAt)}</p>
                      <p className="flex items-center gap-1 justify-end mt-1">
                        <MessageSquare className="h-3 w-3" />{g.messages.length} messages
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </TabsContent>
      </Tabs>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{selected?.subject}</DialogTitle>
            <p className="text-sm text-muted-foreground">{selected?.ticketNo} • {selected?.memberName}</p>
          </DialogHeader>
          {selected && (
            <>
              <div className="flex-1 overflow-y-auto space-y-3 min-h-[200px]">
                {selected.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`rounded-lg p-3 text-sm ${m.role === "Member" ? "bg-muted ml-0 mr-8" : "bg-federation-navy/10 ml-8 mr-0"}`}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-xs">{m.author} ({m.role})</span>
                      <span className="text-xs text-muted-foreground">{new Date(m.timestamp).toLocaleString("en-IN")}</span>
                    </div>
                    <p>{m.message}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 border-t pt-4">
                <Input placeholder="Type your reply..." value={reply} onChange={(e) => setReply(e.target.value)} />
                <Button onClick={sendReply}><Send className="h-4 w-4" /></Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
