"use client";

import { Sparkles, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function InsightsSection() {
  const insights = [
    {
      title: "Saving Potential",
      description: "You've spent 15% less on 'Food' this month compared to your 3-month average. Keep it up!",
      icon: <Sparkles className="text-amber-500" size={20} />,
      color: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      title: "Subscription Alert",
      description: "You have 3 monthly subscriptions renewing in the next 48 hours totaling $84.97.",
      icon: <AlertCircle className="text-rose-500" size={20} />,
      color: "bg-rose-500/10",
      border: "border-rose-500/20"
    },
    {
      title: "Revenue Growth",
      description: "Freelance income has increased by $450 this month compared to March.",
      icon: <TrendingUp className="text-emerald-500" size={20} />,
      color: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Sparkles className="text-primary animate-pulse" size={24} />
        <h3 className="text-2xl font-black tracking-tighter uppercase italic text-foreground">Smart Insights</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-5 rounded-2xl border ${insight.border} ${insight.color} flex flex-col gap-3 group hover:scale-[1.02] transition-transform cursor-pointer`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background rounded-xl border border-border shadow-sm group-hover:rotate-12 transition-transform">
                {insight.icon}
              </div>
              <h4 className="font-black text-sm uppercase tracking-widest text-foreground">{insight.title}</h4>
            </div>
            <p className="text-xs font-bold text-muted-foreground leading-relaxed">{insight.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
