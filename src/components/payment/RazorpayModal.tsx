"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface RazorpayModalProps {
  open: boolean;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function RazorpayModal({ open, amount, onClose, onSuccess }: RazorpayModalProps) {
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md rounded-xl bg-white shadow-2xl dark:bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[#3395FF] text-white font-bold text-sm">
                  R
                </div>
                <span className="font-semibold">Razorpay</span>
                <span className="text-xs text-muted-foreground">(Demo)</span>
              </div>
              <button onClick={onClose} className="rounded p-1 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Amount to pay</p>
                <p className="text-3xl font-bold text-federation-navy">{formatCurrency(amount)}</p>
                <p className="text-xs text-muted-foreground mt-1">AIDR Federation – Membership Fee</p>
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <p className="text-sm font-medium">Select payment method</p>
                <label className="flex items-center gap-3 rounded-lg border-2 border-[#3395FF] bg-blue-50 p-3 cursor-pointer dark:bg-blue-950/30">
                  <CreditCard className="h-5 w-5 text-[#3395FF]" />
                  <div>
                    <p className="text-sm font-medium">Demo Card •••• 4242</p>
                    <p className="text-xs text-muted-foreground">Instant demo payment</p>
                  </div>
                </label>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4" />
                Secured by Razorpay (Demo Mode – No real charge)
              </div>

              <Button
                className="w-full bg-[#3395FF] hover:bg-[#2874CC] text-white h-12 text-base"
                onClick={handlePay}
                disabled={processing}
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </span>
                ) : (
                  `Pay ${formatCurrency(amount)}`
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
