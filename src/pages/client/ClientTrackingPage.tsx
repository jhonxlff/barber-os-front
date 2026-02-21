import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { MapPin, Clock, Navigation, CheckCircle2 } from 'lucide-react';

const steps = [
  { label: 'Agendamento confirmado', done: true },
  { label: 'A caminho da barbearia', done: true, active: true },
  { label: 'Chegou na barbearia', done: false },
  { label: 'Atendimento iniciado', done: false },
];

export default function ClientTrackingPage() {
  const { appointmentId } = useParams();

  return (
    <div className="max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Acompanhar deslocamento</h1>
        <p className="text-sm text-muted-foreground mb-6">Agendamento #{appointmentId}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
        <Card className="mb-4">
          <CardContent className="p-0">
            <div className="aspect-video rounded-t-lg bg-muted flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-muted" />
              <div className="relative text-center space-y-2">
                <MapPin className="h-10 w-10 text-primary mx-auto" />
                <p className="text-sm text-muted-foreground">Mapa em tempo real</p>
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-border">
              <div className="p-4 text-center">
                <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold">10 min</p>
                <p className="text-[10px] text-muted-foreground">Chegada</p>
              </div>
              <div className="p-4 text-center">
                <Navigation className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold">2.5 km</p>
                <p className="text-[10px] text-muted-foreground">Distância</p>
              </div>
              <div className="p-4 text-center">
                <MapPin className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-primary">A caminho</p>
                <p className="text-[10px] text-muted-foreground">Status</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-4">Progresso</h3>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${s.done ? 'bg-primary/20' : 'bg-muted'}`}>
                    {s.done ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <div className="h-2 w-2 rounded-full bg-muted-foreground" />}
                  </div>
                  <span className={`text-sm ${s.active ? 'font-semibold text-primary' : s.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
