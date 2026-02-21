import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockBarbers, mockTenant } from '@/mocks/data';
import { UserPlus } from 'lucide-react';

const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function EquipePage() {
  return (
    <div>
      <PageHeader title="Equipe e Unidades" description="Gerencie barbeiros e unidades">
        <Button size="sm" className="gap-1"><UserPlus className="h-4 w-4" /> Adicionar barbeiro</Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {mockBarbers.map(b => (
          <Card key={b.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.email} • {b.phone}</p>
                  <p className="text-xs text-muted-foreground mt-1">Cargo: {b.role} • Comissão: {b.commissionRate}%</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${b.active ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'}`}>
                  {b.active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {b.workingHours.map(wh => (
                  <span key={wh.dayOfWeek} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    {dayNames[wh.dayOfWeek]} {wh.start}-{wh.end}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Unidades</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mockTenant.units.map(u => (
            <div key={u.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-medium">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.address} • {u.phone}</p>
              </div>
              <Button variant="outline" size="sm">Editar</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
