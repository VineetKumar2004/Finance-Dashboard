"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Role = "User" | "Admin";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

import { ToastProvider } from "./ToastProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("User");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem("zorvyn_role") as Role;
    const savedTheme = localStorage.getItem("zorvyn_theme");

    if (savedRole) setRole(savedRole);
    if (savedTheme) setIsDarkMode(savedTheme === "dark");
    
    setIsMounted(true);
  }, []);

  // Persist and apply theme
  useEffect(() => {
    if (!isMounted) return;
    
    const root = window.document.documentElement;
    localStorage.setItem("zorvyn_role", role);
    localStorage.setItem("zorvyn_theme", isDarkMode ? "dark" : "light");

    if (isDarkMode) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }, [isDarkMode, role, isMounted]);

  // Prevent hydration mismatch
  if (!isMounted) {
    return <div className="min-h-screen bg-slate-900" />;
  }

  return (
    <RoleContext.Provider value={{ role, setRole, isDarkMode, setIsDarkMode }}>
      <ToastProvider>
        {children}
      </ToastProvider>
    </RoleContext.Provider>
  );
}

export function useApp() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
