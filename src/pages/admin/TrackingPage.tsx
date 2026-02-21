import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Navigation } from 'lucide-react';

export default function TrackingPage() {
  const { appointmentId } = useParams();

  // TODO: Conectar via WebSocket — socket.on('tracking:location', ...)
  return (
    <div>
      <PageHeader title="Tracking" description="Acompanhe o deslocamento do cliente" />

      <Card>
        <CardContent className="p-6">
          <div className="aspect-video rounded-lg bg-muted flex items-center justify-center mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
            <div className="relative text-center space-y-2">
              <MapPin className="h-12 w-12 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Mapa em tempo real (conectar ao backend)</p>
              <p className="text-xs text-muted-foreground">Agendamento: {appointmentId}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold">10 min</p>
                <p className="text-xs text-muted-foreground">Tempo estimado</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Navigation className="h-6 w-6 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold">2.5 km</p>
                <p className="text-xs text-muted-foreground">Distância</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MapPin className="h-6 w-6 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-primary">A caminho</p>
                <p className="text-xs text-muted-foreground">Status</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
