import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockServices, mockBarbers } from '@/mocks/data';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, CheckCircle2, Scissors } from 'lucide-react';
import { toast } from 'sonner';

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

export default function AgendarPage() {
  const { tenant } = useParams();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const service = mockServices.find(s => s.id === selectedService);
  const barber = mockBarbers.find(b => b.id === selectedBarber);

  const handleConfirm = () => {
    setConfirmed(true);
    toast.success('Agendamento confirmado! Você receberá um lembrete por WhatsApp.');
  };

  if (confirmed) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Agendamento confirmado!</h2>
        <p className="text-muted-foreground mb-1">{service?.name} com {barber?.name}</p>
        <p className="text-muted-foreground mb-6">Hoje às {selectedTime} • {service?.duration}min</p>
        <p className="text-sm text-muted-foreground">Você receberá um lembrete por WhatsApp 24h antes.</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">Agendar horário</h1>
        <p className="text-sm text-muted-foreground mb-6">Escolha o serviço, profissional e horário</p>
      </motion.div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-muted'}`} />
        ))}
      </div>

      {/* Step 1: Service */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
          <h2 className="font-semibold flex items-center gap-2"><Scissors className="h-4 w-4 text-primary" /> Escolha o serviço</h2>
          {mockServices.filter(s => s.active).map(s => (
            <button
              key={s.id}
              onClick={() => { setSelectedService(s.id); setStep(2); }}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selectedService === s.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.duration} min</p>
                </div>
                <span className="font-bold text-primary">R$ {s.price}</span>
              </div>
            </button>
          ))}
        </motion.div>
      )}

      {/* Step 2: Barber */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
          <h2 className="font-semibold flex items-center gap-2"><User className="h-4 w-4 text-primary" /> Escolha o profissional</h2>
          {mockBarbers.filter(b => b.active).map(b => (
            <button
              key={b.id}
              onClick={() => { setSelectedBarber(b.id); setStep(3); }}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selectedBarber === b.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {b.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-sm">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.role === 'OWNER' ? 'Proprietário' : 'Barbeiro'}</p>
                </div>
              </div>
            </button>
          ))}
          <Button variant="ghost" size="sm" onClick={() => setStep(1)}>← Voltar</Button>
        </motion.div>
      )}

      {/* Step 3: Time */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <h2 className="font-semibold flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Escolha o horário</h2>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${selectedTime === t ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/30'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {selectedTime && service && barber && (
            <Card className="border-primary/30">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-2">Resumo</h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>Serviço: <span className="text-foreground font-medium">{service.name}</span></p>
                  <p>Profissional: <span className="text-foreground font-medium">{barber.name}</span></p>
                  <p>Horário: <span className="text-foreground font-medium">Hoje às {selectedTime}</span></p>
                  <p>Duração: <span className="text-foreground font-medium">{service.duration} min</span></p>
                  <p className="text-lg font-bold text-primary mt-2">R$ {service.price}</p>
                </div>
                <Button className="w-full mt-4 gap-2" onClick={handleConfirm}>
                  <CheckCircle2 className="h-4 w-4" /> Confirmar agendamento
                </Button>
              </CardContent>
            </Card>
          )}
          <Button variant="ghost" size="sm" onClick={() => setStep(2)}>← Voltar</Button>
        </motion.div>
      )}
    </div>
  );
}
