"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Video, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageHeader";
import { MEETINGS } from "@/data";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

const modeIcon = { physical: MapPin, virtual: Video, hybrid: Calendar };

export default function MeetingsPage() {
  const [registered, setRegistered] = useState<Set<string>>(new Set());

  const upcoming = MEETINGS.filter((m) => m.status === "upcoming");
  const completed = MEETINGS.filter((m) => m.status === "completed");

  const register = (id: string, title: string) => {
    setRegistered((s) => new Set(s).add(id));
    toast.success(`Registered for: ${title}`);
  };

  return (
    <div>
      <PageHeader title="Meetings & Events" description="Federation meetings, seminars, and webinars" />

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4 grid gap-4 sm:grid-cols-2">
          {upcoming.map((m, i) => {
            const ModeIcon = modeIcon[m.mode];
            const isReg = registered.has(m.id);
            const pct = Math.round((m.registered / m.capacity) * 100);
            return (
              <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="gold">{m.type}</Badge>
                      <Badge variant="outline" className="capitalize">{m.mode}</Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{m.description}</p>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{formatDate(m.date)} at {m.time}</div>
                      <div className="flex items-center gap-2"><ModeIcon className="h-4 w-4" />{m.venue}</div>
                      <div className="flex items-center gap-2"><Users className="h-4 w-4" />{m.registered}/{m.capacity} registered ({pct}%)</div>
                    </div>
                    <div className="h-2 rounded-full bg-muted mb-4">
                      <div className="h-2 rounded-full bg-federation-gold" style={{ width: `${pct}%` }} />
                    </div>
                    {isReg ? (
                      <Button variant="outline" className="w-full" disabled>
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" /> Registered
                      </Button>
                    ) : (
                      <Button className="w-full" onClick={() => register(m.id, m.title)}>Register Now</Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </TabsContent>

        <TabsContent value="completed" className="mt-4 grid gap-4 sm:grid-cols-2">
          {completed.map((m) => (
            <Card key={m.id} className="opacity-80">
              <CardContent className="p-5">
                <Badge variant="secondary" className="mb-2">Completed</Badge>
                <h3 className="font-bold">{m.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{formatDate(m.date)} • {m.registered} attended</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2;
                  const hasEvent = day > 0 && day <= 31 && [5, 8, 15, 20, 25].includes(day);
                  return (
                    <div
                      key={i}
                      className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm ${day < 1 || day > 31 ? "text-transparent" : hasEvent ? "bg-federation-navy text-white font-bold cursor-pointer" : "hover:bg-muted"}`}
                    >
                      {day > 0 && day <= 31 ? day : ""}
                      {hasEvent && <span className="h-1 w-1 rounded-full bg-federation-gold mt-0.5" />}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {MEETINGS.filter((m) => m.status === "upcoming").map((m) => (
                  <Badge key={m.id} variant="outline">{formatDate(m.date)}: {m.title.slice(0, 30)}...</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
