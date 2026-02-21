import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { mockAutomations } from '@/mocks/data';
import { Plus, Zap } from 'lucide-react';

export default function AutomacoesPage() {
  return (
    <div>
      <PageHeader title="Automações" description="Configure regras automáticas para sua barbearia">
        <Button size="sm" className="gap-1"><Plus className="h-4 w-4" /> Nova regra</Button>
      </PageHeader>

      <div className="space-y-3">
        {mockAutomations.map(rule => (
          <Card key={rule.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 mt-0.5">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{rule.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="font-medium">SE:</span> {rule.condition}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">ENTÃO:</span> {rule.action}
                    </p>
                  </div>
                </div>
                <Switch defaultChecked={rule.active} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
