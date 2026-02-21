import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/app/barbearia-do-joao/dashboard');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-3"><Scissors className="h-8 w-8 text-primary" /></div>
          </div>
          <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
          <CardDescription>Cadastre sua barbearia no BarberOS</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label htmlFor="name">Nome completo</Label><Input id="name" value={name} onChange={e => setName(e.target.value)} required /></div>
            <div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
            <div className="space-y-2"><Label htmlFor="password">Senha</Label><Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Criando...' : 'Criar conta'}</Button>
            <Link to="/login" className="text-sm text-primary hover:underline">Já tem conta? Entrar</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
