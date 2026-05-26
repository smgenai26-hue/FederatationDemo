export type UserRole = "super_admin" | "accounts" | "member";

export interface DemoUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export type MemberStatus = "active" | "pending" | "inactive" | "suspended";
export type MembershipType = "lifetime" | "annual" | "associate";

export interface Member {
  id: string;
  memberId: string;
  name: string;
  firmName: string;
  state: string;
  city: string;
  mobile: string;
  email: string;
  gstNo: string;
  membershipType: MembershipType;
  status: MemberStatus;
  joinedDate: string;
  validityDate: string;
  photoUrl?: string;
}

export type PaymentStatus = "success" | "pending" | "failed";

export interface Payment {
  id: string;
  transactionId: string;
  memberId: string;
  memberName: string;
  amount: number;
  type: string;
  status: PaymentStatus;
  date: string;
  method: string;
}

export type GrievanceStatus = "open" | "in_progress" | "resolved";
export type GrievancePriority = "low" | "medium" | "high";

export interface GrievanceMessage {
  id: string;
  author: string;
  role: string;
  message: string;
  timestamp: string;
}

export interface Grievance {
  id: string;
  ticketNo: string;
  subject: string;
  memberName: string;
  memberId: string;
  category: string;
  status: GrievanceStatus;
  priority: GrievancePriority;
  createdAt: string;
  updatedAt: string;
  description: string;
  messages: GrievanceMessage[];
}

export interface Circular {
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  description: string;
  fileSize: string;
  downloads: number;
  isNew?: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  venue: string;
  mode: "physical" | "virtual" | "hybrid";
  registered: number;
  capacity: number;
  status: "upcoming" | "ongoing" | "completed";
  description: string;
}

export interface Notification {
  id: string;
  channel: "email" | "sms" | "whatsapp";
  recipient: string;
  subject: string;
  status: "sent" | "pending" | "failed";
  sentAt: string;
  type: string;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: "member" | "payment" | "circular" | "meeting" | "grievance";
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  pendingPayments: number;
  upcomingMeetings: number;
  circularsPublished: number;
  openGrievances: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}
