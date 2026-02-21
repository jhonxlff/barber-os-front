// BarberOS — Dados mockados
// TODO: Remover este arquivo quando conectar ao backend real

import type {
  User, Tenant, Appointment, Client, Barber, Service,
  FinanceEntry, QueueItem, Product, Review, AutomationRule,
  Notification, DashboardMetrics
} from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@barberos.com',
  role: 'OWNER',
  avatar: undefined,
  tenantId: 'barbearia-do-joao',
};

export const mockTenant: Tenant = {
  id: '1',
  slug: 'barbearia-do-joao',
  name: 'Barbearia do João',
  units: [
    { id: '1', name: 'Unidade Centro', address: 'Rua das Flores, 123 - Centro', phone: '(11) 99999-0001' },
    { id: '2', name: 'Unidade Vila Nova', address: 'Av. Brasil, 456 - Vila Nova', phone: '(11) 99999-0002' },
  ],
};

export const mockServices: Service[] = [
  { id: '1', name: 'Corte Masculino', price: 45, duration: 30, active: true },
  { id: '2', name: 'Barba', price: 30, duration: 20, active: true },
  { id: '3', name: 'Corte + Barba', price: 65, duration: 45, active: true },
  { id: '4', name: 'Degradê', price: 55, duration: 40, active: true },
  { id: '5', name: 'Sobrancelha', price: 15, duration: 10, active: true },
  { id: '6', name: 'Hidratação', price: 40, duration: 30, active: true },
];

export const mockBarbers: Barber[] = [
  { id: '1', name: 'João Silva', email: 'joao@b.com', phone: '(11) 99999-0001', role: 'OWNER', commissionRate: 50, unitId: '1', workingHours: [{ dayOfWeek: 1, start: '09:00', end: '19:00' }, { dayOfWeek: 2, start: '09:00', end: '19:00' }, { dayOfWeek: 3, start: '09:00', end: '19:00' }, { dayOfWeek: 4, start: '09:00', end: '19:00' }, { dayOfWeek: 5, start: '09:00', end: '19:00' }, { dayOfWeek: 6, start: '09:00', end: '14:00' }], active: true },
  { id: '2', name: 'Carlos Oliveira', email: 'carlos@b.com', phone: '(11) 99999-0002', role: 'BARBER', commissionRate: 40, unitId: '1', workingHours: [{ dayOfWeek: 1, start: '10:00', end: '20:00' }, { dayOfWeek: 2, start: '10:00', end: '20:00' }, { dayOfWeek: 3, start: '10:00', end: '20:00' }, { dayOfWeek: 4, start: '10:00', end: '20:00' }, { dayOfWeek: 5, start: '10:00', end: '20:00' }], active: true },
  { id: '3', name: 'Pedro Santos', email: 'pedro@b.com', phone: '(11) 99999-0003', role: 'BARBER', commissionRate: 40, unitId: '2', workingHours: [{ dayOfWeek: 1, start: '09:00', end: '18:00' }, { dayOfWeek: 2, start: '09:00', end: '18:00' }, { dayOfWeek: 3, start: '09:00', end: '18:00' }, { dayOfWeek: 4, start: '09:00', end: '18:00' }, { dayOfWeek: 5, start: '09:00', end: '18:00' }, { dayOfWeek: 6, start: '09:00', end: '13:00' }], active: true },
];

export const mockClients: Client[] = [
  { id: '1', name: 'Rafael Costa', phone: '(11) 98765-4321', email: 'rafael@email.com', lastVisit: '2026-02-18', averageFrequency: 21, totalSpent: 1250, loyaltyPoints: 8, loyaltyLevel: 'Ouro', createdAt: '2025-06-15' },
  { id: '2', name: 'Bruno Almeida', phone: '(11) 98765-4322', email: 'bruno@email.com', lastVisit: '2026-02-15', averageFrequency: 14, totalSpent: 2100, loyaltyPoints: 15, loyaltyLevel: 'Diamante', createdAt: '2025-03-10' },
  { id: '3', name: 'Lucas Ferreira', phone: '(11) 98765-4323', lastVisit: '2026-01-20', averageFrequency: 30, totalSpent: 450, loyaltyPoints: 3, loyaltyLevel: 'Bronze', createdAt: '2025-10-01' },
  { id: '4', name: 'Thiago Mendes', phone: '(11) 98765-4324', lastVisit: '2026-02-20', averageFrequency: 7, totalSpent: 3200, loyaltyPoints: 22, loyaltyLevel: 'Diamante', createdAt: '2025-01-05' },
  { id: '5', name: 'Gabriel Lima', phone: '(11) 98765-4325', email: 'gabriel@email.com', lastVisit: '2026-02-10', averageFrequency: 28, totalSpent: 780, loyaltyPoints: 6, loyaltyLevel: 'Prata', createdAt: '2025-08-20' },
  { id: '6', name: 'Matheus Ribeiro', phone: '(11) 98765-4326', lastVisit: '2025-12-15', averageFrequency: 45, totalSpent: 320, loyaltyPoints: 2, loyaltyLevel: 'Bronze', notes: 'Prefere corte curto, alergia a certos produtos', createdAt: '2025-09-01' },
];

