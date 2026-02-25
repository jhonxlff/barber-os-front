// BarberOS — Serviço central de API
// TODO: Quando o backend estiver pronto, remova os mocks e use as chamadas reais

import { API_BASE_URL } from '@/config/env';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem('barberos_token');
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {}),
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem('barberos_token');
      localStorage.removeItem('barberos_user');
      window.location.href = '/login';
      throw new Error('Sessão expirada');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
      throw new Error(error.message || `Erro ${response.status}`);
    }

    return response.json();
  }

  get<T>(path: string) { return this.request<T>(path); }
  post<T>(path: string, body: unknown) { return this.request<T>(path, { method: 'POST', body: JSON.stringify(body) }); }
  put<T>(path: string, body: unknown) { return this.request<T>(path, { method: 'PUT', body: JSON.stringify(body) }); }
  patch<T>(path: string, body: unknown) { return this.request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }); }
  delete<T>(path: string) { return this.request<T>(path, { method: 'DELETE' }); }
}

export const api = new ApiClient(API_BASE_URL);

// === Módulos de API (prontos para conectar ao backend) ===

export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (data: { name: string; email: string; password: string }) => api.post('/auth/register', data),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  me: () => api.get('/auth/me'),
};

export const appointmentsApi = {
  list: (tenantSlug: string, params?: Record<string, string>) =>
    api.get(`/tenants/${tenantSlug}/appointments?${new URLSearchParams(params || {})}`),
  create: (tenantSlug: string, data: unknown) => api.post(`/tenants/${tenantSlug}/appointments`, data),
  update: (tenantSlug: string, id: string, data: unknown) => api.put(`/tenants/${tenantSlug}/appointments/${id}`, data),
  cancel: (tenantSlug: string, id: string) => api.patch(`/tenants/${tenantSlug}/appointments/${id}`, { status: 'CANCELADO' }),
};

export const clientsApi = {
  list: (tenantSlug: string) => api.get(`/tenants/${tenantSlug}/clients`),
  get: (tenantSlug: string, id: string) => api.get(`/tenants/${tenantSlug}/clients/${id}`),
  create: (tenantSlug: string, data: unknown) => api.post(`/tenants/${tenantSlug}/clients`, data),
  update: (tenantSlug: string, id: string, data: unknown) => api.put(`/tenants/${tenantSlug}/clients/${id}`, data),
};

export const financeApi = {
  summary: (tenantSlug: string, period?: string) => api.get(`/tenants/${tenantSlug}/finance/summary?period=${period || 'month'}`),
  entries: (tenantSlug: string) => api.get(`/tenants/${tenantSlug}/finance/entries`),
  commissions: (tenantSlug: string) => api.get(`/tenants/${tenantSlug}/finance/commissions`),
};

export const queueApi = {
  list: (tenantSlug: string) => api.get(`/tenants/${tenantSlug}/queue`),
  callNext: (tenantSlug: string) => api.post(`/tenants/${tenantSlug}/queue/next`, {}),
  add: (tenantSlug: string, data: unknown) => api.post(`/tenants/${tenantSlug}/queue`, data),
};

export const inventoryApi = {
  list: (tenantSlug: string) => api.get(`/tenants/${tenantSlug}/inventory`),
  update: (tenantSlug: string, id: string, data: unknown) => api.put(`/tenants/${tenantSlug}/inventory/${id}`, data),
};

export const reviewsApi = {
  list: (tenantSlug: string) => api.get(`/tenants/${tenantSlug}/reviews`),
};

export const teamApi = {
  list: (tenantSlug: string) => api.get(`/tenants/${tenantSlug}/team`),
  update: (tenantSlug: string, id: string, data: unknown) => api.put(`/tenants/${tenantSlug}/team/${id}`, data),
};

export const automationsApi = {
  list: (tenantSlug: string) => api.get(`/tenants/${tenantSlug}/automations`),
  create: (tenantSlug: string, data: unknown) => api.post(`/tenants/${tenantSlug}/automations`, data),
  toggle: (tenantSlug: string, id: string, active: boolean) =>
    api.patch(`/tenants/${tenantSlug}/automations/${id}`, { active }),
};

export const dashboardApi = {
  metrics: (tenantSlug: string) => api.get(`/tenants/${tenantSlug}/dashboard/metrics`),
  charts: (tenantSlug: string, days = 60, top = 5) =>
    api.get(`/tenants/${tenantSlug}/dashboard/charts?days=${days}&top=${top}`),
};

export const publicApi = {
  tenant: (tenantSlug: string) => api.get(`/public/tenants/${tenantSlug}`),
  services: (tenantSlug: string) => api.get(`/public/tenants/${tenantSlug}/services`),
  team: (tenantSlug: string) => api.get(`/public/tenants/${tenantSlug}/team`),
  upsertClient: (tenantSlug: string, data: unknown) => api.post(`/public/tenants/${tenantSlug}/clients/upsert`, data),
  createAppointment: (tenantSlug: string, data: unknown) => api.post(`/public/tenants/${tenantSlug}/appointments`, data),
};
