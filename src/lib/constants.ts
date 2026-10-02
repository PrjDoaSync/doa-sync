// ─────────────────────────────────────────────────────────────
// Constantes compartilhadas entre client e server
// ─────────────────────────────────────────────────────────────

/** Status possíveis de uma entidade assistencial */
export const STATUS_ENTIDADE = {
  PENDENTE: "PENDENTE",
  APROVADA: "APROVADA",
  REPROVADA: "REPROVADA",
  INATIVA: "INATIVA",
} as const;

export type StatusEntidade = (typeof STATUS_ENTIDADE)[keyof typeof STATUS_ENTIDADE];

export const STATUS_ENTIDADE_LISTA = Object.values(STATUS_ENTIDADE);

/** Labels legíveis dos status */
export const STATUS_ENTIDADE_LABEL: Record<StatusEntidade, string> = {
  PENDENTE: "Pendente",
  APROVADA: "Aprovada",
  REPROVADA: "Reprovada",
  INATIVA: "Inativa",
};

/** Tipo de usuário */
export const TIPO_USUARIO = {
  PESSOA_FISICA: "PESSOA_FISICA",
  PESSOA_JURIDICA: "PESSOA_JURIDICA",
  ENTIDADE: "ENTIDADE",
  ADMIN: "ADMIN",
} as const;

export type TipoUsuario = (typeof TIPO_USUARIO)[keyof typeof TIPO_USUARIO];

/** Áreas de atuação disponíveis para seleção */
export const AREAS_ATUACAO = [
  "Assistência Social",
  "Educação",
  "Saúde",
  "Segurança Alimentar",
  "Meio Ambiente",
  "Cultura e Arte",
  "Esporte",
  "Direitos Humanos",
  "Habitação",
  "Outro",
] as const;

export type AreaAtuacao = (typeof AREAS_ATUACAO)[number];

/** Unidades Federativas brasileiras */
export const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

export type UF = (typeof UFS)[number];

/** Configurações de paginação padrão */
export const PAGINACAO = {
  LIMIT_PADRAO: 10,
  LIMIT_MAXIMO: 50,
} as const;