export const mockAppointments: Appointment[] = [
  { id: '1', clientId: '1', clientName: 'Rafael Costa', clientPhone: '(11) 98765-4321', barberId: '1', barberName: 'João Silva', serviceId: '3', serviceName: 'Corte + Barba', price: 65, date: '2026-02-21', time: '10:00', duration: 45, status: 'CONFIRMADO' },
  { id: '2', clientId: '2', clientName: 'Bruno Almeida', clientPhone: '(11) 98765-4322', barberId: '2', barberName: 'Carlos Oliveira', serviceId: '1', serviceName: 'Corte Masculino', price: 45, date: '2026-02-21', time: '10:30', duration: 30, status: 'PENDENTE' },
  { id: '3', clientId: '4', clientName: 'Thiago Mendes', clientPhone: '(11) 98765-4324', barberId: '1', barberName: 'João Silva', serviceId: '4', serviceName: 'Degradê', price: 55, date: '2026-02-21', time: '11:00', duration: 40, status: 'PAGO' },
  { id: '4', clientId: '5', clientName: 'Gabriel Lima', clientPhone: '(11) 98765-4325', barberId: '3', barberName: 'Pedro Santos', serviceId: '1', serviceName: 'Corte Masculino', price: 45, date: '2026-02-21', time: '14:00', duration: 30, status: 'PENDENTE' },
  { id: '5', clientId: '3', clientName: 'Lucas Ferreira', clientPhone: '(11) 98765-4323', barberId: '2', barberName: 'Carlos Oliveira', serviceId: '2', serviceName: 'Barba', price: 30, date: '2026-02-21', time: '15:00', duration: 20, status: 'EM_DESLOCAMENTO' },
  { id: '6', clientId: '1', clientName: 'Rafael Costa', clientPhone: '(11) 98765-4321', barberId: '1', barberName: 'João Silva', serviceId: '1', serviceName: 'Corte Masculino', price: 45, date: '2026-02-20', time: '10:00', duration: 30, status: 'FINALIZADO' },
  { id: '7', clientId: '6', clientName: 'Matheus Ribeiro', clientPhone: '(11) 98765-4326', barberId: '3', barberName: 'Pedro Santos', serviceId: '3', serviceName: 'Corte + Barba', price: 65, date: '2026-02-20', time: '14:00', duration: 45, status: 'CANCELADO' },
];

export const mockFinanceEntries: FinanceEntry[] = [
  { id: '1', type: 'receita', category: 'Serviço', description: 'Corte + Barba - Rafael Costa', amount: 65, date: '2026-02-21', barberId: '1', barberName: 'João Silva', paymentMethod: 'Pix' },
  { id: '2', type: 'receita', category: 'Serviço', description: 'Corte Masculino - Bruno Almeida', amount: 45, date: '2026-02-21', barberId: '2', barberName: 'Carlos Oliveira', paymentMethod: 'Cartão' },
  { id: '3', type: 'receita', category: 'Serviço', description: 'Degradê - Thiago Mendes', amount: 55, date: '2026-02-21', barberId: '1', barberName: 'João Silva', paymentMethod: 'Dinheiro' },
  { id: '4', type: 'despesa', category: 'Produto', description: 'Pomada modeladora (12un)', amount: -180, date: '2026-02-20' },
  { id: '5', type: 'receita', category: 'Serviço', description: 'Corte Masculino - Rafael Costa', amount: 45, date: '2026-02-20', barberId: '1', barberName: 'João Silva', paymentMethod: 'Pix' },
  { id: '6', type: 'despesa', category: 'Fixo', description: 'Aluguel', amount: -3500, date: '2026-02-01' },
  { id: '7', type: 'receita', category: 'Produto', description: 'Pomada - venda avulsa', amount: 35, date: '2026-02-19', paymentMethod: 'Pix' },
];

