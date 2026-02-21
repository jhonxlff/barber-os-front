import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { MoneyCard } from '@/components/shared/MoneyCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockFinanceEntries, mockBarbers } from '@/mocks/data';
import { DollarSign, TrendingUp, Users, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PageTransition, StaggerContainer, StaggerItem, FadeInUp } from '@/components/shared/MotionWrapper';

export default function FinanceiroPage() {
  const [period, setPeriod] = useState('month');

  const receitas = mockFinanceEntries.filter(e => e.type === 'receita').reduce((s, e) => s + e.amount, 0);
  const despesas = mockFinanceEntries.filter(e => e.type === 'despesa').reduce((s, e) => s + Math.abs(e.amount), 0);
  const liquido = receitas - despesas;
  const comissoes = receitas * 0.4;

  return (
    <PageTransition>
      <PageHeader title="Financeiro" description="Controle financeiro da barbearia">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Hoje</SelectItem>
            <SelectItem value="week">Semana</SelectItem>
            <SelectItem value="month">Mês</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="gap-1"><Download className="h-4 w-4" /> Exportar CSV</Button>
      </PageHeader>

      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StaggerItem><MoneyCard title="Receita bruta" value={receitas} icon={DollarSign} trend={{ value: 12, label: 'vs anterior' }} /></StaggerItem>
        <StaggerItem><MoneyCard title="Despesas" value={despesas} icon={ArrowDownRight} /></StaggerItem>
        <StaggerItem><MoneyCard title="Lucro líquido" value={liquido} icon={TrendingUp} trend={{ value: 8, label: 'vs anterior' }} /></StaggerItem>
        <StaggerItem><MoneyCard title="Comissões" value={comissoes} icon={Users} /></StaggerItem>
      </StaggerContainer>

      <FadeInUp delay={0.3}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2"><CardTitle className="text-base">Lançamentos</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {mockFinanceEntries.map(e => (
                  <div key={e.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full p-1.5 ${e.type === 'receita' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                        {e.type === 'receita' ? <ArrowUpRight className="h-4 w-4 text-green-400" /> : <ArrowDownRight className="h-4 w-4 text-red-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{e.description}</p>
                        <p className="text-xs text-muted-foreground">{e.date} • {e.category}{e.paymentMethod ? ` • ${e.paymentMethod}` : ''}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${e.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {e.amount >= 0 ? '+' : ''}{e.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Comissão por barbeiro</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {mockBarbers.map(b => {
                const barberRevenue = mockFinanceEntries.filter(e => e.barberId === b.id && e.type === 'receita').reduce((s, e) => s + e.amount, 0);
                const commission = barberRevenue * (b.commissionRate / 100);
                return (
                  <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium">{b.name}</p>
                      <p className="text-xs text-muted-foreground">{b.commissionRate}% de comissão</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{commission.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                      <p className="text-xs text-muted-foreground">de {barberRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </FadeInUp>
    </PageTransition>
  );
}
