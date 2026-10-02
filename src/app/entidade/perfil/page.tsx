// Área privada da entidade — ver e editar seu próprio perfil (RF07)
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AppLayout } from "@/components/layout";
import { EntidadeForm } from "@/components/entidades";
import { StatusBadge } from "@/components/ui";
import Link from "next/link";
import { ArrowSquareOut, WarningCircle } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Meu Perfil — DoaSync" };

export default async function PerfilEntidadePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.tipo !== "ENTIDADE") redirect("/");

  const entidade = await prisma.entidade.findUnique({
    where: { id: session.user.entidadeId! },
    include: {
      endereco: true,
      usuario: { select: { nome: true, email: true } },
    },
  });

  if (!entidade) redirect("/login");

  const dadosIniciais = {
    nome: entidade.usuario.nome,
    email: entidade.usuario.email,
    cnpj: entidade.cnpj,
    razaoSocial: entidade.razaoSocial,
    nomeFantasia: entidade.nomeFantasia ?? "",
    descricao: entidade.descricao ?? "",
    areaAtuacao: entidade.areaAtuacao ?? "",
    site: entidade.site ?? "",
    emailContato: entidade.emailContato ?? "",
    telefoneContato: entidade.telefoneContato ?? "",
    whatsapp: entidade.whatsapp ?? "",
    endereco: {
      cep: entidade.endereco?.cep ?? "",
      logradouro: entidade.endereco?.logradouro ?? "",
      numero: entidade.endereco?.numero ?? "",
      complemento: entidade.endereco?.complemento ?? "",
      bairro: entidade.endereco?.bairro ?? "",
      cidade: entidade.endereco?.cidade ?? "",
      uf: entidade.endereco?.uf ?? "",
    },
  };

  return (
    <AppLayout>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Meu Perfil</h1>
          <div className="mt-2 flex items-center gap-3">
            <p className="text-slate-500">Gerencie as informações da sua organização.</p>
            <StatusBadge status={entidade.statusAprovacao} />
          </div>
        </div>
        {entidade.statusAprovacao === "APROVADA" && (
          <Link
            href={`/entidades/${entidade.id}`}
            target="_blank"
            className="btn-md btn-outline shrink-0"
          >
            <ArrowSquareOut size={18} aria-hidden="true" />
            Ver perfil público
          </Link>
        )}
      </div>

      {/* Avisos de status */}
      {entidade.statusAprovacao === "PENDENTE" && (
        <div role="status" className="mb-6 flex items-start gap-2 rounded-md border-l-4 border-yellow-400 bg-feedback-warning-bg p-4 text-sm text-feedback-warning-text">
          <WarningCircle size={16} weight="fill" className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            Seu cadastro está <strong>aguardando aprovação</strong> pelos administradores da plataforma. Você pode editar as informações enquanto aguarda.
          </span>
        </div>
      )}
      {entidade.statusAprovacao === "REPROVADA" && (
        <div role="alert" className="mb-6 flex items-start gap-2 rounded-md border-l-4 border-red-500 bg-feedback-error-bg p-4 text-sm text-feedback-error-text">
          <WarningCircle size={16} weight="fill" className="mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-medium">Cadastro reprovado.</p>
            {entidade.motivoReprovacao && (
              <p className="mt-1">Motivo: {entidade.motivoReprovacao}</p>
            )}
            <p className="mt-1">Corrija as informações abaixo e aguarde nova análise.</p>
          </div>
        </div>
      )}
      {entidade.statusAprovacao === "INATIVA" && (
        <div role="alert" className="mb-6 flex items-start gap-2 rounded-md border-l-4 border-slate-400 bg-slate-100 p-4 text-sm text-slate-700">
          <WarningCircle size={16} weight="fill" className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>Esta entidade está <strong>desativada</strong>. Entre em contato com a administração para reativação.</span>
        </div>
      )}

      <EntidadeForm
        modo="edicao"
        entidadeId={entidade.id}
        dadosIniciais={dadosIniciais}
      />
    </AppLayout>
  );
}
