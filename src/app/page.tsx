"use client";

import { useApp } from "@/components/AppProvider";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceTrendChart, SpendingByCategoryChart } from "@/components/dashboard/Charts";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { Variants, motion } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 20 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 25 
    } 
  }
};

import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { useState, useEffect } from "react";

import { InsightsSection } from "@/components/dashboard/Insights";

export default function Dashboard() {
  const { role } = useApp();
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSyncing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isSyncing) {
    return <DashboardSkeleton />;
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-10"
    >
      <motion.section variants={item}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase italic text-foreground">Global Ledger</h2>
            <p className="text-sm text-muted-foreground font-bold">Real-time fiscal monitoring enabled</p>
          </div>
          <div className="hidden sm:flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
            <span className="text-xs font-black uppercase tracking-widest text-primary">Live Nexus Active</span>
          </div>
        </div>
        <SummaryCards role={role} />
      </motion.section>

      <motion.section variants={item}>
        <InsightsSection />
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div variants={item} className="lg:col-span-2">
          <BalanceTrendChart />
        </motion.div>
        <motion.div variants={item}>
          <SpendingByCategoryChart />
        </motion.div>
      </div>

      <motion.section variants={item}>
        <TransactionTable />
      </motion.section>
      
      {/* Role-based Banner Case */}
      {role === "Admin" && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-xl bg-primary text-primary-foreground shadow-xl border border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h4 className="font-black text-2xl tracking-tighter uppercase italic">Admin Security Protocol</h4>
            <p className="text-primary-foreground/90 font-medium max-w-lg">Advanced audit logging and user permission management are currently active. All administrative actions are recorded.</p>
          </div>
          <button className="whitespace-nowrap px-8 py-3 bg-white text-primary rounded-lg font-black text-sm hover:bg-white/90 transition-all shadow-lg active:scale-95">
            EXPORT AUDIT LOG
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
