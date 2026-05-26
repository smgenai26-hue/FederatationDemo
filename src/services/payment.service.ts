import { PAYMENTS } from "@/data";
import { delay } from "@/lib/utils";
import type { PaymentStatus } from "@/types";

export const paymentService = {
  async getAll(status?: PaymentStatus | "all") {
    await delay(500);
    let data = [...PAYMENTS];
    if (status && status !== "all") data = data.filter((p) => p.status === status);
    return data;
  },

  async getByMember(memberId: string) {
    await delay(400);
    return PAYMENTS.filter((p) => p.memberId === memberId);
  },

  async getStats() {
    await delay(300);
    const success = PAYMENTS.filter((p) => p.status === "success");
    const pending = PAYMENTS.filter((p) => p.status === "pending");
    return {
      totalCollected: success.reduce((s, p) => s + p.amount, 0),
      pendingCount: pending.length,
      successCount: success.length,
    };
  },
};
