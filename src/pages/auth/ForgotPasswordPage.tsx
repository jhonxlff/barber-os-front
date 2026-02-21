import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-3">
              {sent ? <CheckCircle className="h-8 w-8 text-primary" /> : <Scissors className="h-8 w-8 text-primary" />}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{sent ? 'E-mail enviado!' : 'Recuperar senha'}</CardTitle>
          <CardDescription>{sent ? 'Verifique sua caixa de entrada.' : 'Informe seu e-mail para redefinir a senha'}</CardDescription>
        </CardHeader>
        {!sent && (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Enviando...' : 'Enviar link'}</Button>
              <Link to="/login" className="text-sm text-primary hover:underline">Voltar ao login</Link>
            </CardFooter>
          </form>
        )}
        {sent && (
          <CardFooter><Link to="/login" className="text-sm text-primary hover:underline mx-auto">Voltar ao login</Link></CardFooter>
        )}
      </Card>
    </div>
  );
}
