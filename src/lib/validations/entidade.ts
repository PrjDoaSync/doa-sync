// ─────────────────────────────────────────────────────────────
// Regras de validação de entidade (reutilizadas em API e client)
// ─────────────────────────────────────────────────────────────

/** Valida CNPJ: 14 dígitos, não repetidos */
export function validarCNPJ(cnpj: string): boolean {
  const limpo = cnpj.replace(/\D/g, "");
  if (limpo.length !== 14) return false;
  if (/^(\d)\1+$/.test(limpo)) return false;
  return true;
}

/** Formata CNPJ para o padrão 00.000.000/0000-00 */
export function formatarCNPJ(cnpj: string): string {
  return cnpj
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

/** Formata CEP para o padrão 00000-000 */
export function formatarCEP(cep: string): string {
  return cep
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

/** Máscara de CNPJ para inputs (client-side) */
export function mascaraCNPJ(valor: string): string {
  return valor
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18);
}

/** Máscara de CEP para inputs (client-side) */
export function mascaraCEP(valor: string): string {
  return valor
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}

/** Máscara de telefone para inputs (client-side) */
export function mascaraTelefone(valor: string): string {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);
  if (numeros.length <= 10) {
    return numeros.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
  }
  return numeros.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
}

/** Erros de validação do formulário de entidade */
export type ErrosEntidade = Partial<Record<string, string>>;

/** Valida os campos obrigatórios do cadastro de entidade */
export function validarCadastroCampos(form: {
  nome?: string;
  email?: string;
  senha?: string;
  confirmarSenha?: string;
  cnpj?: string;
  razaoSocial?: string;
  descricao?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
}): ErrosEntidade {
  const erros: ErrosEntidade = {};

  if (!form.nome?.trim()) erros.nome = "Nome é obrigatório.";
  if (!form.email?.trim()) erros.email = "E-mail é obrigatório.";
  if (!form.senha || form.senha.length < 6)
    erros.senha = "Senha deve ter ao menos 6 caracteres.";
  if (form.senha !== form.confirmarSenha)
    erros.confirmarSenha = "As senhas não coincidem.";
  if (!form.cnpj?.trim()) erros.cnpj = "CNPJ é obrigatório.";
  else if (!validarCNPJ(form.cnpj)) erros.cnpj = "CNPJ inválido.";

  return { ...erros, ...validarDadosInstitucionais(form) };
}

/** Valida apenas os campos institucionais (usados em cadastro e edição) */
export function validarDadosInstitucionais(form: {
  razaoSocial?: string;
  descricao?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
}): ErrosEntidade {
  const erros: ErrosEntidade = {};

  if (!form.razaoSocial?.trim()) erros.razaoSocial = "Razão Social é obrigatória.";
  if (!form.descricao?.trim()) erros.descricao = "Descrição é obrigatória.";
  if (!form.logradouro?.trim()) erros.logradouro = "Logradouro é obrigatório.";
  if (!form.numero?.trim()) erros.numero = "Número é obrigatório.";
  if (!form.bairro?.trim()) erros.bairro = "Bairro é obrigatório.";
  if (!form.cidade?.trim()) erros.cidade = "Cidade é obrigatória.";
  if (!form.uf) erros.uf = "UF é obrigatória.";
  if (!form.cep?.trim()) erros.cep = "CEP é obrigatório.";

  return erros;
}
