import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockTenant, mockServices } from '@/mocks/data';
import { Save } from 'lucide-react';

export default function ConfiguracoesPage() {
  return (
    <div>
      <PageHeader title="Configurações" description="Configure sua barbearia" />

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="hours">Horários</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Dados da Barbearia</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nome</Label><Input defaultValue={mockTenant.name} /></div>
                <div className="space-y-2"><Label>Slug</Label><Input defaultValue={mockTenant.slug} disabled /></div>
                <div className="space-y-2"><Label>Endereço</Label><Input defaultValue="Rua das Flores, 123 - Centro" /></div>
                <div className="space-y-2"><Label>Telefone</Label><Input defaultValue="(11) 99999-0001" /></div>
              </div>
              <Button className="gap-1"><Save className="h-4 w-4" /> Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="mt-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Horários de Funcionamento</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day, i) => (
                <div key={day} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium w-24">{day}</span>
                  <div className="flex items-center gap-2">
                    <Input type="time" defaultValue={i < 5 ? '09:00' : i === 5 ? '09:00' : ''} className="w-28 h-8 text-xs" disabled={i === 6} />
                    <span className="text-muted-foreground">—</span>
                    <Input type="time" defaultValue={i < 5 ? '19:00' : i === 5 ? '14:00' : ''} className="w-28 h-8 text-xs" disabled={i === 6} />
                    <Switch defaultChecked={i < 6} />
                  </div>
                </div>
              ))}
              <Button className="gap-1"><Save className="h-4 w-4" /> Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Serviços e Preços</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {mockServices.map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.duration} min</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">R$ {s.price}</span>
                    <Switch defaultChecked={s.active} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Integrações</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Pagamento Pix', desc: 'Receba pagamentos via Pix automaticamente', connected: false },
                { name: 'WhatsApp', desc: 'Envie mensagens automáticas pelo WhatsApp', connected: true },
                { name: 'E-mail', desc: 'Notificações por e-mail para clientes', connected: false },
                { name: 'Push Notifications', desc: 'Notificações push no celular', connected: false },
              ].map(integration => (
                <div key={integration.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">{integration.desc}</p>
                  </div>
                  <Button variant={integration.connected ? 'outline' : 'default'} size="sm">
                    {integration.connected ? 'Configurar' : 'Conectar'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
