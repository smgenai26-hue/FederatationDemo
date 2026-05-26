import type {
  Member,
  Payment,
  Grievance,
  Circular,
  Meeting,
  Notification,
  Activity,
  MembershipType,
  MemberStatus,
  GrievanceStatus,
  GrievancePriority,
} from "@/types";
import {
  INDIAN_STATES,
  CITIES,
  FIRST_NAMES,
  LAST_NAMES,
  FIRM_PREFIXES,
  FIRM_SUFFIXES,
} from "./constants";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad(n: number, len = 4): string {
  return String(n).padStart(len, "0");
}

function randomDate(startYear: number, endYear: number): string {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start)).toISOString().split("T")[0];
}

function generateGST(stateCode: string): string {
  const codes: Record<string, string> = {
    Maharashtra: "27", Delhi: "07", Karnataka: "29", Gujarat: "24",
    "Tamil Nadu": "33", "Uttar Pradesh": "09", "West Bengal": "19",
  };
  const sc = codes[stateCode] || "07";
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let pan = "";
  for (let i = 0; i < 5; i++) pan += alpha[randomInt(0, 25)];
  pan += String(randomInt(1000, 9999));
  pan += alpha[randomInt(0, 25)];
  return `${sc}${pan}1Z${randomInt(1, 9)}`;
}

export function generateMembers(count = 120): Member[] {
  const members: Member[] = [];
  const types: MembershipType[] = ["lifetime", "annual", "associate"];
  const statuses: MemberStatus[] = ["active", "active", "active", "pending", "inactive"];

  for (let i = 1; i <= count; i++) {
    const state = pick(INDIAN_STATES);
    const cityList = CITIES[state] || ["Main City"];
    const firstName = pick(FIRST_NAMES);
    const lastName = pick(LAST_NAMES);
    const name = `${firstName} ${lastName}`;
    const firmName = `${pick(FIRM_PREFIXES)} ${pick(FIRM_SUFFIXES)}`;
    const joined = randomDate(2018, 2025);
    const validity = new Date(joined);
    validity.setFullYear(validity.getFullYear() + 1);

    members.push({
      id: `mem-${i}`,
      memberId: `AIDR-${pad(i)}`,
      name,
      firmName: `${firmName} (${cityList[0]})`,
      state,
      city: pick(cityList),
      mobile: `+91 ${randomInt(70, 99)}${randomInt(10000000, 99999999)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`,
      gstNo: generateGST(state),
      membershipType: pick(types),
      status: pick(statuses),
      joinedDate: joined,
      validityDate: validity.toISOString().split("T")[0],
    });
  }
  return members;
}

export function generatePayments(members: Member[], count = 30): Payment[] {
  const payments: Payment[] = [];
  const types = ["Annual Membership", "Renewal Fee", "Event Registration", "Lifetime Upgrade"];
  const methods = ["UPI", "Net Banking", "Card", "NEFT"];
  const statuses: ("success" | "pending" | "failed")[] = ["success", "success", "success", "pending", "failed"];

  for (let i = 1; i <= count; i++) {
    const member = pick(members);
    payments.push({
      id: `pay-${i}`,
      transactionId: `TXN${Date.now().toString().slice(-6)}${pad(i, 3)}`,
      memberId: member.memberId,
      memberName: member.name,
      amount: [2500, 5000, 10000, 15000, 25000][randomInt(0, 4)],
      type: pick(types),
      status: pick(statuses),
      date: randomDate(2024, 2025),
      method: pick(methods),
    });
  }
  return payments.sort((a, b) => b.date.localeCompare(a.date));
}

export function generateGrievances(members: Member[], count = 18): Grievance[] {
  const subjects = [
    "Membership renewal delay", "GST certificate not received",
    "Meeting registration issue", "Payment not reflected",
    "Circular access problem", "Wrong member details",
    "QR card not generated", "Refund request for duplicate payment",
  ];
  const categories = ["Membership", "Payments", "Events", "Technical", "Documentation"];
  const statuses: GrievanceStatus[] = ["open", "in_progress", "resolved"];
  const priorities: GrievancePriority[] = ["low", "medium", "high"];

  return Array.from({ length: count }, (_, i) => {
    const member = pick(members);
    const status = pick(statuses);
    const created = randomDate(2024, 2025);
    return {
      id: `grv-${i + 1}`,
      ticketNo: `TKT-2025-${pad(i + 1, 4)}`,
      subject: pick(subjects),
      memberName: member.name,
      memberId: member.memberId,
      category: pick(categories),
      status,
      priority: pick(priorities),
      createdAt: created,
      updatedAt: randomDate(2025, 2025),
      description: "Member has raised a concern regarding federation services. Awaiting resolution from the concerned department.",
      messages: [
        {
          id: "m1",
          author: member.name,
          role: "Member",
          message: "I have been facing this issue for the past week. Please look into it urgently.",
          timestamp: `${created}T10:30:00`,
        },
        {
          id: "m2",
          author: "Support Team",
          role: "Federation Admin",
          message: status === "open"
            ? "Your ticket has been registered. We will respond within 48 hours."
            : "We are reviewing your case and will update you shortly.",
          timestamp: `${created}T14:00:00`,
        },
      ],
    };
  });
}

