import { InboxIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({ title = 'Nenhum resultado', description = 'Não há dados para exibir.', actionLabel, onAction, icon }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        {icon || <InboxIcon className="h-8 w-8 text-muted-foreground" />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4">{actionLabel}</Button>
      )}
    </div>
  );
}
