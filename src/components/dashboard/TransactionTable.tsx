"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ChevronUp, ChevronDown, Filter, Download, Loader2 } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { MOCK_TRANSACTIONS, Transaction, TransactionType } from "@/lib/mock";
import { motion, AnimatePresence } from "framer-motion";

import { useToast } from "@/components/ToastProvider";

export function TransactionTable() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  
  // Corrected Export logic with Toast integration
  const exportData = (format: "csv" | "json") => {
    showToast(`Generating ${format.toUpperCase()} Report...`, "info");
    
    setTimeout(() => {
      let content = "";
      const fileName = `transactions_export_${new Date().toISOString().split('T')[0]}`;
      
      if (format === "json") {
        content = JSON.stringify(filteredTransactions, null, 2);
      } else {
        const headers = "Date,Description,Category,Amount,Type,Status\n";
        const rows = filteredTransactions.map(t => 
          `${t.date},${t.description},${t.category},${t.amount},${t.type},${t.status}`
        ).join("\n");
        content = headers + rows;
      }

      const blob = new Blob([content], { type: format === "json" ? "application/json" : "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.${format}`;
      link.click();
      URL.revokeObjectURL(url);
      
      showToast(`${format.toUpperCase()} Exported Successfully`, "success");
    }, 800);
  };
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "All">("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [sortField, setSortField] = useState<keyof Transaction>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Simulate Mock API Integration
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(MOCK_TRANSACTIONS.map(t => t.category))];
  }, []);

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS
      .filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) || 
                             t.category.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter === "All" || t.type === typeFilter;
        const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
        return matchesSearch && matchesType && matchesCategory;
      })
      .sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, typeFilter, categoryFilter, sortField, sortDirection]);

  const toggleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Removed duplicate exportData block below

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="dashboard-card overflow-hidden mt-8"
    >
      <div className="p-6 border-b border-border flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-muted/30">
        <div>
          <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase italic">Transaction Vault</h3>
          <p className="text-sm text-muted-foreground font-bold">Manage and monitor your latest fiscal activities</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground" size={18} />
            <input
              type="text"
              placeholder="Filter by description..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border-2 border-border text-sm font-bold focus:outline-none focus:border-primary transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <select
              className="bg-background border-2 border-border rounded-xl px-4 py-2.5 text-sm font-black focus:outline-none focus:border-primary transition-all"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
            >
              <option value="All">All Types</option>
              <option value="Income">Income Only</option>
              <option value="Expense">Expense Only</option>
            </select>
            
            <select 
              className="bg-background border-2 border-border rounded-xl px-4 py-2.5 text-sm font-black focus:outline-none focus:border-primary transition-all"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <div className="h-8 w-px bg-border mx-2 hidden md:block" />

            <div className="flex items-center gap-1">
               <button 
                onClick={() => exportData("csv")}
                className="p-2.5 bg-background border-2 border-border rounded-xl hover:border-primary hover:text-primary transition-all"
                title="Export CSV"
               >
                 <Download size={18} />
               </button>
               <button 
                onClick={() => exportData("json")}
                className="px-3 py-2.5 bg-background border-2 border-border rounded-xl font-black text-xs hover:border-primary hover:text-primary transition-all"
               >
                 JSON
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto relative min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <Loader2 className="animate-spin text-primary mb-4" size={40} />
            <p className="font-black tracking-widest text-sm uppercase animate-pulse">Syncing with secure vault...</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted text-foreground text-xs uppercase font-black tracking-widest">
                <th className="px-6 py-5 cursor-pointer hover:bg-muted-foreground/10 transition-colors" onClick={() => toggleSort("date")}>
                  <div className="flex items-center gap-2">
                    Date {sortField === "date" && (sortDirection === "asc" ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
                  </div>
                </th>
                <th className="px-6 py-5">Description</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5 cursor-pointer hover:bg-muted-foreground/10 transition-colors" onClick={() => toggleSort("amount")}>
                  <div className="flex items-center gap-2">
                    Amount {sortField === "amount" && (sortDirection === "asc" ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
                  </div>
                </th>
                <th className="px-6 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredTransactions.map((t, idx) => (
                  <motion.tr
                    key={t.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-primary/5 transition-colors group"
                  >
                    <td className="px-6 py-5 text-sm font-bold font-mono">{t.date}</td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-black group-hover:text-primary transition-colors">{t.description}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-0.5">{t.type}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[10px] px-3 py-1 rounded-md bg-primary text-primary-foreground font-black uppercase tracking-tighter">
                        {t.category}
                      </span>
                    </td>
                    <td className={`px-6 py-5 text-base font-black ${
                      t.type === "Income" ? "text-emerald-500" : "text-rose-500"
                    }`}>
                      {t.type === "Income" ? "+" : "-"}
                      {formatCurrency(Math.abs(t.amount))}
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "text-[10px] px-3 py-1.5 rounded-md font-black uppercase tracking-widest shadow-sm",
                        t.status === "Completed" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                        t.status === "Pending" ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" :
                        "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                      )}>
                        {t.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {!loading && filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-24 text-center">
                    <p className="text-xl font-black text-muted-foreground uppercase opacity-20">Secure Vault Empty</p>
                    <p className="text-sm font-bold text-muted-foreground mt-2">Adjust your filters to discover records</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}
