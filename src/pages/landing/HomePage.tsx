import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  Calendar, Users, DollarSign, Zap, Star, BarChart3,
  MessageSquare, Shield, Smartphone, Clock, CheckCircle2, ArrowRight,
  ListOrdered, MapPin, Package, Sparkles, TrendingUp, Award, Play,
  ChevronRight
} from 'lucide-react';

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{value.toLocaleString('pt-BR')}{suffix}</span>;
}

/* ─── Anim helpers ─── */
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const stats = [
  { value: 2500, suffix: '+', label: 'Barbearias ativas' },
  { value: 150, suffix: ' mil+', label: 'Agendamentos/mês' },
  { value: 98, suffix: '%', label: 'Satisfação' },
  { value: 40, suffix: '%', label: 'Menos faltas' },
];

const features = [
  { icon: Calendar, title: 'Agenda Inteligente', desc: 'Agendamento online 24h com confirmação automática via WhatsApp. Nunca mais perca um cliente.', color: 'from-amber-500/20 to-yellow-500/20' },
  { icon: Users, title: 'CRM de Clientes', desc: 'Histórico completo, fidelidade e alertas de clientes sumidos. Conheça quem paga suas contas.', color: 'from-blue-500/20 to-cyan-500/20' },
  { icon: DollarSign, title: 'Financeiro Completo', desc: 'Receitas, despesas, comissões e relatórios em tempo real. Saiba exatamente pra onde vai cada real.', color: 'from-emerald-500/20 to-green-500/20' },
  { icon: Zap, title: 'Automações', desc: 'Lembretes, cupons de aniversário e reativação automática. Trabalha enquanto você corta.', color: 'from-purple-500/20 to-violet-500/20' },
  { icon: ListOrdered, title: 'Fila Digital', desc: 'Acabou a confusão na porta. Seus clientes veem a fila em tempo real pelo celular.', color: 'from-orange-500/20 to-red-500/20' },
  { icon: BarChart3, title: 'Relatórios Pro', desc: 'Métricas de faturamento, ticket médio e performance da equipe. Decisões com dados, não achismo.', color: 'from-pink-500/20 to-rose-500/20' },
];

const plans = [
  {
    name: 'Básico',
    price: 'R$ 79',
    period: '/mês',
    desc: 'Para quem trabalha sozinho',
    features: ['Agenda online', 'CRM de clientes', 'Fila digital', 'Relatórios básicos', '1 profissional', 'Suporte por e-mail'],
    cta: 'Começar grátis',
    popular: false,
  },
  {
    name: 'Profissional',
    price: 'R$ 149',
    period: '/mês',
    desc: 'Para barbearias em crescimento',
    features: ['Tudo do Básico', 'Até 5 profissionais', 'Automações ilimitadas', 'Financeiro completo', 'Comissões', 'Estoque', 'Avaliações', 'WhatsApp prioritário'],
    cta: 'Testar 14 dias grátis',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'R$ 299',
    period: '/mês',
    desc: 'Para redes e múltiplas unidades',
    features: ['Tudo do Profissional', 'Ilimitado', 'Multi-unidades', 'API', 'Tracking real-time', 'Gerente dedicado', 'SLA garantido'],
    cta: 'Falar com vendas',
    popular: false,
  },
];

const testimonials = [
  { name: 'Carlos Silva', role: 'Barbearia Clássica — SP', text: 'Reduzi 40% das faltas e aumentei meu faturamento em 3 meses. O NavalhaPro transformou meu negócio.', rating: 5 },
  { name: 'André Costa', role: 'Studio Barber — RJ', text: 'Meus clientes adoram agendar pelo celular. A fila digital acabou com a confusão na loja.', rating: 5 },
  { name: 'Felipe Mendes', role: 'Barba & Navalha — MG', text: 'O controle financeiro me deu clareza. Sei exatamente quanto cada barbeiro traz de receita.', rating: 5 },
  { name: 'Marcos Oliveira', role: 'King Barber — BA', text: 'Saí do caderninho pro digital em um dia. A equipe toda aprendeu rápido. Recomendo demais!', rating: 5 },
];

