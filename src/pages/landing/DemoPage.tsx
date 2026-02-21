import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle2, Rocket, Calendar, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';

const benefits = [
  { icon: Calendar, text: 'Agenda configurada em 5 minutos' },
  { icon: Shield, text: 'Sem cartão de crédito para testar' },
  { icon: Zap, text: 'Suporte via WhatsApp durante o trial' },
  { icon: CheckCircle2, text: 'Migração gratuita dos seus dados' },
];

export default function DemoPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Conta criada! Verifique seu e-mail para começar.');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Comece agora, <span className="text-gradient">grátis por 14 dias</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Crie sua conta em 2 minutos e veja como o BarberOS pode transformar sua barbearia. Sem surpresas, sem compromisso.
            </p>
            <div className="space-y-4">
              {benefits.map(b => (
                <div key={b.text} className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2"><b.icon className="h-4 w-4 text-primary" /></div>
                  <span className="text-sm">{b.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="rounded-full bg-primary/10 p-3"><Rocket className="h-6 w-6 text-primary" /></div>
                </div>
                <CardTitle>Criar conta grátis</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Seu nome</Label>
                    <Input placeholder="João Silva" required />
                  </div>
                  <div className="space-y-2">
                    <Label>WhatsApp</Label>
                    <Input placeholder="(11) 99999-9999" required />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input type="email" placeholder="joao@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome da barbearia</Label>
                    <Input placeholder="Barbearia do João" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Quantos profissionais?</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 (só eu)</SelectItem>
                        <SelectItem value="2-3">2 a 3</SelectItem>
                        <SelectItem value="4-5">4 a 5</SelectItem>
                        <SelectItem value="6+">6 ou mais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
                    <Rocket className="h-4 w-4" /> {loading ? 'Criando conta...' : 'Começar grátis agora'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Ao criar sua conta, você concorda com nossos Termos de Uso e Política de Privacidade.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
