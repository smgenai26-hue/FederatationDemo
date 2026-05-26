import { GRIEVANCES } from "@/data";
import { delay } from "@/lib/utils";
import type { Grievance, GrievanceStatus } from "@/types";

export const grievanceService = {
  async getAll(status?: GrievanceStatus | "all") {
    await delay(500);
    let data = [...GRIEVANCES];
    if (status && status !== "all") data = data.filter((g) => g.status === status);
    return data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async getById(id: string): Promise<Grievance | null> {
    await delay(400);
    return GRIEVANCES.find((g) => g.id === id) ?? null;
  },
};
