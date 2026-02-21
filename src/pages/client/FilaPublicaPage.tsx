import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { mockQueue } from '@/mocks/data';
import { motion } from 'framer-motion';
import { Clock, User } from 'lucide-react';

export default function FilaPublicaPage() {
  const { tenant } = useParams();

  return (
    <div className="max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Fila de espera</h1>
        <p className="text-sm text-muted-foreground mb-6">Acompanhe sua posição em tempo real</p>
      </motion.div>

      <div className="space-y-3">
        {mockQueue.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={item.status === 'in_service' ? 'border-primary/30' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold ${item.status === 'in_service' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {item.position}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.clientName}</p>
                    <p className="text-xs text-muted-foreground">{item.serviceName}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'in_service' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {item.status === 'in_service' ? 'Atendendo' : 'Aguardando'}
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}
