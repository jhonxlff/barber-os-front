import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockClients, mockAppointments } from '@/mocks/data';
import { ArrowLeft, MessageSquare, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '@/components/shared/StatusBadge';

export default function ClienteDetalhePage() {
  const { tenant, clientId } = useParams();
  const navigate = useNavigate();
  const client = mockClients.find(c => c.id === clientId);

  if (!client) return <div className="p-8 text-center text-muted-foreground">Cliente não encontrado.</div>;

  const clientAppointments = mockAppointments.filter(a => a.clientId === client.id);
  const daysSinceVisit = Math.floor((Date.now() - new Date(client.lastVisit).getTime()) / (1000 * 60 * 60 * 24));
  const loyaltyProgress = (client.loyaltyPoints % 10) * 10;

  return (
    <div>
      <PageHeader title={client.name} description={client.phone}>
        <Button variant="outline" size="sm" onClick={() => navigate(`/app/${tenant}/clientes`)}><ArrowLeft className="h-4 w-4 mr-1" /> Voltar</Button>
        <Button size="sm" className="gap-1"><MessageSquare className="h-4 w-4" /> Enviar mensagem</Button>
      </PageHeader>

      {daysSinceVisit > 25 && (
        <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <span className="text-sm">Há <strong>{daysSinceVisit} dias</strong> sem cortar!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Informações</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">E-mail:</span> {client.email || '—'}</p>
            <p><span className="text-muted-foreground">Frequência:</span> a cada {client.averageFrequency} dias</p>
            <p><span className="text-muted-foreground">Total gasto:</span> {client.totalSpent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            <p><span className="text-muted-foreground">Cliente desde:</span> {client.createdAt}</p>
            {client.notes && <p className="text-muted-foreground italic">"{client.notes}"</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Fidelidade</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Nível:</span>
              <span className="font-medium">{client.loyaltyLevel}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{client.loyaltyPoints % 10} de 10 cortes</span>
                <span>Próximo brinde</span>
              </div>
              <Progress value={loyaltyProgress} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground">Total de pontos: {client.loyaltyPoints}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Fotos de cortes</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  Foto {i}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Histórico de atendimentos</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {clientAppointments.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">Nenhum atendimento registrado.</p>
            ) : clientAppointments.map(a => (
              <div key={a.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium">{a.serviceName}</p>
                  <p className="text-xs text-muted-foreground">{a.date} às {a.time} • {a.barberName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={a.status} />
                  <span className="text-sm font-semibold">{a.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
