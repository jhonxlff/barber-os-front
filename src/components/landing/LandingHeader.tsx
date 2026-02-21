import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Scissors, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Funcionalidades', href: '/features' },
  { label: 'Preços', href: '/pricing' },
  { label: 'Contato', href: '/contact' },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="rounded-lg bg-primary/10 p-1.5 group-hover:bg-primary/20 transition-colors">
            <Scissors className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold text-xl">BarberOS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.href} to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
          <Link to="/demo">
            <Button size="sm">Agendar Demo</Button>
          </Link>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map(link => (
                <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
              <hr className="border-border" />
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">Entrar</Button>
              </Link>
              <Link to="/demo" onClick={() => setOpen(false)}>
                <Button className="w-full">Agendar Demo</Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
