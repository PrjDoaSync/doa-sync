// RF09 / RF10 — Painel admin de gestão de entidades
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AppLayout } from "@/components/layout";
import { StatusBadge } from "@/components/ui";
import { AdminEntidadeActions } from "@/components/entidades";
import Link from "next/link";
import { MagnifyingGlass, Buildings } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Gestão de Entidades — DoaSync Admin" };

interface Props {
  searchParams: { status?: string; busca?: string; page?: string };
}

const STATUS_TABS = [
  { label: "Todas", value: "" },
  { label: "Pendentes", value: "PENDENTE" },
  { label: "Aprovadas", value: "APROVADA" },
  { label: "Reprovadas", value: "REPROVADA" },
  { label: "Inativas", value: "INATIVA" },
];

export default async function AdminEntidadesPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.tipo !== "ADMIN") redirect("/login");

  const filtroStatus = searchParams.status ?? "";
  const busca = searchParams.busca ?? "";
  const page = Math.max(1, parseInt(searchParams.page ?? "1"));
  const limit = 10;

  const where: Record<string, unknown> = {
    ...(filtroStatus && { statusAprovacao: filtroStatus }),
    ...(busca && {
      OR: [
        { razaoSocial: { contains: busca } },
        { nomeFantasia: { contains: busca } },
        { cnpj: { contains: busca } },
      ],
    }),
  };

  const [total, entidades] = await Promise.all([
    prisma.entidade.count({ where }),
    prisma.entidade.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [{ statusAprovacao: "asc" }, { createdAt: "desc" }],
      include: {
        endereco: true,
        usuario: { select: { id: true, nome: true, email: true, status: true } },
      },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  // Contadores por status para o header
  const contadores = await prisma.entidade.groupBy({
    by: ["statusAprovacao"],
    _count: true,
  });
  const totalPendente = contadores.find((c) => c.statusAprovacao === "PENDENTE")?._count ?? 0;

  return (
    <AppLayout>
      {/* Cabeçalho */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Entidades Assistenciais</h1>
          <p className="text-slate-500 mt-1">
            Gerencie o cadastro e o status das organizações na plataforma.
          </p>
        </div>
        {totalPendente > 0 && (
          <Link
            href="/admin/entidades?status=PENDENTE"
            className="btn-md btn-primary"
          >
            {totalPendente} pendente{totalPendente > 1 ? "s" : ""}
          </Link>
        )}
      </div>

      {/* Filtros por status */}
      <div className="mb-4 flex gap-1 border-b border-slate-200">
        {STATUS_TABS.map((tab) => {
          const ativo = filtroStatus === tab.value;
          const count = tab.value
            ? (contadores.find((c) => c.statusAprovacao === tab.value)?._count ?? 0)
            : total;
          return (
            <Link
              key={tab.value}
              href={`/admin/entidades?status=${tab.value}${busca ? `&busca=${busca}` : ""}`}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                ativo
                  ? "border-brand-primary text-brand-primary"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
              aria-current={ativo ? "page" : undefined}
            >
              {tab.label}
              <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Busca */}
      <form method="GET" action="/admin/entidades" className="mb-6">
        {filtroStatus && <input type="hidden" name="status" value={filtroStatus} />}
        <div className="relative max-w-md">
          <MagnifyingGlass
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            name="busca"
            defaultValue={busca}
            placeholder="Buscar por nome ou CNPJ..."
            className="input pl-9"
            aria-label="Buscar entidades"
          />
        </div>
      </form>

      {/* Tabela */}
      {entidades.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 text-center">
          <Buildings size={48} className="text-slate-300 mb-4" aria-hidden="true" />
          <p className="text-slate-500 font-medium">Nenhuma entidade encontrada.</p>
          {busca && <p className="text-sm text-slate-400 mt-1">Tente outro termo de busca.</p>}
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Lista de entidades">
              <thead>
                <tr className="bg-page border-b border-slate-200">
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Entidade
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
                    CNPJ
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Área
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Cadastro
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {entidades.map((entidade) => (
                  <tr key={entidade.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-medium text-slate-900">
                        {entidade.nomeFantasia ?? entidade.razaoSocial}
                      </div>
                      {entidade.nomeFantasia && (
                        <div className="text-xs text-slate-400">{entidade.razaoSocial}</div>
                      )}
                      <div className="text-xs text-slate-400">{entidade.usuario.email}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-600 font-mono text-xs">
                      {entidade.cnpj}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {entidade.areaAtuacao ?? <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={entidade.statusAprovacao} />
                    </td>
                    <td className="px-4 py-4 text-slate-500">
                      {new Date(entidade.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <AdminEntidadeActions entidade={entidade} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
              <p className="text-sm text-slate-500">
                Mostrando {(page - 1) * limit + 1}–{Math.min(page * limit, total)} de {total}
              </p>
              <div className="flex gap-1">
                {page > 1 && (
                  <Link
                    href={`/admin/entidades?status=${filtroStatus}&busca=${busca}&page=${page - 1}`}
                    className="btn-sm btn-outline"
                  >
                    Anterior
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`/admin/entidades?status=${filtroStatus}&busca=${busca}&page=${page + 1}`}
                    className="btn-sm btn-primary"
                  >
                    Próxima
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}
