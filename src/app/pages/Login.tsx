import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import logo from '../../imports/logo-beira-rio-icon-D1u5pVGi.png';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@beirario.com.br');
  const [password, setPassword] = useState('senha123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8">
          <img src={logo} alt="Pace Route" className="w-9 h-9 object-contain flex-shrink-0" />
          <div>
            <div className="font-semibold text-foreground leading-tight">Bem-vindo</div>
            <div className="text-[11px] text-muted-foreground leading-tight">Gestor estratégico de Rotas</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@empresa.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 bg-secondary border-0"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-secondary border-0 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-primary hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <Button type="submit" size="lg" className="w-full h-11">
            Entrar
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Pace Route desenvolvido por Pace Tech
          </p>
        </div>
      </div>
    </div>
  );
}
