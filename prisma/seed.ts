// Seed: cria admin padrão + entidades de exemplo
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Admin padrão
  const senhaAdmin = await bcrypt.hash("admin123", 10);
  const admin = await prisma.usuario.upsert({
    where: { email: "admin@doasync.com" },
    update: {},
    create: {
      nome: "Administrador DoaSync",
      email: "admin@doasync.com",
      senha: senhaAdmin,
      tipo: "ADMIN",
      status: "ATIVO",
    },
  });
  console.log("✅ Admin criado:", admin.email);

  // 2. Entidade aprovada de exemplo
  const senhaEntidade1 = await bcrypt.hash("entidade123", 10);
  const usuario1 = await prisma.usuario.upsert({
    where: { email: "contato@amorinclusivosp.org" },
    update: {},
    create: {
      nome: "Amor Inclusivo SP",
      email: "contato@amorinclusivosp.org",
      senha: senhaEntidade1,
      tipo: "ENTIDADE",
      status: "ATIVO",
      entidade: {
        create: {
          cnpj: "12.345.678/0001-90",
          razaoSocial: "Associação Amor Inclusivo de São Paulo",
          nomeFantasia: "Amor Inclusivo SP",
          descricao:
            "Organização dedicada ao acolhimento e inclusão de pessoas em situação de vulnerabilidade social, com foco em crianças e adolescentes.",
          areaAtuacao: "Assistência Social",
          emailContato: "contato@amorinclusivosp.org",
          telefoneContato: "(11) 98765-4321",
          site: "https://amorinclusivosp.org",
          statusAprovacao: "APROVADA",
          dataAprovacao: new Date(),
          aprovadoPorId: admin.id,
          endereco: {
            create: {
              logradouro: "Rua das Flores",
              numero: "123",
              complemento: "Sala 1",
              bairro: "Vila Madalena",
              cidade: "São Paulo",
              uf: "SP",
              cep: "05432-000",
            },
          },
        },
      },
    },
  });
  console.log("✅ Entidade aprovada criada:", usuario1.email);

  // 3. Entidade pendente de exemplo
  const senhaEntidade2 = await bcrypt.hash("entidade123", 10);
  const usuario2 = await prisma.usuario.upsert({
    where: { email: "ong@solidariedade.org.br" },
    update: {},
    create: {
      nome: "ONG Solidariedade",
      email: "ong@solidariedade.org.br",
      senha: senhaEntidade2,
      tipo: "ENTIDADE",
      status: "ATIVO",
      entidade: {
        create: {
          cnpj: "98.765.432/0001-10",
          razaoSocial: "ONG Solidariedade Brasil",
          nomeFantasia: "Solidariedade Brasil",
          descricao:
            "Promovemos a distribuição de alimentos e itens de necessidade básica para famílias em situação de risco alimentar.",
          areaAtuacao: "Segurança Alimentar",
          emailContato: "ong@solidariedade.org.br",
          telefoneContato: "(21) 3333-4444",
          statusAprovacao: "PENDENTE",
          endereco: {
            create: {
              logradouro: "Av. Brasil",
              numero: "500",
              bairro: "Centro",
              cidade: "Rio de Janeiro",
              uf: "RJ",
              cep: "20040-020",
            },
          },
        },
      },
    },
  });
  console.log("✅ Entidade pendente criada:", usuario2.email);

  // 4. Entidade reprovada de exemplo
  const senhaEntidade3 = await bcrypt.hash("entidade123", 10);
  const usuario3 = await prisma.usuario.upsert({
    where: { email: "contato@entidadereprovada.org" },
    update: {},
    create: {
      nome: "Entidade Reprovada Teste",
      email: "contato@entidadereprovada.org",
      senha: senhaEntidade3,
      tipo: "ENTIDADE",
      status: "ATIVO",
      entidade: {
        create: {
          cnpj: "11.111.111/0001-11",
          razaoSocial: "Entidade Teste Reprovada LTDA",
          descricao: "Entidade de teste para demonstração do fluxo de reprovação.",
          areaAtuacao: "Educação",
          emailContato: "contato@entidadereprovada.org",
          statusAprovacao: "REPROVADA",
          motivoReprovacao:
            "Documentação incompleta: CNPJ não pôde ser verificado junto à Receita Federal.",
          aprovadoPorId: admin.id,
          endereco: {
            create: {
              logradouro: "Rua das Acácias",
              numero: "77",
              bairro: "Jardim América",
              cidade: "Belo Horizonte",
              uf: "MG",
              cep: "30130-000",
            },
          },
        },
      },
    },
  });
  console.log("✅ Entidade reprovada criada:", usuario3.email);

  console.log("\n🎉 Seed concluído com sucesso!");
  console.log("──────────────────────────────────────");
  console.log("Admin:    admin@doasync.com / admin123");
  console.log("Entidade: contato@amorinclusivosp.org / entidade123");
  console.log("Entidade: ong@solidariedade.org.br / entidade123");
  console.log("Entidade: contato@entidadereprovada.org / entidade123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
