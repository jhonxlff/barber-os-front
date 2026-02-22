import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import { Scissors, Calendar, ListOrdered, MapPin, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Agendar', icon: Calendar, path: 'agendar' },
  { label: 'Meus', icon: ClipboardList, path: 'meus-agendamentos' },
  { label: 'Fila', icon: ListOrdered, path: 'fila' },
];

export default function ClientLayout() {
  const { tenant } = useParams();
  const location = useLocation();
  const basePath = `/c/${tenant}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center gap-2 h-14 px-4 border-b border-border bg-card">
        <Link to={basePath} className="flex items-center gap-2">
          <Scissors className="h-5 w-5 text-primary" />
          <span className="font-bold">NavalhaPro</span>
        </Link>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-card h-16">
        {navItems.map(item => {
          const to = `${basePath}/${item.path}`;
          const isActive = location.pathname.startsWith(to);
          return (
            <Link
              key={item.path}
              to={to}
              className={cn(
                'flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[11px] transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
