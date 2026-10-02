// Detalhe da entidade no painel admin
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AppLayout } from "@/components/layout";
import { StatusBadge } from "@/components/ui";
import { AdminEntidadeActions } from "@/components/entidades";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Envelope,
  Globe,
  WhatsappLogo,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";

interface Props {
  params: { id: string };
}

export default async function AdminEntidadeDetalhePage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.tipo !== "ADMIN") redirect("/login");

  const entidade = await prisma.entidade.findUnique({
    where: { id: params.id },
    include: {
      endereco: true,
      usuario: { select: { id: true, nome: true, email: true, dataCadastro: true, status: true } },
    },
  });

  if (!entidade) notFound();

  const nome = entidade.nomeFantasia ?? entidade.razaoSocial;

  return (
    <AppLayout>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2">
        <Link href="/admin/entidades" className="btn-sm btn-ghost text-slate-500">
          <ArrowLeft size={16} aria-hidden="true" />
          Entidades
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm text-slate-700 font-medium">{nome}</span>
      </div>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-slate-900">{nome}</h1>
            <StatusBadge status={entidade.statusAprovacao} />
          </div>
          {entidade.nomeFantasia && (
            <p className="text-slate-500">{entidade.razaoSocial}</p>
          )}
        </div>
        <AdminEntidadeActions entidade={entidade} />
      </div>

      {/* Motivo de reprovação */}
      {entidade.statusAprovacao === "REPROVADA" && entidade.motivoReprovacao && (
        <div className="mb-6 rounded-md border-l-4 border-red-500 bg-feedback-error-bg p-4 text-sm text-feedback-error-text">
          <p className="font-medium mb-1">Motivo da reprovação:</p>
          <p>{entidade.motivoReprovacao}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <Buildings size={24} className="text-brand-primary" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-slate-900">Dados Institucionais</h2>
            </div>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-slate-500">CNPJ</dt>
                <dd className="font-medium text-slate-900 font-mono">{entidade.cnpj}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Área de Atuação</dt>
                <dd className="font-medium text-slate-900">{entidade.areaAtuacao ?? "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-slate-500">Descrição</dt>
                <dd className="mt-1 text-slate-900 leading-relaxed whitespace-pre-wrap">
                  {entidade.descricao ?? "—"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Endereço */}
          {entidade.endereco && (
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={24} className="text-brand-primary" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-slate-900">Endereço</h2>
              </div>
              <address className="text-sm text-slate-600 not-italic leading-relaxed">
                {entidade.endereco.logradouro}, {entidade.endereco.numero}
                {entidade.endereco.complemento && ` — ${entidade.endereco.complemento}`}
                <br />
                {entidade.endereco.bairro} · {entidade.endereco.cidade}/{entidade.endereco.uf}
                <br />
                CEP {entidade.endereco.cep}
              </address>
            </div>
          )}
        </div>

        {/* Coluna lateral */}
        <div className="space-y-6">
          {/* Contato */}
          <div className="card">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Contato</h2>
            <ul className="space-y-3 text-sm text-slate-600">
              {entidade.emailContato && (
                <li className="flex items-center gap-2">
                  <Envelope size={16} className="text-slate-400 shrink-0" aria-hidden="true" />
                  <a href={`mailto:${entidade.emailContato}`} className="hover:text-brand-primary break-all">
                    {entidade.emailContato}
                  </a>
                </li>
              )}
              {entidade.telefoneContato && (
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-slate-400 shrink-0" aria-hidden="true" />
                  {entidade.telefoneContato}
                </li>
              )}
              {entidade.whatsapp && (
                <li className="flex items-center gap-2">
                  <WhatsappLogo size={16} className="text-slate-400 shrink-0" aria-hidden="true" />
                  {entidade.whatsapp}
                </li>
              )}
              {entidade.site && (
                <li className="flex items-center gap-2">
                  <Globe size={16} className="text-slate-400 shrink-0" aria-hidden="true" />
                  <a href={entidade.site} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary break-all">
                    {entidade.site}
                  </a>
                </li>
              )}
              {!entidade.emailContato && !entidade.telefoneContato && !entidade.site && (
                <li className="text-slate-400">Nenhum dado de contato informado.</li>
              )}
            </ul>
          </div>

          {/* Conta */}
          <div className="card">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Conta</h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-slate-500">Responsável</dt>
                <dd className="font-medium text-slate-900">{entidade.usuario.nome}</dd>
              </div>
              <div>
                <dt className="text-slate-500">E-mail</dt>
                <dd className="text-slate-700">{entidade.usuario.email}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Cadastro</dt>
                <dd className="text-slate-700">
                  {new Date(entidade.usuario.dataCadastro).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
              </div>
              {entidade.dataAprovacao && (
                <div>
                  <dt className="text-slate-500">Aprovação</dt>
                  <dd className="text-slate-700">
                    {new Date(entidade.dataAprovacao).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
