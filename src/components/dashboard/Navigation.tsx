"use client";

import { useApp } from "@/components/AppProvider";
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Settings, 
  HelpCircle, 
  Menu, 
  X,
  CreditCard,
  User,
  ShieldCheck,
  Moon,
  Sun
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { useToast } from "@/components/ToastProvider";

export function Sidebar() {
  const { role, setRole } = useApp();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleRoleChange = (newRole: "User" | "Admin") => {
    setRole(newRole);
    showToast(`Switched to ${newRole} Perspective`, "success");
  };
// ... rest of the component

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: ArrowLeftRight, label: "Transactions" },
    { icon: CreditCard, label: "Cards" },
    { icon: ShieldCheck, label: "Security", adminOnly: true },
    { icon: Settings, label: "Settings" },
  ];

  const filteredItems = menuItems.filter(item => !item.adminOnly || role === "Admin");

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 glass-card rounded-lg"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <motion.aside 
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -300,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
        className={cn(
          "fixed top-0 left-0 h-full w-[300px] bg-card border-r border-border z-40 lg:translate-x-0 overflow-y-auto px-6 py-10 flex flex-col",
          "lg:sticky lg:h-screen lg:top-0"
        )}
      >
        <div className="mb-10 text-xl font-bold flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg text-primary-foreground">
            <CreditCard size={24} />
          </div>
          <span className="bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
            ZorvynPay
          </span>
        </div>

        <nav className="w-full space-y-2 flex-grow">
          {filteredItems.map((item, idx) => (
            <button
              key={idx}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group text-sm font-medium",
                item.active 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon size={20} className={cn(
                "transition-transform group-hover:scale-110",
                item.active ? "text-primary-foreground" : "text-muted-foreground"
              )} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="w-full mt-auto pt-6 border-t border-border flex flex-col gap-4">
          <div className="bg-muted p-4 rounded-xl border border-border">
             <p className="text-[10px] text-muted-foreground mb-3 font-black uppercase tracking-widest">Dashboard Perspective</p>
             <div className="flex bg-background p-1 rounded-lg border border-border">
                <button 
                  onClick={() => handleRoleChange("User")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-black transition-all",
                    role === "User" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <User size={14}/> USER
                </button>
                <button 
                  onClick={() => handleRoleChange("Admin")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-black transition-all",
                    role === "Admin" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <ShieldCheck size={14}/> ADMIN
                </button>
             </div>
          </div>
          
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
            <HelpCircle size={20} />
            <span className="text-sm font-medium">Help Center</span>
          </button>
        </div>
      </motion.aside>
      
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export function TopNav() {
  const { isDarkMode, setIsDarkMode, role } = useApp();
  const { showToast } = useToast();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    showToast(`${!isDarkMode ? "Dark" : "Light"} Mode Enabled`, "info");
  };

  return (
    <header className="h-20 lg:h-24 sticky top-0 bg-background/80 backdrop-blur-md z-20 px-6 lg:px-10 flex items-center justify-between border-b border-border/50">
      <div className="hidden lg:block">
        <h1 className="text-xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">Good Morning, Welcome back.</p>
      </div>
      
      <div className="flex items-center gap-4 lg:gap-6 ml-auto lg:ml-0">
        <button 
          onClick={toggleTheme}
          className="p-3 bg-muted border border-border shadow-sm rounded-xl text-foreground hover:bg-accent transition-all flex items-center gap-2"
        >
          {isDarkMode ? <Sun size={20}/> : <Moon size={20}/>}
          <span className="text-xs font-bold hidden sm:inline">{isDarkMode ? "Light" : "Dark"}</span>
        </button>
        
        <div className="h-8 w-px bg-border hidden sm:block mx-1"></div>
        
        <div className="relative group">
          <button className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-muted transition-all active:scale-95">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black whitespace-nowrap">{role === "Admin" ? "System Admin" : "Sarah J. Stone"}</p>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{role === "Admin" ? "Terminal Node" : "Pro Core"}</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 p-0.5 shadow-lg shadow-primary/20 overflow-hidden">
              <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center font-black text-lg text-primary">
                {role === "Admin" ? "AD" : "SS"}
              </div>
            </div>
          </button>
          
          <div className="absolute top-full right-0 mt-3 w-56 dashboard-card p-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
            <div className="p-3 border-b border-border/50 mb-1">
              <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Account Hub</p>
            </div>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm font-black transition-colors">
              <Settings size={16} /> Preferences
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm font-black transition-colors">
              <User size={16} /> Profile Security
            </button>
            <div className="h-px bg-border/50 my-1"></div>
            <button 
              onClick={() => showToast("End-of-session protocol triggered", "info")}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500/10 text-rose-500 text-sm font-black transition-colors"
            >
              Sign Out Terminal
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
