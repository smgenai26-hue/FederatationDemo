"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center navy-gradient">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-4"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl gold-gradient">
          <Shield className="h-8 w-8 text-federation-navy" />
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white font-medium"
      >
        Loading Federation Portal...
      </motion.p>
    </div>
  );
}
