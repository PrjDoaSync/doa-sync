import Link from "next/link";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import { EntidadeForm } from "@/components/entidades";

export const metadata = {
  title: "Cadastro de Entidade — DoaSync",
  description: "Cadastre sua entidade assistencial ou ONG na plataforma DoaSync.",
};

export default function CadastroEntidadePage() {
  return (
    <div className="min-h-screen bg-page">
      {/* Header simples */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-container flex items-center justify-between h-16 px-6">
          <Link href="/" className="flex items-center gap-2">
            <Heart size={22} weight="fill" className="text-brand-primary" aria-hidden="true" />
            <span className="font-bold text-slate-900">DoaSync</span>
          </Link>
          <Link href="/login" className="btn-md btn-outline">
            Já tenho conta
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Cadastro de Entidade</h1>
          <p className="mt-2 text-slate-500">
            Preencha os dados abaixo para cadastrar sua organização. Após o envio, o
            cadastro será analisado pelos administradores da plataforma.
          </p>
        </div>

        <EntidadeForm modo="cadastro" />
      </div>
    </div>
  );
}
