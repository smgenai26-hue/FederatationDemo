"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Upload, CreditCard, User, Building2, FileCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/PageHeader";
import { RazorpayModal } from "@/components/payment/RazorpayModal";
import { MembershipCard } from "@/components/members/MembershipCard";
import { toast } from "sonner";
import { INDIAN_STATES } from "@/data/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STEPS = [
  { id: 1, title: "Personal Details", icon: User },
  { id: 2, title: "Business Details", icon: Building2 },
  { id: 3, title: "Documents", icon: Upload },
  { id: 4, title: "Payment", icon: CreditCard },
  { id: 5, title: "Confirmation", icon: CheckCircle },
];

export default function RegistrationsPage() {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paid, setPaid] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", mobile: "", aadhaar: "",
    firmName: "", gstNo: "", state: "", city: "", address: "",
    membershipType: "annual",
  });

  const memberId = `AIDR-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  const progress = (step / 5) * 100;

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const sendOtp = () => {
    setOtpSent(true);
    toast.success("OTP sent to " + (form.mobile || "your mobile"));
  };

  const verifyOtp = () => {
    setOtpVerified(true);
    toast.success("Mobile verified successfully!");
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setPaid(true);
    setStep(5);
    toast.success("Payment successful! Membership activated.");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="New Member Registration" description="Complete the 5-step registration process" />

      <div className="mb-8">
        <Progress value={progress} className="h-2 mb-4" />
        <div className="flex justify-between">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex flex-col items-center gap-1 flex-1">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${done ? "gold-gradient text-federation-navy" : active ? "bg-federation-navy text-white" : "bg-muted text-muted-foreground"}`}>
                  {done ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <span className={`text-[10px] text-center hidden sm:block ${active ? "font-semibold text-federation-navy" : "text-muted-foreground"}`}>{s.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <Card>
            <CardContent className="p-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Step 1: Personal Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Full Name *</Label><Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Rajesh Kumar" /></div>
                    <div><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="rajesh@email.com" /></div>
                    <div><Label>Mobile *</Label><Input value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="+91 9876543210" /></div>
                    <div><Label>Aadhaar No.</Label><Input value={form.aadhaar} onChange={(e) => update("aadhaar", e.target.value)} placeholder="XXXX XXXX 1234" /></div>
                  </div>
                  <div className="rounded-lg border p-4 bg-muted/30">
                    <div className="flex items-center gap-2 mb-3"><Smartphone className="h-4 w-4" /><span className="text-sm font-medium">Mobile OTP Verification (Demo)</span></div>
                    {!otpSent ? (
                      <Button variant="outline" size="sm" onClick={sendOtp}>Send OTP</Button>
                    ) : !otpVerified ? (
                      <div className="flex gap-2">
                        <Input placeholder="Enter 6-digit OTP (any)" className="max-w-[200px]" />
                        <Button size="sm" onClick={verifyOtp}>Verify</Button>
                      </div>
                    ) : (
                      <span className="text-green-600 text-sm flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Verified</span>
                    )}
                  </div>
                  <Button onClick={() => setStep(2)} disabled={!form.name || !form.mobile}>Continue</Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Step 2: Business Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2"><Label>Firm / Company Name *</Label><Input value={form.firmName} onChange={(e) => update("firmName", e.target.value)} /></div>
                    <div><Label>GST Number</Label><Input value={form.gstNo} onChange={(e) => update("gstNo", e.target.value)} placeholder="27AAAAA0000A1Z5" /></div>
                    <div>
                      <Label>Membership Type</Label>
                      <Select value={form.membershipType} onValueChange={(v) => update("membershipType", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="annual">Annual – ₹5,000</SelectItem>
                          <SelectItem value="lifetime">Lifetime – ₹25,000</SelectItem>
                          <SelectItem value="associate">Associate – ₹2,500</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>State</Label>
                      <Select value={form.state} onValueChange={(v) => update("state", v)}>
                        <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                        <SelectContent>{INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div><Label>City</Label><Input value={form.city} onChange={(e) => update("city", e.target.value)} /></div>
                    <div className="sm:col-span-2"><Label>Business Address</Label><Input value={form.address} onChange={(e) => update("address", e.target.value)} /></div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button onClick={() => setStep(3)}>Continue</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Step 3: Document Upload</h3>
                  {["GST Certificate", "Aadhaar Card", "Business Registration", "Passport Photo"].map((doc) => (
                    <div key={doc} className="flex items-center justify-between rounded-lg border border-dashed p-4 hover:bg-muted/30 cursor-pointer" onClick={() => toast.info(`${doc} uploaded (demo)`)}>
                      <div className="flex items-center gap-3">
                        <FileCheck className="h-5 w-5 text-federation-gold" />
                        <div><p className="text-sm font-medium">{doc}</p><p className="text-xs text-muted-foreground">PDF, JPG up to 5MB</p></div>
                      </div>
                      <Button variant="outline" size="sm">Upload</Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                    <Button onClick={() => setStep(4)}>Continue to Payment</Button>
                  </div>
                </div>
              )}

              {step === 4 && !paid && (
                <div className="space-y-4 text-center">
                  <h3 className="font-semibold text-lg">Step 4: Membership Payment</h3>
                  <div className="rounded-xl border p-6 bg-muted/30">
                    <p className="text-muted-foreground">Amount Payable</p>
                    <p className="text-4xl font-bold text-federation-navy mt-2">
                      ₹{form.membershipType === "lifetime" ? "25,000" : form.membershipType === "associate" ? "2,500" : "5,000"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 capitalize">{form.membershipType} Membership – {form.firmName || "Your Firm"}</p>
                  </div>
                  <Button variant="gold" size="lg" onClick={() => setShowPayment(true)}>Pay with Razorpay (Demo)</Button>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                  </div>
                </div>
              )}

              {step === 5 && paid && (
                <div className="space-y-6 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-federation-navy">Registration Successful!</h3>
                    <p className="text-muted-foreground mt-2">Welcome to AIDR Federation, {form.name || "Member"}!</p>
                    <p className="font-mono text-federation-gold font-semibold mt-1">{memberId}</p>
                  </div>
                  <MembershipCard
                    member={{
                      memberId,
                      name: form.name || "New Member",
                      firmName: form.firmName,
                      validityDate: "2026-12-31",
                    }}
                  />
                  <Button onClick={() => { setStep(1); setPaid(false); setOtpVerified(false); setOtpSent(false); }}>
                    Register Another Member
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <RazorpayModal
        open={showPayment}
        amount={form.membershipType === "lifetime" ? 25000 : form.membershipType === "associate" ? 2500 : 5000}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
