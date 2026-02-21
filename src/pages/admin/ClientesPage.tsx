import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockClients } from '@/mocks/data';
import { Search, ChevronRight } from 'lucide-react';

export default function ClientesPage() {
  const { tenant } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = mockClients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const levelColor = (level: string) => {
    switch (level) {
      case 'Diamante': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Ouro': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Prata': return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
      default: return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    }
  };

  return (
    <div>
      <PageHeader title="Clientes" description="Gerencie sua carteira de clientes" />

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar por nome ou telefone..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="p-3 font-medium text-muted-foreground">Nome</th>
                  <th className="p-3 font-medium text-muted-foreground">Telefone</th>
                  <th className="p-3 font-medium text-muted-foreground">Último corte</th>
                  <th className="p-3 font-medium text-muted-foreground">Frequência</th>
                  <th className="p-3 font-medium text-muted-foreground">Total gasto</th>
                  <th className="p-3 font-medium text-muted-foreground">Nível</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr
                    key={c.id}
                    className="border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/app/${tenant}/clientes/${c.id}`)}
                  >
                    <td className="p-3 font-medium">{c.name}</td>
                    <td className="p-3 text-muted-foreground">{c.phone}</td>
                    <td className="p-3 text-muted-foreground">{c.lastVisit}</td>
                    <td className="p-3 text-muted-foreground">a cada {c.averageFrequency} dias</td>
                    <td className="p-3 font-medium">{c.totalSpent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td className="p-3"><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${levelColor(c.loyaltyLevel)}`}>{c.loyaltyLevel}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <div className="md:hidden divide-y divide-border">
            {filtered.map(c => (
              <button
                key={c.id}
                className="w-full text-left flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                onClick={() => navigate(`/app/${tenant}/clientes/${c.id}`)}
              >
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.phone} • Último: {c.lastVisit}</p>
                  <p className="text-xs text-muted-foreground">{c.totalSpent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} gastos</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${levelColor(c.loyaltyLevel)}`}>{c.loyaltyLevel}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
