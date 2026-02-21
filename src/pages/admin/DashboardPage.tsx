import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { MoneyCard } from '@/components/shared/MoneyCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDashboardMetrics, mockAppointments, mockRevenueChart, mockServiceChart } from '@/mocks/data';
import { DollarSign, Users, Calendar, TrendingDown, Receipt, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(38, 92%, 50%)', 'hsl(217, 91%, 60%)', 'hsl(142, 71%, 45%)', 'hsl(0, 72%, 51%)', 'hsl(220, 10%, 55%)'];

export default function DashboardPage() {
  const { tenant } = useParams();
  const m = mockDashboardMetrics;
  const todayAppointments = mockAppointments.filter(a => a.date === '2026-02-21' && a.status !== 'CANCELADO');

  return (
    <div>
      <PageHeader title="Dashboard" description={`Barbearia do João — Visão geral`} />

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <MoneyCard title="Faturamento hoje" value={m.revenueToday} icon={DollarSign} trend={{ value: 12, label: 'vs ontem' }} />
        <MoneyCard title="Faturamento mês" value={m.revenueMonth} icon={Receipt} trend={{ value: 8, label: 'vs mês anterior' }} />
        <MoneyCard title="Clientes hoje" value={String(m.clientsToday)} icon={Users} />
        <MoneyCard title="Próximos" value={String(m.upcomingAppointments)} icon={Calendar} />
        <MoneyCard title="Taxa de faltas" value={`${m.noShowRate}%`} icon={TrendingDown} />
        <MoneyCard title="Ticket médio" value={m.averageTicket} icon={Clock} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Faturamento — Últimos 21 dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockRevenueChart}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 16%)" />
                  <XAxis dataKey="date" fontSize={11} stroke="hsl(220, 10%, 55%)" />
                  <YAxis fontSize={11} stroke="hsl(220, 10%, 55%)" tickFormatter={v => `R$${v}`} />
                  <Tooltip
                    contentStyle={{ background: 'hsl(220, 14%, 9%)', border: '1px solid hsl(220, 12%, 16%)', borderRadius: '8px' }}
                    labelStyle={{ color: 'hsl(35, 15%, 90%)' }}
                    formatter={(value: number) => [`R$ ${value}`, 'Faturamento']}
                  />
                  <Area type="monotone" dataKey="value" stroke="hsl(38, 92%, 50%)" fill="url(#colorRevenue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Serviços mais vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mockServiceChart} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} fontSize={11}>
                    {mockServiceChart.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Próximos agendamentos — Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayAppointments.map(a => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-center shrink-0">
                    <p className="text-sm font-bold">{a.time}</p>
                    <p className="text-[10px] text-muted-foreground">{a.duration}min</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{a.clientName}</p>
                    <p className="text-xs text-muted-foreground truncate">{a.serviceName} • {a.barberName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={a.status} />
                  <span className="text-sm font-semibold">
                    {a.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
