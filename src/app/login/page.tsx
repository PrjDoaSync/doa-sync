"use client";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, Eye, EyeSlash, WarningCircle } from "@phosphor-icons/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const resultado = await signIn("credentials", {
      email,
      senha,
      redirect: false,
    });

    setCarregando(false);

    if (resultado?.error) {
      setErro("E-mail ou senha incorretos. Verifique suas credenciais.");
      return;
    }

    // Redireciona conforme o tipo de usuário (via session)
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary mb-3">
            <Heart size={24} weight="fill" className="text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">DoaSync</h1>
          <p className="text-sm text-slate-500 mt-1">Entre na sua conta</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} noValidate>
            {/* Erro geral */}
            {erro && (
              <div
                role="alert"
                className="mb-4 flex items-start gap-2 rounded-md border-l-4 border-red-500 bg-feedback-error-bg p-3 text-sm text-feedback-error-text"
              >
                <WarningCircle size={16} weight="fill" className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>{erro}</span>
              </div>
            )}

            {/* E-mail */}
            <div className="mb-4">
              <label htmlFor="email" className="label">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="seu@email.com"
                aria-required="true"
              />
            </div>

            {/* Senha */}
            <div className="mb-6">
              <label htmlFor="senha" className="label">
                Senha
              </label>
              <div className="relative">
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenha ? (
                    <EyeSlash size={18} aria-hidden="true" />
                  ) : (
                    <Eye size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="btn-lg btn-primary w-full"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Quer cadastrar sua entidade?{" "}
          <Link href="/entidades/cadastro" className="text-brand-primary font-medium hover:underline">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
