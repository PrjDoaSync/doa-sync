// RF08 — Página pública de perfil da entidade
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Envelope,
  Globe,
  WhatsappLogo,
  Heart,
  Buildings,
  CalendarCheck,
} from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const entidade = await prisma.entidade.findUnique({
    where: { id: params.id },
    select: { razaoSocial: true, nomeFantasia: true, descricao: true },
  });
  if (!entidade) return { title: "Entidade não encontrada — DoaSync" };
  return {
    title: `${entidade.nomeFantasia ?? entidade.razaoSocial} — DoaSync`,
    description: entidade.descricao ?? undefined,
  };
}

export default async function PerfilPublicoEntidadePage({ params }: Props) {
  const entidade = await prisma.entidade.findUnique({
    where: { id: params.id },
    include: {
      endereco: true,
      usuario: { select: { dataCadastro: true } },
    },
  });

  if (!entidade || entidade.statusAprovacao !== "APROVADA") {
    notFound();
  }

  const nome = entidade.nomeFantasia ?? entidade.razaoSocial;
  const endereco = entidade.endereco;

  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-container flex items-center h-16 px-6 gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Heart size={22} weight="fill" className="text-brand-primary" aria-hidden="true" />
            <span className="font-bold text-slate-900">DoaSync</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-container px-6 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card: Identidade */}
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                  <Buildings size={32} className="text-brand-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-slate-900 leading-tight">{nome}</h1>
                  {entidade.nomeFantasia && (
                    <p className="text-sm text-slate-500 mt-0.5">{entidade.razaoSocial}</p>
                  )}
                  {entidade.areaAtuacao && (
                    <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-0.5 text-xs font-medium text-blue-700">
                      {entidade.areaAtuacao}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card: Sobre */}
            {entidade.descricao && (
              <div className="card">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Sobre a Organização</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {entidade.descricao}
                </p>
              </div>
            )}
          </div>

          {/* Coluna lateral */}
          <div className="space-y-6">
            {/* Card: Contato */}
            <div className="card">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Contato</h2>
              <ul className="space-y-3 text-sm text-slate-600">
                {entidade.emailContato && (
                  <li className="flex items-center gap-2">
                    <Envelope size={16} className="text-slate-400 shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${entidade.emailContato}`}
                      className="hover:text-brand-primary break-all"
                    >
                      {entidade.emailContato}
                    </a>
                  </li>
                )}
                {entidade.telefoneContato && (
                  <li className="flex items-center gap-2">
                    <Phone size={16} className="text-slate-400 shrink-0" aria-hidden="true" />
                    <span>{entidade.telefoneContato}</span>
                  </li>
                )}
                {entidade.whatsapp && (
                  <li className="flex items-center gap-2">
                    <WhatsappLogo size={16} className="text-slate-400 shrink-0" aria-hidden="true" />
                    <a
                      href={`https://wa.me/55${entidade.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-primary"
                    >
                      {entidade.whatsapp}
                    </a>
                  </li>
                )}
                {entidade.site && (
                  <li className="flex items-center gap-2">
                    <Globe size={16} className="text-slate-400 shrink-0" aria-hidden="true" />
                    <a
                      href={entidade.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-primary break-all"
                    >
                      {entidade.site.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Card: Endereço */}
            {endereco && (
              <div className="card">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Endereço</h2>
                <div className="flex items-start gap-2 text-sm text-slate-600">
                  <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <address className="not-italic leading-relaxed">
                    {endereco.logradouro}, {endereco.numero}
                    {endereco.complemento && ` — ${endereco.complemento}`}
                    <br />
                    {endereco.bairro} · {endereco.cidade}/{endereco.uf}
                    <br />
                    CEP {endereco.cep}
                  </address>
                </div>
              </div>
            )}

            {/* Card: Info */}
            <div className="card">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Informações</h2>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CalendarCheck size={16} className="text-slate-400 shrink-0" aria-hidden="true" />
                  <span>
                    Na plataforma desde{" "}
                    {new Date(entidade.usuario.dataCadastro).toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </li>
                <li className="text-xs text-slate-400 mt-1">
                  CNPJ: {entidade.cnpj}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
