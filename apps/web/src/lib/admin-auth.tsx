"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ===== ADMIN CONFIG =====
const ADMIN_ACCOUNTS = [
  {
    email: "thinhliv@gmail.com",
    password: "123@123!321",
    name: "Thịnh",
    role: "Super Admin",
    avatar: "👨‍💼",
  },
];

interface AdminUser {
  email: string;
  name: string;
  role: string;
  avatar: string;
}

interface AdminContextType {
  admin: AdminUser | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lastwar_admin");
      if (stored) {
        setAdmin(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  function login(email: string, password: string) {
    const account = ADMIN_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (account) {
      const userData: AdminUser = {
        email: account.email,
        name: account.name,
        role: account.role,
        avatar: account.avatar,
      };
      setAdmin(userData);
      localStorage.setItem("lastwar_admin", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Email hoặc mật khẩu không đúng!" };
  }

  function logout() {
    setAdmin(null);
    localStorage.removeItem("lastwar_admin");
  }

  return (
    <AdminContext.Provider value={{ admin, login, logout, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
