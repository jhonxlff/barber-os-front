import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  Calendar, Users, DollarSign, Zap, Star, BarChart3,
  ListOrdered, Package, MapPin, Smartphone, Bell, Shield,
  CreditCard, MessageSquare, ArrowRight, CheckCircle2
} from 'lucide-react';

const sections = [
  {
    icon: Calendar, title: 'Agenda Online',
    desc: 'Seus clientes agendam pelo celular, 24 horas por dia. Você recebe confirmações automáticas e nunca mais perde um horário.',
    features: ['Visualização dia/semana/mês', 'Bloqueio de horários', 'Encaixes inteligentes', 'Reagendamento fácil'],
  },
  {
    icon: Users, title: 'CRM Completo',
    desc: 'Conheça seus clientes como nunca. Histórico de cortes, frequência, gastos e programa de fidelidade integrado.',
    features: ['Perfil completo do cliente', 'Programa de fidelidade', 'Alertas de clientes sumidos', 'Galeria de cortes'],
  },
  {
    icon: DollarSign, title: 'Gestão Financeira',
    desc: 'Controle total do seu dinheiro. Receitas, despesas, comissões por barbeiro e exportação de relatórios.',
    features: ['Dashboard financeiro', 'Comissão por barbeiro', 'Exportação CSV', 'Controle de despesas'],
  },
  {
    icon: Zap, title: 'Automações Inteligentes',
    desc: 'Regras SE/ENTÃO que trabalham por você. Lembretes, cupons, reativação de clientes e muito mais.',
    features: ['Lembrete 24h automático', 'Cupom de aniversário', 'Reativação de inativos', 'Mensagens personalizadas'],
  },
  {
    icon: ListOrdered, title: 'Fila Digital',
    desc: 'Acabou a confusão na porta. Seus clientes acompanham a fila em tempo real pelo celular.',
    features: ['Fila em tempo real', 'Tempo estimado de espera', 'Chamada do próximo', 'Visualização pública'],
  },
  {
    icon: MapPin, title: 'Tracking em Tempo Real',
    desc: 'Acompanhe o deslocamento do cliente até a barbearia. Prepare-se antes dele chegar.',
    features: ['Mapa em tempo real', 'Tempo estimado de chegada', 'Notificações de proximidade', 'Status de deslocamento'],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

export default function FeaturesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Funcionalidades que fazem a diferença</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Cada recurso foi pensado para o dia a dia do barbeiro brasileiro. Simples, poderoso e prático.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature sections */}
      <section className="pb-20">
        <div className="container mx-auto px-4 space-y-16 max-w-5xl">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1">
                <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground mb-4">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <div className="aspect-video rounded-xl bg-muted/50 border border-border flex items-center justify-center">
                  <s.icon className="h-16 w-16 text-muted-foreground/30" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl font-bold mb-4">Convencido? Teste grátis por 14 dias</h2>
            <Link to="/demo">
              <Button size="lg" className="gap-2"><ArrowRight className="h-4 w-4" /> Começar agora</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
