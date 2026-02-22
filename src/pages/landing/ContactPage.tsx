import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Mensagem enviada! Entraremos em contato em breve.');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Fale conosco</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Tem dúvidas? Quer uma demonstração personalizada? Estamos aqui para ajudar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nome</Label>
                      <Input placeholder="Seu nome" required />
                    </div>
                    <div className="space-y-2">
                      <Label>WhatsApp</Label>
                      <Input placeholder="(11) 99999-9999" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input type="email" placeholder="seu@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome da barbearia</Label>
                    <Input placeholder="Barbearia do João" />
                  </div>
                  <div className="space-y-2">
                    <Label>Mensagem</Label>
                    <Textarea placeholder="Como podemos ajudar?" rows={4} />
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={loading}>
                    <Send className="h-4 w-4" /> {loading ? 'Enviando...' : 'Enviar mensagem'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Outros canais</h3>
              <div className="space-y-4">
                {[
                  { icon: MessageSquare, label: 'WhatsApp', value: '(11) 99999-0000', desc: 'Resposta em até 2 horas' },
                  { icon: Mail, label: 'E-mail', value: 'contato@navalhapro.com.br', desc: 'Resposta em até 24 horas' },
                  { icon: Phone, label: 'Telefone', value: '0800 123 4567', desc: 'Seg a Sex, 9h às 18h' },
                  { icon: MapPin, label: 'Escritório', value: 'São Paulo — SP', desc: 'Av. Paulista, 1000' },
                ].map(c => (
                  <div key={c.label} className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <c.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{c.label}</p>
                      <p className="text-sm text-foreground">{c.value}</p>
                      <p className="text-xs text-muted-foreground">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
