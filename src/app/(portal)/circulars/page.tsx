"use client";

import { useState } from "react";
import { Search, Download, FileText, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader } from "@/components/shared/PageHeader";
import { CIRCULARS } from "@/data";
import type { Circular } from "@/types";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

const categories = ["All", "AGM Notice", "GST Update", "Industry Notification", "Federation Announcement"];

export default function CircularsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [preview, setPreview] = useState<Circular | null>(null);

  const filtered = CIRCULARS.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <PageHeader title="Circular Management" description="Federation notices, AGM updates, and industry notifications" />

      <div className="flex flex-col gap-3 sm:flex-row mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search circulars..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-56"><SelectValue /></SelectTrigger>
          <SelectContent>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="h-full hover:shadow-md transition-shadow group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/30">
                    <FileText className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex gap-1">
                    {c.isNew && <Badge variant="gold">New</Badge>}
                    <Badge variant="outline">{c.category}</Badge>
                  </div>
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-federation-navy transition-colors">{c.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{c.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>{formatDate(c.publishedDate)}</span>
                  <span>{c.fileSize} • {c.downloads} downloads</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => setPreview(c)}>
                    <Eye className="h-4 w-4 mr-1" /> Preview
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => toast.success(`Downloaded: ${c.title} (demo)`)}>
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{preview?.title}</DialogTitle></DialogHeader>
          {preview && (
            <div>
              <div className="rounded-lg border bg-muted/30 p-8 min-h-[300px] flex flex-col items-center justify-center mb-4">
                <FileText className="h-16 w-16 text-red-500 mb-4" />
                <p className="font-semibold text-center">{preview.title}</p>
                <p className="text-sm text-muted-foreground mt-2 text-center max-w-md">{preview.description}</p>
                <Badge className="mt-4">{preview.category}</Badge>
                <p className="text-xs text-muted-foreground mt-4">PDF Preview (Demo) • {preview.fileSize}</p>
              </div>
              <Button className="w-full" onClick={() => toast.success("Download started (demo)")}>
                <Download className="h-4 w-4 mr-2" /> Download PDF
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
