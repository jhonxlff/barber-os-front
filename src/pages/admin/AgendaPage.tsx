import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAppointments, mockBarbers, mockServices, mockClients } from '@/mocks/data';
import { Plus, Clock, Ban, Check, MapPin, Bell, CreditCard } from 'lucide-react';
import type { Appointment } from '@/types';
import { PageTransition, FadeInUp } from '@/components/shared/MotionWrapper';

export default function AgendaPage() {
  const [view, setView] = useState('day');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const todayAppointments = mockAppointments.filter(a => a.date === '2026-02-21');

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return (
    <PageTransition>
      <PageHeader title="Agenda" description="Gerencie os agendamentos">
        <Button onClick={() => setShowNewModal(true)} className="gap-1.5">
          <Plus className="h-4 w-4" /> Novo Agendamento
        </Button>
      </PageHeader>

      <FadeInUp delay={0.1}>
        <Tabs value={view} onValueChange={setView}>
          <TabsList>
            <TabsTrigger value="day">Dia</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="list">Lista</TabsTrigger>
          </TabsList>

          <TabsContent value="day" className="mt-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base">Hoje — 21 de Fevereiro</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {timeSlots.map(slot => {
                    const appointments = todayAppointments.filter(a => a.time === slot || (a.time > slot && a.time < timeSlots[timeSlots.indexOf(slot) + 1]));
                    return (
                      <div key={slot} className="flex gap-3 py-2 border-b border-border/50 last:border-0">
                        <span className="text-xs text-muted-foreground w-12 shrink-0 pt-1">{slot}</span>
                        <div className="flex-1 space-y-1">
                          {appointments.length > 0 ? appointments.map(a => (
                            <button
                              key={a.id}
                              onClick={() => setSelectedAppointment(a)}
                              className="w-full text-left p-2.5 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium">{a.clientName}</p>
                                  <p className="text-xs text-muted-foreground">{a.serviceName} • {a.barberName} • {a.duration}min</p>
                                </div>
                                <StatusBadge status={a.status} />
                              </div>
                            </button>
                          )) : (
                            <div className="h-8 rounded-lg border border-dashed border-border/50 flex items-center justify-center">
                              <span className="text-[10px] text-muted-foreground">Disponível</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-7 gap-2">
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, i) => (
                    <div key={day} className="text-center">
                      <p className="text-xs font-medium text-muted-foreground mb-2">{day}</p>
                      <p className="text-sm font-bold mb-2">{17 + i}</p>
                      <div className="space-y-1">
                        {mockAppointments.filter((_, idx) => idx % 7 === i).slice(0, 2).map(a => (
                          <div key={a.id} className="text-[10px] p-1 rounded bg-primary/10 text-primary truncate">
                            {a.time} {a.clientName.split(' ')[0]}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {mockAppointments.map(a => (
                    <button
                      key={a.id}
                      onClick={() => setSelectedAppointment(a)}
                      className="w-full text-left flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium">{a.clientName}</p>
                        <p className="text-xs text-muted-foreground">{a.date} às {a.time} • {a.serviceName} • {a.barberName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={a.status} />
                        <span className="text-sm font-semibold">{a.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </FadeInUp>

      {/* Appointment Detail Dialog */}
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Agendamento</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Cliente:</span> <span className="font-medium">{selectedAppointment.clientName}</span></div>
                <div><span className="text-muted-foreground">Telefone:</span> <span className="font-medium">{selectedAppointment.clientPhone}</span></div>
                <div><span className="text-muted-foreground">Serviço:</span> <span className="font-medium">{selectedAppointment.serviceName}</span></div>
                <div><span className="text-muted-foreground">Barbeiro:</span> <span className="font-medium">{selectedAppointment.barberName}</span></div>
                <div><span className="text-muted-foreground">Data/Hora:</span> <span className="font-medium">{selectedAppointment.date} às {selectedAppointment.time}</span></div>
                <div><span className="text-muted-foreground">Valor:</span> <span className="font-medium">{selectedAppointment.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <StatusBadge status={selectedAppointment.status} />
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                <Button size="sm" variant="outline" className="gap-1"><Bell className="h-3.5 w-3.5" /> Enviar lembrete</Button>
                <Button size="sm" variant="outline" className="gap-1"><CreditCard className="h-3.5 w-3.5" /> Cobrar sinal Pix</Button>
                <Button size="sm" variant="outline" className="gap-1"><MapPin className="h-3.5 w-3.5" /> Abrir mapa</Button>
                <Button size="sm" variant="outline" className="gap-1"><Check className="h-3.5 w-3.5" /> Compareceu</Button>
                <Button size="sm" variant="outline" className="gap-1"><Clock className="h-3.5 w-3.5" /> Reagendar</Button>
                <Button size="sm" variant="destructive" className="gap-1"><Ban className="h-3.5 w-3.5" /> Cancelar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Appointment Dialog */}
      <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
        <DialogContent>
          <DialogHeader><DialogTitle>Novo Agendamento</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Select><SelectTrigger><SelectValue placeholder="Selecione o cliente" /></SelectTrigger>
                <SelectContent>{mockClients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Serviço</Label>
              <Select><SelectTrigger><SelectValue placeholder="Selecione o serviço" /></SelectTrigger>
                <SelectContent>{mockServices.map(s => <SelectItem key={s.id} value={s.id}>{s.name} — R$ {s.price}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Barbeiro</Label>
              <Select><SelectTrigger><SelectValue placeholder="Selecione o barbeiro" /></SelectTrigger>
                <SelectContent>{mockBarbers.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>Data</Label><Input type="date" defaultValue="2026-02-21" /></div>
              <div className="space-y-2"><Label>Horário</Label><Input type="time" defaultValue="10:00" /></div>
            </div>
            <Button className="w-full" onClick={() => setShowNewModal(false)}>Criar Agendamento</Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
