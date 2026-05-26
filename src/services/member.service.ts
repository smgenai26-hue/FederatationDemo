import { MEMBERS } from "@/data";
import { delay } from "@/lib/utils";
import type { Member, MembershipType, MemberStatus } from "@/types";

export interface MemberFilters {
  search?: string;
  state?: string;
  status?: MemberStatus | "all";
  membershipType?: MembershipType | "all";
  page?: number;
  pageSize?: number;
}

export const memberService = {
  async getAll(filters: MemberFilters = {}) {
    await delay(600);
    const { search = "", state, status, membershipType, page = 1, pageSize = 10 } = filters;
    let filtered = [...MEMBERS];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.firmName.toLowerCase().includes(q) ||
          m.memberId.toLowerCase().includes(q) ||
          m.mobile.includes(q) ||
          m.gstNo.toLowerCase().includes(q)
      );
    }
    if (state && state !== "all") filtered = filtered.filter((m) => m.state === state);
    if (status && status !== "all") filtered = filtered.filter((m) => m.status === status);
    if (membershipType && membershipType !== "all")
      filtered = filtered.filter((m) => m.membershipType === membershipType);

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);
    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  },

  async getById(id: string): Promise<Member | null> {
    await delay(400);
    return MEMBERS.find((m) => m.id === id || m.memberId === id) ?? null;
  },

  async getByMemberId(memberId: string): Promise<Member | null> {
    await delay(400);
    return MEMBERS.find((m) => m.memberId === memberId) ?? null;
  },
};
