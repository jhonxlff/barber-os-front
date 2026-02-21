import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockReviews, mockBarbers } from '@/mocks/data';
import { Star } from 'lucide-react';

export default function AvaliacoesPage() {
  const avgRating = (mockReviews.reduce((s, r) => s + r.rating, 0) / mockReviews.length).toFixed(1);

  const barberRatings = mockBarbers.map(b => {
    const reviews = mockReviews.filter(r => r.barberId === b.id);
    const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '—';
    return { ...b, avg, count: reviews.length };
  }).sort((a, b) => parseFloat(b.avg) - parseFloat(a.avg));

  return (
    <div>
      <PageHeader title="Avaliações" description="Veja o feedback dos seus clientes" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-4xl font-bold">{avgRating}</p>
            <div className="flex justify-center gap-0.5 my-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`h-5 w-5 ${i <= Math.round(Number(avgRating)) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{mockReviews.length} avaliações</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Ranking por barbeiro</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {barberRatings.map((b, i) => (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-muted-foreground w-6">#{i + 1}</span>
                  <span className="text-sm font-medium">{b.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-bold">{b.avg}</span>
                  <span className="text-xs text-muted-foreground">({b.count})</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Últimas avaliações</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mockReviews.map(r => (
            <div key={r.id} className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{r.clientName}</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i <= r.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-foreground">{r.comment}</p>
              <p className="text-xs text-muted-foreground mt-1">{r.barberName} • {r.date}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
