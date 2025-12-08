'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-mr-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-mr-accent mb-4">
            <span className="text-mr-bg font-bold text-3xl">M</span>
          </div>
          <h1 className="text-3xl font-bold text-mr-accent tracking-wider">
            MecaRapidOne
          </h1>
          <p className="text-mr-text/60 uppercase tracking-widest text-sm mt-2">
            Sistema de Gestión de Taller
          </p>
        </div>

        {/* Login Form */}
        <div className="card-industrial">
          <h2 className="text-xl font-bold uppercase tracking-wider text-mr-text mb-6 text-center">
            Iniciar Sesión
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="usuario@mecarapid.com"
                className="input-industrial w-full"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-mr-text/60 uppercase tracking-wide mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="input-industrial w-full"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-accent w-full py-3 mt-6 disabled:opacity-50"
            >
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-mr-text/30 text-sm mt-8">
          MecaRapidOne v0.1.0 — Sistema de Gestión Industrial
        </p>
      </div>
    </div>
  );
}
