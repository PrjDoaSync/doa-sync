// PATCH /api/entidades/[id]/status
// Admin: aprovar, reprovar (RF09) ou desativar/reativar (RF10)
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TIPO_USUARIO, STATUS_ENTIDADE, STATUS_ENTIDADE_LISTA } from "@/lib/constants";

type Params = { params: { id: string } };

const STATUS_VALIDOS = STATUS_ENTIDADE_LISTA;

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.tipo !== TIPO_USUARIO.ADMIN) {
    return NextResponse.json({ error: "Acesso restrito a administradores." }, { status: 403 });
  }

  const entidade = await prisma.entidade.findUnique({
    where: { id: params.id },
  });

  if (!entidade) {
    return NextResponse.json({ error: "Entidade não encontrada." }, { status: 404 });
  }

  try {
    const { status, motivo } = await req.json();

    if (!status || !STATUS_VALIDOS.includes(status)) {
      return NextResponse.json(
        { error: `Status inválido. Use: ${STATUS_VALIDOS.join(", ")}` },
        { status: 422 }
      );
    }

    // Reprovação exige motivo
    if (status === STATUS_ENTIDADE.REPROVADA && !motivo?.trim()) {
      return NextResponse.json(
        { erros: { motivo: "Motivo de reprovação é obrigatório." } },
        { status: 422 }
      );
    }

    const entidadeAtualizada = await prisma.entidade.update({
      where: { id: params.id },
      data: {
        statusAprovacao: status,
        motivoReprovacao: status === STATUS_ENTIDADE.REPROVADA ? motivo.trim() : null,
        dataAprovacao: status === STATUS_ENTIDADE.APROVADA ? new Date() : entidade.dataAprovacao,
        aprovadoPorId: [STATUS_ENTIDADE.APROVADA, STATUS_ENTIDADE.REPROVADA].includes(status)
          ? session.user.id
          : entidade.aprovadoPorId,
      },
      include: {
        endereco: true,
        usuario: { select: { id: true, nome: true, email: true } },
      },
    });

    const mensagens: Record<string, string> = {
      APROVADA: "Entidade aprovada com sucesso.",
      REPROVADA: "Entidade reprovada.",
      INATIVA: "Entidade desativada.",
      PENDENTE: "Entidade recolocada como pendente.",
    };

    return NextResponse.json({
      message: mensagens[status],
      data: entidadeAtualizada,
    });
  } catch (error) {
    console.error("[PATCH /api/entidades/[id]/status]", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
