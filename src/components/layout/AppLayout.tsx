import { useState } from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { mockTenant, mockNotifications } from '@/mocks/data';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavLink } from '@/components/NavLink';
import {
  LayoutDashboard, Calendar, Users, DollarSign, Zap, ListOrdered,
  Package, Star, UserCog, Settings, Bell, Plus, Sun, Moon, Menu,
  LogOut, User, ChevronLeft, ChevronRight, Scissors, MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: 'dashboard' },
  { label: 'Agenda', icon: Calendar, path: 'agenda' },
  { label: 'Clientes', icon: Users, path: 'clientes' },
  { label: 'Financeiro', icon: DollarSign, path: 'financeiro', roles: ['OWNER', 'MANAGER'] as const },
  { label: 'Automações', icon: Zap, path: 'automacoes' },
  { label: 'Fila', icon: ListOrdered, path: 'fila' },
  { label: 'Estoque', icon: Package, path: 'estoque' },
  { label: 'Avaliações', icon: Star, path: 'avaliacoes' },
  { label: 'Equipe', icon: UserCog, path: 'equipe', roles: ['OWNER', 'MANAGER'] as const },
  { label: 'Configurações', icon: Settings, path: 'configuracoes', roles: ['OWNER'] as const },
];

const mobileNavItems = navItems.slice(0, 4);

export default function AppLayout() {
  const { tenant } = useParams<{ tenant: string }>();
  const { user, logout, hasRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [unit, setUnit] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const basePath = `/app/${tenant}`;
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  const filteredNav = navItems.filter(item => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role as any);
  });

  const SidebarLink = ({ item }: { item: typeof navItems[0] }) => {
    const to = `${basePath}/${item.path}`;
    const isActive = location.pathname.startsWith(to);
    return (
      <NavLink
        to={to}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          isActive ? 'bg-primary/10 text-primary font-medium' : 'text-sidebar-foreground'
        )}
        activeClassName=""
      >
        <item.icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span>{item.label}</span>}
      </NavLink>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar — Desktop */}
      {!isMobile && (
        <aside className={cn(
          'flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200',
          collapsed ? 'w-16' : 'w-60'
        )}>
          <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
            <Scissors className="h-6 w-6 text-primary shrink-0" />
            {!collapsed && <span className="font-bold text-lg text-sidebar-foreground">BarberOS</span>}
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {filteredNav.map(item => <SidebarLink key={item.path} item={item} />)}
          </nav>
          <div className="p-3 border-t border-sidebar-border">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center justify-center w-full rounded-lg p-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
        </aside>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="flex items-center gap-2 h-14 px-4 border-b border-border bg-card shrink-0">
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-sidebar p-0">
                <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
                  <Scissors className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg text-sidebar-foreground">BarberOS</span>
                </div>
                <nav className="p-3 space-y-1">
                  {filteredNav.map(item => (
                    <NavLink
                      key={item.path}
                      to={`${basePath}/${item.path}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
                      activeClassName="bg-primary/10 text-primary font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas unidades</SelectItem>
              {mockTenant.units.map(u => (
                <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button size="sm" className="ml-auto gap-1.5" onClick={() => navigate(`${basePath}/agenda`)}>
            <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Novo Agendamento</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="shrink-0">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative shrink-0">
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              {mockNotifications.slice(0, 5).map(n => (
                <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2">
                  <span className="text-sm font-medium">{n.title}</span>
                  <span className="text-xs text-muted-foreground">{n.message}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                <span className="font-medium">{user?.name}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(`${basePath}/configuracoes`)}>
                <Settings className="mr-2 h-4 w-4" /> Configurações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { logout(); navigate('/login'); }}>
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>

        {/* Bottom nav — Mobile */}
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-card h-16 px-1">
            {mobileNavItems.map(item => {
              const to = `${basePath}/${item.path}`;
              const isActive = location.pathname.startsWith(to);
              return (
                <NavLink
                  key={item.path}
                  to={to}
                  className={cn(
                    'flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                  activeClassName=""
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] text-muted-foreground"
            >
              <MoreHorizontal className="h-5 w-5" />
              <span>Mais</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
