// BarberOS — AuthProvider (mock)
// TODO: Conectar ao backend real — substituir mock por chamadas a authApi

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole } from '@/types';
import { mockUser } from '@/mocks/data';

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
    const stored = localStorage.getItem('barberos_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (_email: string, _password: string) => {
    // TODO: Chamar authApi.login(email, password)
    // Mock: aceita qualquer credencial
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const loggedUser = { ...mockUser };
    localStorage.setItem('barberos_user', JSON.stringify(loggedUser));
    localStorage.setItem('barberos_token', 'mock-jwt-token');
    setUser(loggedUser);
    setIsLoading(false);
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const newUser: User = { ...mockUser, name, email };
    localStorage.setItem('barberos_user', JSON.stringify(newUser));
    localStorage.setItem('barberos_token', 'mock-jwt-token');
    setUser(newUser);
    setIsLoading(false);
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
