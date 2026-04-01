export type TransactionStatus = "Completed" | "Pending" | "Failed";
export type TransactionType = "Income" | "Expense";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
  status: TransactionStatus;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: "2026-04-01",
    amount: 1500,
    category: "Salary",
    type: "Income",
    description: "Monthly Salary Deposit",
    status: "Completed",
  },
  {
    id: "2",
    date: "2026-04-01",
    amount: -45.5,
    category: "Food",
    type: "Expense",
    description: "Uber Eats Dinner",
    status: "Completed",
  },
  {
    id: "3",
    date: "2026-04-02",
    amount: -12.99,
    category: "Subscription",
    type: "Expense",
    description: "Netflix Monthly",
    status: "Completed",
  },
  {
    id: "4",
    date: "2026-04-02",
    amount: -1200,
    category: "Rent",
    type: "Expense",
    description: "April Rent Payment",
    status: "Completed",
  },
  {
    id: "5",
    date: "2026-04-03",
    amount: 300,
    category: "Freelance",
    type: "Income",
    description: "Web Design Project",
    status: "Pending",
  },
  {
    id: "6",
    date: "2026-04-03",
    amount: -25.0,
    category: "Transport",
    type: "Expense",
    description: "Gas Station",
    status: "Completed",
  },
  {
    id: "7",
    date: "2026-04-04",
    amount: -89.99,
    category: "Shopping",
    type: "Expense",
    description: "Amazon Order",
    status: "Completed",
  },
  {
    id: "8",
    date: "2026-04-04",
    amount: -60.0,
    category: "Food",
    type: "Expense",
    description: "Grocery Store",
    status: "Completed",
  },
];

export const MOCK_BALANCE_HISTORY = [
  { date: "Mar 29", amount: 4800 },
  { date: "Mar 30", amount: 4500 },
  { date: "Mar 31", amount: 5200 },
  { date: "Apr 01", amount: 6700 }, // Salary deposit
  { date: "Apr 02", amount: 5400 }, // Rent paid
  { date: "Apr 03", amount: 5700 }, // Freelance pending added? or just real
  { date: "Apr 04", amount: 5550 },
];

export const MOCK_CATEGORY_SPENDING = [
  { name: "Rent", value: 1200, color: "#4F46E5" },
  { name: "Food", value: 450, color: "#10B981" },
  { name: "Subscriptions", value: 85, color: "#F59E0B" },
  { name: "Transport", value: 140, color: "#EF4444" },
  { name: "Others", value: 200, color: "#6366F1" },
];

export const DASHBOARD_STATS = {
  totalBalance: 5550,
  monthlyIncome: 1800,
  monthlyExpenses: 2075.49,
  adminOnlyStats: {
    totalRevenue: 45200,
    activeUsers: 1240,
    averageLTV: 3600,
  },
};
