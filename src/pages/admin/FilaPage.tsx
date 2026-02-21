import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockQueue } from '@/mocks/data';
import { ArrowRight, Clock, User } from 'lucide-react';

export default function FilaPage() {
  return (
    <div>
      <PageHeader title="Fila de Espera" description="Gerencie a fila de atendimento">
        <Button size="sm" className="gap-1"><ArrowRight className="h-4 w-4" /> Chamar próximo</Button>
      </PageHeader>

      <div className="space-y-3">
        {mockQueue.map(item => (
          <Card key={item.id} className={item.status === 'in_service' ? 'border-primary/30' : ''}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full h-10 w-10 flex items-center justify-center text-sm font-bold ${item.status === 'in_service' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {item.position}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.clientName}</p>
                    <p className="text-xs text-muted-foreground">{item.serviceName} • {item.clientPhone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === 'in_service' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {item.status === 'in_service' ? 'Atendendo' : item.status === 'waiting' ? 'Aguardando' : 'Concluído'}
                  </span>
                  {item.status === 'waiting' && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                      <Clock className="h-3 w-3" /> ~{item.estimatedWait} min
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