const logos = ['Barbearia Clássica', 'Studio Barber', 'Barba & Navalha', 'King Barber', 'Corte Real', 'Navalha de Ouro'];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ══════════ HERO ══════════ */}
      <section className="relative py-24 sm:py-36">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/4" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 border border-primary/20 animate-pulse-glow"
            >
              <Sparkles className="h-4 w-4" /> #1 em gestão para barbearias no Brasil
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Sua barbearia no{' '}
              <span className="text-gradient relative">
                piloto automático
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-yellow-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Agenda online, CRM, financeiro, fila digital e automações — tudo em um só lugar.
              <strong className="text-foreground"> Feito por barbeiros, para barbeiros brasileiros.</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/demo">
                <Button size="lg" className="gap-2 text-base px-10 h-13 text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                  Testar grátis por 14 dias <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" size="lg" className="text-base px-10 h-13 text-lg hover:-translate-y-0.5 transition-all duration-300">
                  Ver funcionalidades
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2"
            >
              <Shield className="h-3.5 w-3.5" /> Sem cartão de crédito · Cancele quando quiser
            </motion.p>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-primary transition-transform duration-300 group-hover:scale-110">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ TRUST BAR ══════════ */}
      <section className="py-8 border-y border-border/50 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Confiam na NavalhaPro:</span>
            {logos.map((logo, i) => (
              <motion.span
                key={logo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ delay: i * 0.05 }}
                className="text-sm font-semibold text-muted-foreground cursor-default transition-all"
              >
                {logo}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ PROBLEMA → SOLUÇÃO ══════════ */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Por que NavalhaPro?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Chega de perder dinheiro com desorganização</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Caderninho, WhatsApp perdido, cliente que não aparece... Isso acaba hoje. Com a NavalhaPro, cada detalhe do seu negócio fica sob controle.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: '+40% faturamento', desc: 'Barbearias que usam NavalhaPro faturam em média 40% mais nos primeiros 3 meses.' },
              { icon: Clock, title: '2h economizadas/dia', desc: 'Pare de gerenciar agenda no WhatsApp. Automatize e foque no que importa: cortar cabelo.' },
              { icon: Award, title: '98% de satisfação', desc: 'Nota média de 4.9 nas avaliações. Seus clientes vão notar a diferença.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...stagger}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 group hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="rounded-2xl bg-primary/10 p-4 w-fit mx-auto mb-5 group-hover:bg-primary/20 transition-colors"
                    >
                      <item.icon className="h-7 w-7 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FUNCIONALIDADES ══════════ */}
      <section className="py-24 bg-muted/20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Funcionalidades</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Tudo que sua barbearia precisa. Em um só lugar.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Gerencie agendamentos, clientes, finanças e equipe em uma plataforma única e intuitiva.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
              >
                <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-500 group glow-card overflow-hidden">
                  <CardContent className="p-7 relative z-10">
                    <div className={`rounded-xl bg-gradient-to-br ${f.color} p-3 w-fit mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="mt-4"
                    >
                      <Link to="/features" className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                        Saiba mais <ChevronRight className="h-3 w-3" />
                      </Link>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link to="/features">
              <Button variant="outline" size="lg" className="gap-2 hover:-translate-y-0.5 transition-all duration-300">
                Ver todas as funcionalidades <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════ COMO FUNCIONA ══════════ */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Simples de começar</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Funcionando em 5 minutos</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />
            {[
              { step: '01', title: 'Crie sua conta', desc: 'Em 2 minutos, sem cartão de crédito. Configure serviços e horários.' },
              { step: '02', title: 'Compartilhe o link', desc: 'Envie o link de agendamento para seus clientes via WhatsApp.' },
              { step: '03', title: 'Lucre mais', desc: 'Acompanhe tudo pelo painel. Menos faltas, mais receita, zero papel.' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                {...stagger}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="text-center relative"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground font-extrabold text-lg flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/30 relative z-10"
                >
                  {s.step}
                </motion.div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PREÇOS ══════════ */}
      <section className="py-24 bg-muted/20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
        <div className="container mx-auto px-4 relative">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Preços</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Planos que cabem no seu bolso</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Comece grátis por 14 dias. Sem cartão de crédito. Cancele quando quiser.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="flex"
              >
                <Card className={`flex flex-col w-full relative transition-all duration-500 ${p.popular ? 'border-primary shadow-xl shadow-primary/15 scale-[1.03]' : 'border-border/50 hover:border-primary/30'}`}>
                  {p.popular && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
                    >
                      <Zap className="h-3.5 w-3.5" /> Mais popular
                    </motion.div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-lg">{p.name}</CardTitle>
                    <div className="mt-3">
                      <span className="text-5xl font-extrabold">{p.price}</span>
                      <span className="text-muted-foreground text-sm">{p.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between gap-6">
                    <ul className="space-y-3">
                      {p.features.map(f => (
                        <li key={f} className="flex items-center gap-2.5 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link to={p.popular ? '/demo' : '/contact'} className="block">
                      <Button
                        className={`w-full gap-2 h-12 font-semibold transition-all duration-300 ${p.popular ? 'shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30' : ''}`}
                        variant={p.popular ? 'default' : 'outline'}
                      >
                        {p.cta} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeInUp} className="text-center text-sm text-muted-foreground mt-8 flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" /> Aceitamos Pix, cartão e boleto · Cancelamento a qualquer momento
          </motion.p>
        </div>
      </section>

      {/* ══════════ SOCIAL PROOF ══════════ */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Depoimentos</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Quem usa, recomenda</h2>
            <p className="text-muted-foreground text-lg">Milhares de barbeiros já transformaram seus negócios.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 25, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full hover:border-primary/30 transition-all duration-500 group">
                  <CardContent className="p-6">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <motion.div
                          key={s}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + s * 0.05 }}
                        >
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed italic">"{t.text}"</p>
                    <div className="border-t border-border/50 pt-4">
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

      {/* ══════════ URGENCY CTA ══════════ */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-primary/6 to-transparent" />
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              whileInView={{ scale: [0.8, 1.1, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-semibold mb-6 border border-destructive/20"
            >
              <Sparkles className="h-4 w-4" /> Oferta limitada: 14 dias grátis + migração dos seus dados
            </motion.div>

            <h2 className="text-3xl sm:text-5xl font-extrabold mb-5 leading-tight">
              Pronto para faturar mais com <span className="text-gradient">menos esforço</span>?
            </h2>
            <p className="text-muted-foreground mb-10 text-lg max-w-2xl mx-auto">
              Cada dia sem o NavalhaPro é dinheiro que você deixa na mesa. Comece agora e veja resultados na primeira semana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo">
                <Button size="lg" className="gap-2 px-10 h-14 text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 animate-pulse-glow">
                  Começar grátis agora <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="gap-2 px-10 h-14 text-lg hover:-translate-y-1 transition-all duration-300">
                  <MessageSquare className="h-5 w-5" /> Falar com especialista
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-5">
              Sem contrato · Sem cartão · Setup em 5 minutos
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
