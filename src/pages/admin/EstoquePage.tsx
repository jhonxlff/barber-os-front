import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/mocks/data';
import { Plus, AlertTriangle, Package } from 'lucide-react';

export default function EstoquePage() {
  return (
    <div>
      <PageHeader title="Estoque" description="Controle de produtos e insumos">
        <Button size="sm" className="gap-1"><Plus className="h-4 w-4" /> Novo produto</Button>
      </PageHeader>

      <div className="space-y-3">
        {mockProducts.map(p => {
          const lowStock = p.quantity <= p.minAlert;
          return (
            <Card key={p.id} className={lowStock ? 'border-destructive/30' : ''}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${lowStock ? 'bg-destructive/10' : 'bg-muted'}`}>
                      {lowStock ? <AlertTriangle className="h-4 w-4 text-destructive" /> : <Package className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.category} • R$ {p.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-sm font-bold ${lowStock ? 'text-destructive' : ''}`}>{p.quantity} un</p>
                      <p className="text-[10px] text-muted-foreground">Alerta: {p.minAlert}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">+ Entrada</Button>
                      <Button variant="outline" size="sm">- Saída</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
