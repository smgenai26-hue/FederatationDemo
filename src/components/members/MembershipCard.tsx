"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Shield, CheckCircle } from "lucide-react";
import { FEDERATION_INFO } from "@/data/constants";
import { formatDate } from "@/lib/utils";
import type { Member } from "@/types";

interface MembershipCardProps {
  member: Partial<Member> & { memberId: string; name: string };
  className?: string;
}

export function MembershipCard({ member, className }: MembershipCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrReady, setQrReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const data = JSON.stringify({
      id: member.memberId,
      name: member.name,
      federation: FEDERATION_INFO.shortName,
      valid: member.validityDate,
    });
    QRCode.toCanvas(canvasRef.current, data, { width: 100, margin: 1 }, () => setQrReady(true));
  }, [member]);

  return (
    <div
      className={`relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-xl ${className}`}
      style={{ aspectRatio: "1.6/1" }}
    >
      <div className="absolute inset-0 navy-gradient" />
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-federation-gold/20 blur-2xl" />
      <div className="relative flex h-full flex-col p-5 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gold-gradient">
              <Shield className="h-6 w-6 text-federation-navy" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-federation-gold-light">
                {FEDERATION_INFO.shortName}
              </p>
              <p className="text-xs font-semibold">Membership Card</p>
            </div>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
            {member.name?.charAt(0) ?? "M"}
          </div>
        </div>

        <div className="mt-3 flex-1">
          <p className="text-lg font-bold leading-tight">{member.name}</p>
          {member.firmName && (
            <p className="text-xs text-white/70 line-clamp-1">{member.firmName}</p>
          )}
          <p className="mt-1 font-mono text-sm text-federation-gold-light">{member.memberId}</p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-white/60">Valid Until</p>
            <p className="text-xs font-medium">
              {member.validityDate ? formatDate(member.validityDate) : "31 Dec 2026"}
            </p>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-green-300">
              <CheckCircle className="h-3 w-3" />
              Active Member
            </div>
          </div>
          <div className="rounded-lg bg-white p-1">
            <canvas ref={canvasRef} className={qrReady ? "block" : "hidden"} />
          </div>
        </div>
      </div>
    </div>
  );
}
