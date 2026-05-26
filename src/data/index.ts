import {
  generateMembers,
  generatePayments,
  generateGrievances,
  generateNotifications,
  generateActivities,
  CIRCULARS,
  MEETINGS,
} from "./generators";

export const MEMBERS = generateMembers(120);
export const PAYMENTS = generatePayments(MEMBERS, 30);
export const GRIEVANCES = generateGrievances(MEMBERS, 18);
export const NOTIFICATIONS = generateNotifications(24);
export const ACTIVITIES = generateActivities();
export { CIRCULARS, MEETINGS };
