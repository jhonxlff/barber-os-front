import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg bg-primary/10 p-1.5"><Scissors className="h-5 w-5 text-primary" /></div>
              <span className="font-bold text-lg">NavalhaPro</span>
            </div>
            <p className="text-sm text-muted-foreground">O sistema completo para barbearias brasileiras crescerem com tecnologia.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Produto</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/features" className="hover:text-foreground transition-colors">Funcionalidades</Link>
              <Link to="/pricing" className="hover:text-foreground transition-colors">Preços</Link>
              <Link to="/demo" className="hover:text-foreground transition-colors">Cadastre-se Grátis</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Suporte</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/contact" className="hover:text-foreground transition-colors">Contato</Link>
              <span>Central de Ajuda</span>
              <span>WhatsApp</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>Termos de Uso</span>
              <span>Privacidade</span>
              <span>LGPD</span>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          © 2026 NavalhaPro. Feito com 💛 no Brasil.
        </div>
      </div>
    </footer>
  );
}