export const CIRCULARS: Circular[] = [
  { id: "c1", title: "Annual General Meeting 2025 – Notice", category: "AGM Notice", publishedDate: "2025-04-15", description: "Notice for the 27th Annual General Meeting to be held at Federation House, New Delhi.", fileSize: "2.4 MB", downloads: 342, isNew: true },
  { id: "c2", title: "GST Rate Changes – FMCG Sector Update", category: "GST Update", publishedDate: "2025-03-28", description: "Updated GST slabs applicable to distributors and retailers effective April 2025.", fileSize: "1.1 MB", downloads: 891 },
  { id: "c3", title: "Membership Renewal Reminder – FY 2025-26", category: "Federation Announcement", publishedDate: "2025-03-01", description: "All members are requested to renew membership before 30th June 2025.", fileSize: "856 KB", downloads: 1205, isNew: true },
  { id: "c4", title: "Industry Notification – Supply Chain Guidelines", category: "Industry Notification", publishedDate: "2025-02-18", description: "New supply chain compliance guidelines issued by the Ministry of Commerce.", fileSize: "3.2 MB", downloads: 567 },
  { id: "c5", title: "State Chapter Meeting – Maharashtra Schedule", category: "Federation Announcement", publishedDate: "2025-02-05", description: "Maharashtra State Chapter meeting schedule and agenda for Q1 2025.", fileSize: "640 KB", downloads: 234 },
  { id: "c6", title: "Code of Conduct – Member Compliance", category: "Federation Announcement", publishedDate: "2025-01-20", description: "Revised code of conduct for all federation members.", fileSize: "1.8 MB", downloads: 445 },
  { id: "c7", title: "Digital Membership Card – Rollout Notice", category: "Federation Announcement", publishedDate: "2025-01-10", description: "Introduction of QR-based digital membership cards for all active members.", fileSize: "920 KB", downloads: 678 },
  { id: "c8", title: "Budget 2025 – Impact on Distributors", category: "Industry Notification", publishedDate: "2025-02-02", description: "Analysis of Union Budget 2025 provisions affecting distribution sector.", fileSize: "2.1 MB", downloads: 512 },
  { id: "c9", title: "Anti-Counterfeiting Drive – Member Participation", category: "Industry Notification", publishedDate: "2024-12-15", description: "Federation initiative against counterfeit products in retail supply chain.", fileSize: "1.5 MB", downloads: 389 },
  { id: "c10", title: "Holiday Office Closure – Republic Day", category: "Federation Announcement", publishedDate: "2025-01-18", description: "Federation secretariat will remain closed on 26th January 2025.", fileSize: "320 KB", downloads: 156 },
  { id: "c11", title: "Export Incentive Scheme – Eligibility Criteria", category: "Industry Notification", publishedDate: "2024-11-20", description: "Details of new export incentive scheme for distributor members.", fileSize: "2.8 MB", downloads: 298 },
  { id: "c12", title: "AGM 2024 – Minutes of Meeting", category: "AGM Notice", publishedDate: "2024-10-05", description: "Approved minutes of the 26th Annual General Meeting.", fileSize: "4.1 MB", downloads: 423 },
];

export const MEETINGS: Meeting[] = [
  { id: "mt1", title: "27th Annual Conference 2025", type: "Annual Conference", date: "2025-06-15", time: "10:00 AM", venue: "India Habitat Centre, New Delhi", mode: "physical", registered: 245, capacity: 500, status: "upcoming", description: "Flagship annual conference with industry leaders, policy discussions, and networking." },
  { id: "mt2", title: "Maharashtra State Chapter Meeting", type: "State Meeting", date: "2025-05-20", time: "11:00 AM", venue: "Hotel Taj, Mumbai", mode: "physical", registered: 89, capacity: 150, status: "upcoming", description: "Quarterly state chapter meeting for Maharashtra members." },
  { id: "mt3", title: "Distributor Growth Seminar – South Zone", type: "Distributor Seminar", date: "2025-05-08", time: "09:30 AM", venue: "Hyderabad Convention Centre", mode: "hybrid", registered: 120, capacity: 200, status: "upcoming", description: "Seminar on growth strategies for distributors in South India." },
  { id: "mt4", title: "GST Compliance Webinar", type: "Webinar", date: "2025-04-25", time: "03:00 PM", venue: "Online (Zoom)", mode: "virtual", registered: 312, capacity: 500, status: "upcoming", description: "Expert session on GST compliance for distributors and retailers." },
  { id: "mt5", title: "Gujarat Regional Meet", type: "State Meeting", date: "2025-04-10", time: "10:30 AM", venue: "Ahmedabad Trade Centre", mode: "physical", registered: 67, capacity: 100, status: "completed", description: "Regional meet for Gujarat federation members." },
  { id: "mt6", title: "Digital Transformation Workshop", type: "Webinar", date: "2025-03-22", time: "02:00 PM", venue: "Online (Teams)", mode: "virtual", registered: 198, capacity: 300, status: "completed", description: "Workshop on digital tools for modern distribution businesses." },
  { id: "mt7", title: "Karnataka Distributor Summit", type: "Distributor Seminar", date: "2025-07-05", time: "09:00 AM", venue: "Bengaluru Palace Grounds", mode: "physical", registered: 45, capacity: 250, status: "upcoming", description: "Summit focusing on Karnataka distribution ecosystem." },
  { id: "mt8", title: "Board of Directors Meeting Q2", type: "Board Meeting", date: "2025-05-01", time: "04:00 PM", venue: "Federation House, New Delhi", mode: "physical", registered: 12, capacity: 15, status: "upcoming", description: "Quarterly board meeting – members by invitation only." },
];

