import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Básico',
    price: 'R$ 79',
    period: '/mês',
    desc: 'Para barbearias com 1 profissional',
    features: [
      'Agenda online', 'CRM de clientes', 'Fila digital', 'Relatórios básicos',
      '1 profissional', '1 unidade', 'Suporte por e-mail',
    ],
    cta: 'Começar grátis',
    popular: false,
  },
  {
    name: 'Profissional',
    price: 'R$ 149',
    period: '/mês',
    desc: 'Para barbearias em crescimento',
    features: [
      'Tudo do Básico', 'Até 5 profissionais', 'Automações ilimitadas', 'Financeiro completo',
      'Comissões por barbeiro', 'Estoque', 'Avaliações', 'Suporte prioritário WhatsApp',
    ],
    cta: 'Testar 14 dias grátis',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'R$ 299',
    period: '/mês',
    desc: 'Para redes e múltiplas unidades',
    features: [
      'Tudo do Profissional', 'Profissionais ilimitados', 'Multi-unidades', 'API personalizada',
      'Relatórios avançados', 'Tracking em tempo real', 'Gerente de conta dedicado', 'SLA garantido',
    ],
    cta: 'Falar com vendas',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div>
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Planos que cabem no seu bolso</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Comece grátis por 14 dias. Sem cartão de crédito. Cancele quando quiser.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className={`h-full relative ${p.popular ? 'border-primary shadow-lg shadow-primary/10' : ''}`}>
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Mais popular
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-lg">{p.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-4xl font-bold">{p.price}</span>
                      <span className="text-muted-foreground">{p.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2.5">
                      {p.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link to={p.popular ? '/demo' : '/contact'}>
                      <Button className="w-full gap-2" variant={p.popular ? 'default' : 'outline'}>
                        {p.cta} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-center mb-8">Perguntas frequentes</h2>
            <div className="space-y-4">
              {[
                { q: 'Posso testar antes de pagar?', a: 'Sim! Todos os planos têm 14 dias grátis, sem precisar de cartão de crédito.' },
                { q: 'Consigo migrar de plano depois?', a: 'Sim, você pode fazer upgrade ou downgrade a qualquer momento.' },
                { q: 'Aceita Pix?', a: 'Sim! Aceitamos Pix, cartão de crédito e boleto bancário.' },
                { q: 'Preciso de contrato?', a: 'Não. Nossos planos são mensais e você pode cancelar quando quiser.' },
              ].map(faq => (
                <Card key={faq.q}>
                  <CardContent className="p-4">
                    <p className="font-semibold text-sm mb-1">{faq.q}</p>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
