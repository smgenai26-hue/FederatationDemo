"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: "navy" | "gold" | "green" | "amber" | "red" | "blue";
  delay?: number;
}

const colorMap = {
  navy: "bg-federation-navy text-white",
  gold: "gold-gradient text-federation-navy",
  green: "bg-green-600 text-white",
  amber: "bg-amber-500 text-white",
  red: "bg-red-500 text-white",
  blue: "bg-blue-600 text-white",
};

export function StatCard({ title, value, icon: Icon, trend, color = "navy", delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="flex items-center gap-4 p-5">
            <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", colorMap[color])}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
              {trend && <p className="text-xs text-green-600 dark:text-green-400">{trend}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