export function generateNotifications(count = 20): Notification[] {
  const channels: ("email" | "sms" | "whatsapp")[] = ["email", "sms", "whatsapp"];
  const statuses: ("sent" | "pending" | "failed")[] = ["sent", "sent", "sent", "pending", "failed"];
  const types = ["Membership Renewal", "Payment Receipt", "Meeting Reminder", "Circular Alert", "Grievance Update"];

  return Array.from({ length: count }, (_, i) => ({
    id: `notif-${i + 1}`,
    channel: pick(channels),
    recipient: `+91 ${randomInt(70, 99)}${randomInt(10000000, 99999999)}`,
    subject: `${pick(types)} – Federation Alert`,
    status: pick(statuses),
    sentAt: randomDate(2025, 2025),
    type: pick(types),
  }));
}

export function generateActivities(): Activity[] {
  return [
    { id: "a1", action: "New member registered – AIDR-0120", user: "System", timestamp: "2025-05-26T09:15:00", type: "member" },
    { id: "a2", action: "Payment received ₹5,000 from Rajesh Kumar", user: "Accounts", timestamp: "2025-05-26T08:45:00", type: "payment" },
    { id: "a3", action: "Circular published: AGM 2025 Notice", user: "Admin", timestamp: "2025-05-25T16:30:00", type: "circular" },
    { id: "a4", action: "Meeting registration: Annual Conference (+12)", user: "System", timestamp: "2025-05-25T14:20:00", type: "meeting" },
    { id: "a5", action: "Grievance TKT-2025-0015 marked In Progress", user: "Support", timestamp: "2025-05-25T11:00:00", type: "grievance" },
    { id: "a6", action: "Member AIDR-0089 renewed membership", user: "System", timestamp: "2025-05-24T17:30:00", type: "member" },
    { id: "a7", action: "Bulk SMS sent to 450 members", user: "Admin", timestamp: "2025-05-24T10:00:00", type: "member" },
    { id: "a8", action: "Payment pending reminder sent (23 members)", user: "Accounts", timestamp: "2025-05-23T15:45:00", type: "payment" },
  ];
}

export function getStateWiseDistribution(members: Member[]): { name: string; value: number }[] {
  const map = new Map<string, number>();
  members.forEach((m) => map.set(m.state, (map.get(m.state) || 0) + 1));
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
}

export function getMemberGrowthData(): { month: string; members: number; registrations: number }[] {
  return [
    { month: "Jan", members: 980, registrations: 12 },
    { month: "Feb", members: 995, registrations: 15 },
    { month: "Mar", members: 1010, registrations: 18 },
    { month: "Apr", members: 1035, registrations: 25 },
    { month: "May", members: 1058, registrations: 23 },
    { month: "Jun", members: 1080, registrations: 22 },
    { month: "Jul", members: 1095, registrations: 15 },
    { month: "Aug", members: 1110, registrations: 20 },
    { month: "Sep", members: 1125, registrations: 18 },
    { month: "Oct", members: 1140, registrations: 22 },
    { month: "Nov", members: 1155, registrations: 19 },
    { month: "Dec", members: 1170, registrations: 15 },
  ];
}

export function getPaymentCollectionData(): { month: string; amount: number }[] {
  return [
    { month: "Jan", amount: 425000 },
    { month: "Feb", amount: 380000 },
    { month: "Mar", amount: 520000 },
    { month: "Apr", amount: 610000 },
    { month: "May", amount: 485000 },
    { month: "Jun", amount: 550000 },
    { month: "Jul", amount: 470000 },
    { month: "Aug", amount: 595000 },
    { month: "Sep", amount: 430000 },
    { month: "Oct", amount: 680000 },
    { month: "Nov", amount: 510000 },
    { month: "Dec", amount: 720000 },
  ];
}
