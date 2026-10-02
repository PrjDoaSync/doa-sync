// ─────────────────────────────────────────────────────────────
// Tipos compartilhados do módulo de Entidade Assistencial
// ─────────────────────────────────────────────────────────────

import type { StatusEntidade } from "@/lib/constants";

export interface EnderecoEntidadeData {
  id: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  entidadeId: string;
}

export interface EntidadeData {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string | null;
  descricao: string | null;
  areaAtuacao: string | null;
  site: string | null;
  logoUrl: string | null;
  statusAprovacao: StatusEntidade;
  motivoReprovacao: string | null;
  dataAprovacao: Date | string | null;
  emailContato: string | null;
  telefoneContato: string | null;
  whatsapp: string | null;
  usuarioId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  endereco?: EnderecoEntidadeData | null;
  usuario?: {
    id: string;
    nome: string;
    email: string;
    status: string;
    dataCadastro?: Date | string;
  };
}

/** Dados do formulário de cadastro/edição */
export interface EntidadeFormData {
  // Conta (apenas no cadastro)
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  // Dados institucionais
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  descricao: string;
  areaAtuacao: string;
  site: string;
  emailContato: string;
  telefoneContato: string;
  whatsapp: string;
  // Endereço
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface EntidadeFormProps {
  modo: "cadastro" | "edicao";
  entidadeId?: string;
  dadosIniciais?: Partial<EntidadeFormData & { endereco?: Partial<EntidadeFormData> }>;
}

/** Resposta paginada da API */
export interface PaginacaoMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EntidadesResponse {
  data: EntidadeData[];
  meta: PaginacaoMeta;
}
