import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { validarCNPJ, formatarCNPJ, formatarCEP } from "@/lib/validations";
import { TIPO_USUARIO, STATUS_ENTIDADE, PAGINACAO } from "@/lib/constants";

// ─── GET ─────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);

  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(
    PAGINACAO.LIMIT_MAXIMO,
    parseInt(searchParams.get("limit") ?? String(PAGINACAO.LIMIT_PADRAO))
  );
  const status = searchParams.get("status");
  const busca = searchParams.get("busca") ?? "";

  const isAdmin = session?.user?.tipo === TIPO_USUARIO.ADMIN;

  // Visitantes e não-admins veem apenas entidades aprovadas
  const where: Record<string, unknown> = {
    statusAprovacao: isAdmin && status ? status : STATUS_ENTIDADE.APROVADA,
    ...(busca && {
      OR: [
        { razaoSocial: { contains: busca } },
        { nomeFantasia: { contains: busca } },
        { areaAtuacao: { contains: busca } },
      ],
    }),
  };

  const [total, entidades] = await Promise.all([
    prisma.entidade.count({ where }),
    prisma.entidade.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        cnpj: true,
        razaoSocial: true,
        nomeFantasia: true,
        descricao: true,
        areaAtuacao: true,
        statusAprovacao: true,
        emailContato: true,
        telefoneContato: true,
        site: true,
        logoUrl: true,
        createdAt: true,
        dataAprovacao: true,
        motivoReprovacao: true,
        endereco: true,
        usuario: { select: { id: true, nome: true, email: true, status: true } },
      },
    }),
  ]);

  return NextResponse.json({
    data: entidades,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
}

// ─── POST ─────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      // Dados do usuario
      nome,
      email,
      senha,
      // Dados da entidade
      cnpj,
      razaoSocial,
      nomeFantasia,
      descricao,
      areaAtuacao,
      site,
      emailContato,
      telefoneContato,
      whatsapp,
      // Endereço
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
    } = body;

    // ── Validações obrigatórias
    const erros: Record<string, string> = {};
    if (!nome?.trim()) erros.nome = "Nome é obrigatório.";
    if (!email?.trim()) erros.email = "E-mail é obrigatório.";
    if (!senha || senha.length < 6) erros.senha = "Senha deve ter ao menos 6 caracteres.";
    if (!cnpj?.trim()) erros.cnpj = "CNPJ é obrigatório.";
    else if (!validarCNPJ(cnpj)) erros.cnpj = "CNPJ inválido.";
    if (!razaoSocial?.trim()) erros.razaoSocial = "Razão Social é obrigatória.";
    if (!descricao?.trim()) erros.descricao = "Descrição é obrigatória.";
    if (!logradouro?.trim()) erros.logradouro = "Logradouro é obrigatório.";
    if (!numero?.trim()) erros.numero = "Número é obrigatório.";
    if (!bairro?.trim()) erros.bairro = "Bairro é obrigatório.";
    if (!cidade?.trim()) erros.cidade = "Cidade é obrigatória.";
    if (!uf?.trim()) erros.uf = "UF é obrigatória.";
    if (!cep?.trim()) erros.cep = "CEP é obrigatório.";

    if (Object.keys(erros).length > 0) {
      return NextResponse.json({ erros }, { status: 422 });
    }

    // ── Unicidade — normaliza CNPJ antes de checar
    const cnpjFormatado = formatarCNPJ(cnpj);

    const [emailExisteNorm, cnpjExisteNorm] = await Promise.all([
      prisma.usuario.findUnique({ where: { email: email.trim().toLowerCase() } }),
      prisma.entidade.findUnique({ where: { cnpj: cnpjFormatado } }),
    ]);

    if (emailExisteNorm) erros.email = "E-mail já cadastrado.";
    if (cnpjExisteNorm) erros.cnpj = "CNPJ já cadastrado.";
    if (Object.keys(erros).length > 0) {
      return NextResponse.json({ erros }, { status: 409 });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha: senhaCriptografada,
        tipo: "ENTIDADE",
        status: "ATIVO",
        entidade: {
          create: {
            cnpj: cnpjFormatado,
            razaoSocial: razaoSocial.trim(),
            nomeFantasia: nomeFantasia?.trim() || null,
            descricao: descricao.trim(),
            areaAtuacao: areaAtuacao?.trim() || null,
            site: site?.trim() || null,
            emailContato: emailContato?.trim() || null,
            telefoneContato: telefoneContato?.trim() || null,
            whatsapp: whatsapp?.trim() || null,
            statusAprovacao: STATUS_ENTIDADE.PENDENTE,
            endereco: {
              create: {
                logradouro: logradouro.trim(),
                numero: numero.trim(),
                complemento: complemento?.trim() || null,
                bairro: bairro.trim(),
                cidade: cidade.trim(),
                uf: uf.trim().toUpperCase(),
                cep: formatarCEP(cep),
              },
            },
          },
        },
      },
      include: {
        entidade: { include: { endereco: true } },
      },
    });

    // Não retorna a senha
    const { senha: _, ...usuarioSemSenha } = usuario;

    return NextResponse.json(
      { message: "Entidade cadastrada com sucesso. Aguardando aprovação.", data: usuarioSemSenha },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/entidades]", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
