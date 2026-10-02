// GET    /api/entidades/[id]  — perfil público (RF08)
// PATCH  /api/entidades/[id]  — edição das informações (RF07)
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatarCEP } from "@/lib/validations";
import { TIPO_USUARIO, STATUS_ENTIDADE } from "@/lib/constants";

type Params = { params: { id: string } };

// ─── GET ─────────────────────────────────────────────────────────────────────

export async function GET(_req: NextRequest, { params }: Params) {
  const entidade = await prisma.entidade.findUnique({
    where: { id: params.id },
    include: {
      endereco: true,
      usuario: { select: { id: true, nome: true, email: true, dataCadastro: true } },
    },
  });

  if (!entidade) {
    return NextResponse.json({ error: "Entidade não encontrada." }, { status: 404 });
  }

  // Perfil público — só exibe entidades aprovadas para visitantes
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.tipo === TIPO_USUARIO.ADMIN;
  const isOwner = session?.user?.entidadeId === entidade.id;

  if (entidade.statusAprovacao !== STATUS_ENTIDADE.APROVADA && !isAdmin && !isOwner) {
    return NextResponse.json({ error: "Entidade não encontrada." }, { status: 404 });
  }

  return NextResponse.json({ data: entidade });
}

// ─── PATCH ────────────────────────────────────────────────────────────────────

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const entidade = await prisma.entidade.findUnique({
    where: { id: params.id },
    include: { endereco: true },
  });

  if (!entidade) {
    return NextResponse.json({ error: "Entidade não encontrada." }, { status: 404 });
  }

  const isAdmin = session.user.tipo === TIPO_USUARIO.ADMIN;
  const isOwner = session.user.entidadeId === entidade.id;

  if (!isAdmin && !isOwner) {
    return NextResponse.json({ error: "Sem permissão." }, { status: 403 });
  }

  try {
    const body = await req.json();

    const {
      razaoSocial,
      nomeFantasia,
      descricao,
      areaAtuacao,
      site,
      emailContato,
      telefoneContato,
      whatsapp,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
    } = body;

    // Validações mínimas
    const erros: Record<string, string> = {};
    if (razaoSocial !== undefined && !razaoSocial?.trim())
      erros.razaoSocial = "Razão Social não pode ser vazia.";
    if (descricao !== undefined && !descricao?.trim())
      erros.descricao = "Descrição não pode ser vazia.";

    if (Object.keys(erros).length > 0) {
      return NextResponse.json({ erros }, { status: 422 });
    }

    // Atualiza dados da entidade
    const entidadeAtualizada = await prisma.entidade.update({
      where: { id: params.id },
      data: {
        ...(razaoSocial !== undefined && { razaoSocial: razaoSocial.trim() }),
        ...(nomeFantasia !== undefined && { nomeFantasia: nomeFantasia?.trim() || null }),
        ...(descricao !== undefined && { descricao: descricao.trim() }),
        ...(areaAtuacao !== undefined && { areaAtuacao: areaAtuacao?.trim() || null }),
        ...(site !== undefined && { site: site?.trim() || null }),
        ...(emailContato !== undefined && { emailContato: emailContato?.trim() || null }),
        ...(telefoneContato !== undefined && { telefoneContato: telefoneContato?.trim() || null }),
        ...(whatsapp !== undefined && { whatsapp: whatsapp?.trim() || null }),
      },
      include: { endereco: true },
    });

    // Atualiza endereço se enviado
    if (logradouro || numero || bairro || cidade || uf || cep) {
      if (entidade.endereco) {
        await prisma.enderecoEntidade.update({
          where: { entidadeId: params.id },
          data: {
            ...(logradouro !== undefined && { logradouro: logradouro.trim() }),
            ...(numero !== undefined && { numero: numero.trim() }),
            ...(complemento !== undefined && { complemento: complemento?.trim() || null }),
            ...(bairro !== undefined && { bairro: bairro.trim() }),
            ...(cidade !== undefined && { cidade: cidade.trim() }),
            ...(uf !== undefined && { uf: uf.trim().toUpperCase() }),
            ...(cep !== undefined && { cep: formatarCEP(cep) }),
          },
        });
      } else {
        await prisma.enderecoEntidade.create({
          data: {
            entidadeId: params.id,
            logradouro: logradouro.trim(),
            numero: numero.trim(),
            complemento: complemento?.trim() || null,
            bairro: bairro.trim(),
            cidade: cidade.trim(),
            uf: uf.trim().toUpperCase(),
            cep: formatarCEP(cep),
          },
        });
      }
    }

    return NextResponse.json({
      message: "Informações atualizadas com sucesso.",
      data: entidadeAtualizada,
    });
  } catch (error) {
    console.error("[PATCH /api/entidades/[id]]", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
