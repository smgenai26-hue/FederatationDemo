"use client";

import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MembershipCard } from "@/components/members/MembershipCard";
import { useAuth } from "@/hooks/useAuth";
import { MEMBERS } from "@/data";
import { toast } from "sonner";

export default function MembershipCardPage() {
  const { user } = useAuth();
  const member = MEMBERS.find((m) => m.email.includes("rajesh")) || MEMBERS[0];

  const cardMember = {
    memberId: user?.role === "member" ? "AIDR-0042" : member.memberId,
    name: user?.name || member.name,
    firmName: member.firmName,
    validityDate: member.validityDate,
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-federation-navy">Digital Membership Card</h2>
        <p className="text-sm text-muted-foreground">Scan QR code to verify membership</p>
      </div>

      <MembershipCard member={cardMember} className="mb-6" />

      <Card>
        <CardContent className="p-4 flex gap-3">
          <Button className="flex-1" variant="gold" onClick={() => toast.success("Card downloaded (demo)")}>
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
          <Button className="flex-1" variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6 rounded-lg border p-4 text-sm text-muted-foreground">
        <p><strong>Member ID:</strong> {cardMember.memberId}</p>
        <p className="mt-1"><strong>Valid Until:</strong> {cardMember.validityDate}</p>
        <p className="mt-2 text-xs">This is a demo digital card. QR encodes member verification data for presentation purposes.</p>
      </div>
    </div>
  );
}
