import { cn } from '@/lib/utils';
import type { AppointmentStatus } from '@/types';

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  PENDENTE: { label: 'Pendente', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  CONFIRMADO: { label: 'Confirmado', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  PAGO: { label: 'Pago', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  EM_DESLOCAMENTO: { label: 'A caminho', className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  ATRASADO: { label: 'Atrasado', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
  FINALIZADO: { label: 'Finalizado', className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  CANCELADO: { label: 'Cancelado', className: 'bg-muted text-muted-foreground border-border' },
};

interface Props {
  status: AppointmentStatus;
  className?: string;
}

export function StatusBadge({ status, className }: Props) {
  const config = statusConfig[status];
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}
