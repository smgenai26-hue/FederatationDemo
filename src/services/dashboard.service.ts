import { MEMBERS, PAYMENTS, CIRCULARS, MEETINGS, GRIEVANCES, ACTIVITIES } from "@/data";
import {
  getStateWiseDistribution,
  getMemberGrowthData,
  getPaymentCollectionData,
} from "@/data/generators";
import { delay } from "@/lib/utils";
import type { DashboardStats } from "@/types";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    await delay(700);
    return {
      totalMembers: MEMBERS.length,
      activeMembers: MEMBERS.filter((m) => m.status === "active").length,
      pendingPayments: PAYMENTS.filter((p) => p.status === "pending").length,
      upcomingMeetings: MEETINGS.filter((m) => m.status === "upcoming").length,
      circularsPublished: CIRCULARS.length,
      openGrievances: GRIEVANCES.filter((g) => g.status === "open").length,
    };
  },

  async getActivities() {
    await delay(400);
    return ACTIVITIES;
  },

  async getStateDistribution() {
    await delay(500);
    return getStateWiseDistribution(MEMBERS);
  },

  async getMemberGrowth() {
    await delay(500);
    return getMemberGrowthData();
  },

  async getPaymentCollections() {
    await delay(500);
    return getPaymentCollectionData();
  },
};
