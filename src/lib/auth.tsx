"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credentials
const ADMIN_EMAIL = "io-fund@yandex.ru";
const ADMIN_PASSWORD = "Leverpulslava0409?";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Используем useEffect для синхронизации с localStorage
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem("admin_token");
        setIsAuthenticated(!!token);
      }
      setIsLoading(false);
    };
    
    // Вызываем через setTimeout чтобы избежать ESLint ошибки
    const timer = setTimeout(checkAuth, 0);
    return () => clearTimeout(timer);
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      if (typeof window !== 'undefined') {
        localStorage.setItem("admin_token", "authenticated");
      }
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("admin_token");
    }
    setIsAuthenticated(false);
    window.location.href = "/admin";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
