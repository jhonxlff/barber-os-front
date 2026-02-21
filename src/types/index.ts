// BarberOS — Core TypeScript types

export type UserRole = 'OWNER' | 'MANAGER' | 'BARBER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  tenantId: string;
}

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export type AppointmentStatus =
  | 'PENDENTE'
  | 'CONFIRMADO'
  | 'PAGO'
  | 'EM_DESLOCAMENTO'
  | 'ATRASADO'
  | 'FINALIZADO'
  | 'CANCELADO';

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string;
  time: string;
  duration: number; // minutes
  status: AppointmentStatus;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  lastVisit: string;
  averageFrequency: number; // days
  totalSpent: number;
  loyaltyPoints: number;
  loyaltyLevel: 'Bronze' | 'Prata' | 'Ouro' | 'Diamante';
  notes?: string;
  createdAt: string;
}

export interface Barber {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  commissionRate: number; // percentage
  unitId: string;
  workingHours: WorkingHours[];
  active: boolean;
}

export interface WorkingHours {
  dayOfWeek: number; // 0-6
  start: string;
  end: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // minutes
  description?: string;
  active: boolean;
}

export interface FinanceEntry {
  id: string;
  type: 'receita' | 'despesa';
  category: string;
  description: string;
  amount: number;
  date: string;
  barberId?: string;
  barberName?: string;
  paymentMethod?: string;
}

export interface QueueItem {
  id: string;
  clientName: string;
  clientPhone: string;
  position: number;
  estimatedWait: number; // minutes
  serviceName: string;
  status: 'waiting' | 'in_service' | 'done';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  minAlert: number;
  price: number;
  category: string;
}

export interface Review {
  id: string;
  clientName: string;
  rating: number; // 1-5
  comment: string;
  barberId: string;
  barberName: string;
  date: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  active: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface DashboardMetrics {
  revenueToday: number;
  revenueMonth: number;
  clientsToday: number;
  upcomingAppointments: number;
  noShowRate: number;
  averageTicket: number;
}
