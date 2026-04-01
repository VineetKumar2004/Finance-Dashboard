"use client";

import { CreditCard, ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { DASHBOARD_STATS } from "@/lib/mock";
import { motion } from "framer-motion";

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  trend?: string;
  trendType?: "up" | "down";
  isAdminOnly?: boolean;
}

function SummaryCard({ title, amount, icon, trend, trendType }: SummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-card p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div className="p-2.5 bg-primary/10 rounded-lg text-primary border border-primary/20">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium flex items-center gap-1 ${
            trendType === "up" ? "text-emerald-500" : "text-rose-500"
          }`}>
            {trendType === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-extrabold mt-1 tracking-tight text-foreground">
          {formatCurrency(amount)}
        </h3>
      </div>
    </motion.div>
  );
}

export function SummaryCards({ role }: { role: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SummaryCard
        title="Total Balance"
        amount={DASHBOARD_STATS.totalBalance}
        icon={<Wallet size={20} />}
        trend="+12.5%"
        trendType="up"
      />
      <SummaryCard
        title="Monthly Income"
        amount={DASHBOARD_STATS.monthlyIncome}
        icon={<ArrowUpRight size={20} />}
        trend="+5.2%"
        trendType="up"
      />
      <SummaryCard
        title="Monthly Expenses"
        amount={DASHBOARD_STATS.monthlyExpenses}
        icon={<ArrowDownRight size={20} />}
        trend="-2.4%"
        trendType="down"
      />
      
      {role === "Admin" && (
        <>
          <SummaryCard
            title="Total Revenue"
            amount={DASHBOARD_STATS.adminOnlyStats.totalRevenue}
            icon={<CreditCard size={20} />}
            trend="+18.7%"
            trendType="up"
          />
          <SummaryCard
            title="Active Users"
            amount={DASHBOARD_STATS.adminOnlyStats.activeUsers}
            icon={<Wallet size={20} />}
            trend="+8.1%"
            trendType="up"
          />
          <SummaryCard
            title="Avg. LTV"
            amount={DASHBOARD_STATS.adminOnlyStats.averageLTV}
            icon={<ArrowUpRight size={20} />}
            trend="+12.3%"
            trendType="up"
          />
        </>
      )}
    </div>
  );
}
