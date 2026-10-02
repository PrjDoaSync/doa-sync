-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ATIVO',
    "dataCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "pessoas_fisicas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "dataNascimento" DATETIME,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "pessoas_fisicas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pessoas_juridicas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "pessoas_juridicas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "entidades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT,
    "descricao" TEXT,
    "areaAtuacao" TEXT,
    "site" TEXT,
    "logoUrl" TEXT,
    "statusAprovacao" TEXT NOT NULL DEFAULT 'PENDENTE',
    "motivoReprovacao" TEXT,
    "dataAprovacao" DATETIME,
    "aprovadoPorId" TEXT,
    "emailContato" TEXT,
    "telefoneContato" TEXT,
    "whatsapp" TEXT,
    "usuarioId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "entidades_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "enderecos_entidades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "entidadeId" TEXT NOT NULL,
    CONSTRAINT "enderecos_entidades_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "entidades" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "enderecos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "telefones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "telefones_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_fisicas_cpf_key" ON "pessoas_fisicas"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_fisicas_usuarioId_key" ON "pessoas_fisicas"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_juridicas_cnpj_key" ON "pessoas_juridicas"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_juridicas_usuarioId_key" ON "pessoas_juridicas"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "entidades_cnpj_key" ON "entidades"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "entidades_usuarioId_key" ON "entidades"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_entidades_entidadeId_key" ON "enderecos_entidades"("entidadeId");
