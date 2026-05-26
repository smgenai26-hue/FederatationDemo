export const INDIAN_STATES = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Haryana", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Assam", "Chhattisgarh",
];

export const CITIES: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubli"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida"],
  "West Bengal": ["Kolkata", "Howrah", "Siliguri"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
  Punjab: ["Chandigarh", "Ludhiana", "Amritsar"],
  Telangana: ["Hyderabad", "Warangal"],
  Kerala: ["Kochi", "Thiruvananthapuram"],
  "Madhya Pradesh": ["Bhopal", "Indore"],
  Haryana: ["Gurugram", "Faridabad"],
  Bihar: ["Patna", "Gaya"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada"],
};

export const FIRST_NAMES = [
  "Rajesh", "Amit", "Suresh", "Vikram", "Ramesh", "Anil", "Sunil", "Prakash",
  "Deepak", "Manoj", "Sanjay", "Ravi", "Arun", "Kiran", "Naveen", "Gopal",
  "Priya", "Sunita", "Meena", "Kavita", "Anita", "Pooja", "Neha", "Rekha",
];

export const LAST_NAMES = [
  "Sharma", "Patel", "Gupta", "Singh", "Kumar", "Reddy", "Mehta", "Jain",
  "Agarwal", "Verma", "Shah", "Iyer", "Nair", "Rao", "Desai", "Malhotra",
];

export const FIRM_PREFIXES = [
  "Shree", "Bharat", "National", "Supreme", "Golden", "Royal", "Prime",
  "Metro", "City", "Global", "United", "Star", "Om", "Lakshmi",
];

export const FIRM_SUFFIXES = [
  "Distributors", "Traders", "Enterprises", "Agencies", "Marketing",
  "Wholesale", "Retail Mart", "Sales Corporation", "Commercial", "Supply Co.",
];

export const DEMO_USERS = [
  {
    id: "u1",
    email: "admin@federation.com",
    password: "admin123",
    name: "Super Admin",
    role: "super_admin" as const,
  },
  {
    id: "u2",
    email: "accounts@federation.com",
    password: "accounts123",
    name: "Accounts Manager",
    role: "accounts" as const,
  },
  {
    id: "u3",
    email: "member@federation.com",
    password: "member123",
    name: "Rajesh Kumar",
    role: "member" as const,
  },
];

export const FEDERATION_INFO = {
  name: "All India Distributors & Retail Federation",
  shortName: "AIDR Federation",
  address: "Federation House, 42, Connaught Place, New Delhi - 110001",
  phone: "+91 11 4567 8900",
  email: "info@aidrfederation.org",
  website: "www.aidrfederation.org",
  gstin: "07AAAAA0000A1Z5",
  established: "1998",
};