export const mockQueue: QueueItem[] = [
  { id: '1', clientName: 'Rafael Costa', clientPhone: '(11) 98765-4321', position: 1, estimatedWait: 0, serviceName: 'Corte + Barba', status: 'in_service', createdAt: '2026-02-21T10:00:00' },
  { id: '2', clientName: 'Bruno Almeida', clientPhone: '(11) 98765-4322', position: 2, estimatedWait: 15, serviceName: 'Corte Masculino', status: 'waiting', createdAt: '2026-02-21T10:05:00' },
  { id: '3', clientName: 'Gabriel Lima', clientPhone: '(11) 98765-4325', position: 3, estimatedWait: 35, serviceName: 'Degradê', status: 'waiting', createdAt: '2026-02-21T10:10:00' },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Pomada Modeladora', quantity: 24, minAlert: 10, price: 35, category: 'Styling' },
  { id: '2', name: 'Shampoo Profissional', quantity: 8, minAlert: 5, price: 28, category: 'Higiene' },
  { id: '3', name: 'Óleo para Barba', quantity: 3, minAlert: 5, price: 42, category: 'Barba' },
  { id: '4', name: 'Lâmina Descartável (cx)', quantity: 15, minAlert: 5, price: 25, category: 'Descartável' },
  { id: '5', name: 'Toalha Quente (pct)', quantity: 2, minAlert: 3, price: 18, category: 'Descartável' },
];

export const mockReviews: Review[] = [
  { id: '1', clientName: 'Rafael Costa', rating: 5, comment: 'Atendimento excelente! Corte perfeito como sempre.', barberId: '1', barberName: 'João Silva', date: '2026-02-18' },
  { id: '2', clientName: 'Bruno Almeida', rating: 4, comment: 'Muito bom, mas esperou um pouco.', barberId: '2', barberName: 'Carlos Oliveira', date: '2026-02-15' },
  { id: '3', clientName: 'Thiago Mendes', rating: 5, comment: 'Degradê impecável, ambiente top.', barberId: '1', barberName: 'João Silva', date: '2026-02-14' },
  { id: '4', clientName: 'Gabriel Lima', rating: 3, comment: 'Bom corte, mas poderia melhorar o acabamento.', barberId: '3', barberName: 'Pedro Santos', date: '2026-02-10' },
];

export const mockAutomations: AutomationRule[] = [
  { id: '1', name: 'Aniversário do cliente', condition: 'Quando for aniversário do cliente', action: 'Enviar mensagem de parabéns + cupom 20%', active: true },
  { id: '2', name: 'Cliente sumiu', condition: 'Quando cliente ficar 25+ dias sem cortar', action: 'Enviar cupom de desconto 15%', active: true },
  { id: '3', name: 'Fidelidade completa', condition: 'Quando completar 10 cortes', action: 'Oferecer corte grátis + mensagem', active: false },
  { id: '4', name: 'Lembrete 24h', condition: '24h antes do agendamento', action: 'Enviar lembrete por WhatsApp', active: true },
];

export const mockNotifications: Notification[] = [
  { id: '1', title: 'Novo agendamento', message: 'Rafael Costa agendou Corte + Barba para hoje às 10:00', type: 'info', read: false, createdAt: '2026-02-21T08:30:00' },
  { id: '2', title: 'Estoque baixo', message: 'Óleo para Barba está com estoque baixo (3 unidades)', type: 'warning', read: false, createdAt: '2026-02-21T07:00:00' },
  { id: '3', title: 'Avaliação recebida', message: 'Rafael Costa deixou 5 estrelas', type: 'success', read: true, createdAt: '2026-02-20T18:00:00' },
];

export const mockDashboardMetrics: DashboardMetrics = {
  revenueToday: 165,
  revenueMonth: 12450,
  clientsToday: 5,
  upcomingAppointments: 3,
  noShowRate: 8.5,
  averageTicket: 52,
};

export const mockRevenueChart = [
  { date: '01/02', value: 380 }, { date: '02/02', value: 420 }, { date: '03/02', value: 0 },
  { date: '04/02', value: 510 }, { date: '05/02', value: 450 }, { date: '06/02', value: 390 },
  { date: '07/02', value: 480 }, { date: '08/02', value: 520 }, { date: '09/02', value: 0 },
  { date: '10/02', value: 610 }, { date: '11/02', value: 430 }, { date: '12/02', value: 470 },
  { date: '13/02', value: 380 }, { date: '14/02', value: 550 }, { date: '15/02', value: 490 },
  { date: '16/02', value: 0 }, { date: '17/02', value: 620 }, { date: '18/02', value: 410 },
  { date: '19/02', value: 530 }, { date: '20/02', value: 460 }, { date: '21/02', value: 165 },
];

export const mockServiceChart = [
  { name: 'Corte Masculino', value: 42 },
  { name: 'Corte + Barba', value: 28 },
  { name: 'Degradê', value: 15 },
  { name: 'Barba', value: 10 },
  { name: 'Outros', value: 5 },
];
