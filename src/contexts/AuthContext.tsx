// BarberOS — AuthProvider (real API)
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole } from '@/types';
import { authApi } from '@/services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('barberos_token');
    if (token) {
      authApi.me()
        .then((u: any) => {
          setUser(u as User);
          localStorage.setItem('barberos_user', JSON.stringify(u));
        })
        .catch(() => {
          localStorage.removeItem('barberos_token');
          localStorage.removeItem('barberos_user');
        })
        .finally(() => setIsLoading(false));
    } else {
      // Fallback: try stored user for offline/mock scenarios
      const stored = localStorage.getItem('barberos_user');
      if (stored) {
        try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
      }
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res: any = await authApi.login(email, password);
      localStorage.setItem('barberos_token', res.token);
      localStorage.setItem('barberos_user', JSON.stringify(res.user));
      setUser(res.user as User);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res: any = await authApi.register({ name, email, password });
      localStorage.setItem('barberos_token', res.token);
      localStorage.setItem('barberos_user', JSON.stringify(res.user));
      setUser(res.user as User);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('barberos_user');
    localStorage.removeItem('barberos_token');
    setUser(null);
  }, []);

  const hasRole = useCallback((roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
