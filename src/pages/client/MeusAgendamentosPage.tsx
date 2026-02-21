import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockAppointments } from '@/mocks/data';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

export default function MeusAgendamentosPage() {
  const { tenant } = useParams();
  // Mock: show appointments for client "Rafael Costa"
  const myAppointments = mockAppointments.filter(a => a.clientId === '1');

  return (
    <div className="max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Meus agendamentos</h1>
        <p className="text-sm text-muted-foreground mb-6">Acompanhe seus horários marcados</p>
      </motion.div>

      <div className="space-y-3">
        {myAppointments.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className={a.status === 'CONFIRMADO' || a.status === 'PAGO' ? 'border-primary/20' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{a.date}</span>
                    <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                    <span>{a.time}</span>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
                <p className="text-sm font-medium">{a.serviceName}</p>
                <p className="text-xs text-muted-foreground">com {a.barberName} • {a.duration}min</p>
                <p className="text-sm font-bold text-primary mt-2">
                  {a.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
