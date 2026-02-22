import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  Calendar, Users, DollarSign, Zap, Star, BarChart3,
  MessageSquare, Shield, Smartphone, Clock, CheckCircle2, ArrowRight
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const stats = [
  { value: '2.500+', label: 'Barbearias ativas' },
  { value: '150 mil+', label: 'Agendamentos/mês' },
  { value: '98%', label: 'Satisfação dos clientes' },
  { value: '40%', label: 'Menos faltas' },
];

const features = [
  { icon: Calendar, title: 'Agenda Inteligente', desc: 'Agendamento online 24h com confirmação automática via WhatsApp.' },
  { icon: Users, title: 'CRM de Clientes', desc: 'Histórico completo, fidelidade e alertas de clientes sumidos.' },
  { icon: DollarSign, title: 'Financeiro Completo', desc: 'Receitas, despesas, comissões e relatórios em tempo real.' },
  { icon: Zap, title: 'Automações', desc: 'Lembretes, cupons de aniversário e reativação automática.' },
  { icon: Star, title: 'Avaliações', desc: 'Colete feedback e melhore a experiência do seu cliente.' },
  { icon: BarChart3, title: 'Relatórios', desc: 'Métricas de faturamento, ticket médio e performance da equipe.' },
];

const testimonials = [
  { name: 'Carlos Silva', role: 'Barbearia Clássica — SP', text: 'Reduzi 40% das faltas e aumentei meu faturamento em 3 meses. O NavalhaPro transformou meu negócio.' },
  { name: 'André Costa', role: 'Studio Barber — RJ', text: 'Meus clientes adoram agendar pelo celular. A fila digital acabou com a confusão na loja.' },
  { name: 'Felipe Mendes', role: 'Barba & Navalha — MG', text: 'O controle financeiro me deu clareza. Sei exatamente quanto cada barbeiro traz de receita.' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Smartphone className="h-4 w-4" /> #1 em gestão para barbearias no Brasil
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              Sua barbearia no <span className="text-gradient">piloto automático</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Agenda online, CRM, financeiro, fila digital e automações — tudo em um só lugar.
              Feito por barbeiros, para barbeiros brasileiros.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/demo">
                <Button size="lg" className="gap-2 text-base px-8">
                  Testar grátis por 14 dias <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" size="lg" className="text-base px-8">
                  Ver funcionalidades
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto"
          >
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Tudo que sua barbearia precisa</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Gerencie agendamentos, clientes, finanças e equipe em uma plataforma única e intuitiva.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="h-full hover:border-primary/30 transition-colors group">
                  <CardContent className="p-6">
                    <div className="rounded-lg bg-primary/10 p-2.5 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">O que nossos clientes dizem</h2>
            <p className="text-muted-foreground">Milhares de barbeiros já transformaram seus negócios.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-primary text-primary" />)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Pronto para modernizar sua barbearia?</h2>
            <p className="text-muted-foreground mb-8">Comece agora com 14 dias grátis. Sem cartão de crédito, sem compromisso.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/demo">
                <Button size="lg" className="gap-2 px-8">Começar grátis <ArrowRight className="h-4 w-4" /></Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="gap-2 px-8">
                  <MessageSquare className="h-4 w-4" /> Falar com especialista
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
