"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { WarningCircle, CheckCircle } from "@phosphor-icons/react";
import { FormField } from "@/components/ui/FormField";
import { AREAS_ATUACAO, UFS } from "@/lib/constants";
import {
  mascaraCNPJ,
  mascaraCEP,
  mascaraTelefone,
  validarCadastroCampos,
  validarDadosInstitucionais,
} from "@/lib/validations";
import type { EntidadeFormProps, EntidadeFormData } from "@/types/entidade";

export function EntidadeForm({ modo, entidadeId, dadosIniciais }: EntidadeFormProps) {
  const router = useRouter();
  const isCadastro = modo === "cadastro";

  const [form, setForm] = useState<EntidadeFormData>({
    nome: dadosIniciais?.nome ?? "",
    email: dadosIniciais?.email ?? "",
    senha: "",
    confirmarSenha: "",
    cnpj: dadosIniciais?.cnpj ?? "",
    razaoSocial: dadosIniciais?.razaoSocial ?? "",
    nomeFantasia: dadosIniciais?.nomeFantasia ?? "",
    descricao: dadosIniciais?.descricao ?? "",
    areaAtuacao: dadosIniciais?.areaAtuacao ?? "",
    site: dadosIniciais?.site ?? "",
    emailContato: dadosIniciais?.emailContato ?? "",
    telefoneContato: dadosIniciais?.telefoneContato ?? "",
    whatsapp: dadosIniciais?.whatsapp ?? "",
    cep: dadosIniciais?.endereco?.cep ?? "",
    logradouro: dadosIniciais?.endereco?.logradouro ?? "",
    numero: dadosIniciais?.endereco?.numero ?? "",
    complemento: dadosIniciais?.endereco?.complemento ?? "",
    bairro: dadosIniciais?.endereco?.bairro ?? "",
    cidade: dadosIniciais?.endereco?.cidade ?? "",
    uf: dadosIniciais?.endereco?.uf ?? "",
  });

  const [erros, setErros] = useState<Partial<Record<keyof EntidadeFormData, string>>>({});
  const [erroGeral, setErroGeral] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  function atualizar(campo: keyof EntidadeFormData, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErros((prev) => ({ ...prev, [campo]: undefined }));
  }

  async function buscarCEP(cep: string) {
    const limpo = cep.replace(/\D/g, "");
    if (limpo.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          logradouro: data.logradouro ?? prev.logradouro,
          bairro: data.bairro ?? prev.bairro,
          cidade: data.localidade ?? prev.cidade,
          uf: data.uf ?? prev.uf,
        }));
      }
    } catch {
      // Silencioso — usuário preenche manualmente
    }
  }

  function validar(): boolean {
    const novosErros = isCadastro
      ? validarCadastroCampos({ ...form })
      : validarDadosInstitucionais(form);

    setErros(novosErros as Partial<Record<keyof EntidadeFormData, string>>);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErroGeral("");
    setSucesso("");
    if (!validar()) return;

    setCarregando(true);
    try {
      const url = isCadastro ? "/api/entidades" : `/api/entidades/${entidadeId}`;
      const method = isCadastro ? "POST" : "PATCH";

      const payload = isCadastro
        ? form
        : {
            razaoSocial: form.razaoSocial,
            nomeFantasia: form.nomeFantasia,
            descricao: form.descricao,
            areaAtuacao: form.areaAtuacao,
            site: form.site,
            emailContato: form.emailContato,
            telefoneContato: form.telefoneContato,
            whatsapp: form.whatsapp,
            logradouro: form.logradouro,
            numero: form.numero,
            complemento: form.complemento,
            bairro: form.bairro,
            cidade: form.cidade,
            uf: form.uf,
            cep: form.cep,
          };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.erros) {
          setErros(data.erros);
        } else {
          setErroGeral(data.error ?? "Erro ao processar. Tente novamente.");
        }
        return;
      }

      setSucesso(data.message);
      if (isCadastro) {
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch {
      setErroGeral("Erro de conexão. Verifique sua internet.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Feedback geral */}
      {erroGeral && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border-l-4 border-red-500 bg-feedback-error-bg p-3 text-sm text-feedback-error-text"
        >
          <WarningCircle size={16} weight="fill" className="mt-0.5 shrink-0" aria-hidden="true" />
          {erroGeral}
        </div>
      )}
      {sucesso && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-md border-l-4 border-green-500 bg-feedback-success-bg p-3 text-sm text-feedback-success-text"
        >
          <CheckCircle size={16} weight="fill" className="mt-0.5 shrink-0" aria-hidden="true" />
          {sucesso}
        </div>
      )}

      {/* ── Dados de Acesso (apenas no cadastro) */}
      {isCadastro && (
        <fieldset className="card space-y-4">
          <legend className="text-lg font-semibold text-slate-900 mb-4">Dados de Acesso</legend>

          <FormField id="nome" label="Nome do Responsável" erro={erros.nome} obrigatorio>
            <input
              id="nome"
              type="text"
              className={`input ${erros.nome ? "input-error" : ""}`}
              value={form.nome}
              onChange={(e) => atualizar("nome", e.target.value)}
              autoComplete="name"
              aria-describedby={erros.nome ? "nome-erro" : undefined}
              aria-required="true"
            />
          </FormField>

          <FormField id="email" label="E-mail" erro={erros.email} obrigatorio>
            <input
              id="email"
              type="email"
              className={`input ${erros.email ? "input-error" : ""}`}
              value={form.email}
              onChange={(e) => atualizar("email", e.target.value)}
              autoComplete="email"
              aria-describedby={erros.email ? "email-erro" : undefined}
              aria-required="true"
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField id="senha" label="Senha" erro={erros.senha} obrigatorio>
              <input
                id="senha"
                type="password"
                className={`input ${erros.senha ? "input-error" : ""}`}
                value={form.senha}
                onChange={(e) => atualizar("senha", e.target.value)}
                autoComplete="new-password"
                aria-describedby={erros.senha ? "senha-erro" : undefined}
                aria-required="true"
              />
            </FormField>
            <FormField id="confirmarSenha" label="Confirmar Senha" erro={erros.confirmarSenha} obrigatorio>
              <input
                id="confirmarSenha"
                type="password"
                className={`input ${erros.confirmarSenha ? "input-error" : ""}`}
                value={form.confirmarSenha}
                onChange={(e) => atualizar("confirmarSenha", e.target.value)}
                autoComplete="new-password"
                aria-describedby={erros.confirmarSenha ? "confirmarSenha-erro" : undefined}
                aria-required="true"
              />
            </FormField>
          </div>
        </fieldset>
      )}

      {/* ── Informações Institucionais */}
      <fieldset className="card space-y-4">
        <legend className="text-lg font-semibold text-slate-900 mb-4">Informações Institucionais</legend>

        {isCadastro && (
          <FormField id="cnpj" label="CNPJ" erro={erros.cnpj} obrigatorio>
            <input
              id="cnpj"
              type="text"
              inputMode="numeric"
              className={`input ${erros.cnpj ? "input-error" : ""}`}
              value={form.cnpj}
              onChange={(e) => atualizar("cnpj", mascaraCNPJ(e.target.value))}
              placeholder="00.000.000/0000-00"
              maxLength={18}
              aria-describedby={erros.cnpj ? "cnpj-erro" : undefined}
              aria-required="true"
            />
          </FormField>
        )}

        <FormField id="razaoSocial" label="Razão Social" erro={erros.razaoSocial} obrigatorio>
          <input
            id="razaoSocial"
            type="text"
            className={`input ${erros.razaoSocial ? "input-error" : ""}`}
            value={form.razaoSocial}
            onChange={(e) => atualizar("razaoSocial", e.target.value)}
            aria-describedby={erros.razaoSocial ? "razaoSocial-erro" : undefined}
            aria-required="true"
          />
        </FormField>

        <FormField id="nomeFantasia" label="Nome Fantasia">
          <input
            id="nomeFantasia"
            type="text"
            className="input"
            value={form.nomeFantasia}
            onChange={(e) => atualizar("nomeFantasia", e.target.value)}
          />
        </FormField>

        <FormField id="descricao" label="Descrição" erro={erros.descricao} obrigatorio>
          <textarea
            id="descricao"
            rows={4}
            className={`input h-auto py-2 resize-none ${erros.descricao ? "input-error" : ""}`}
            value={form.descricao}
            onChange={(e) => atualizar("descricao", e.target.value)}
            placeholder="Descreva o trabalho e os objetivos da sua organização..."
            aria-describedby={erros.descricao ? "descricao-erro" : undefined}
            aria-required="true"
          />
        </FormField>

        <FormField id="areaAtuacao" label="Área de Atuação">
          <select
            id="areaAtuacao"
            className="input"
            value={form.areaAtuacao}
            onChange={(e) => atualizar("areaAtuacao", e.target.value)}
          >
            <option value="">Selecione...</option>
            {AREAS_ATUACAO.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </FormField>

        <FormField id="site" label="Site">
          <input
            id="site"
            type="url"
            className="input"
            value={form.site}
            onChange={(e) => atualizar("site", e.target.value)}
            placeholder="https://suaentidade.org.br"
          />
        </FormField>
      </fieldset>

      {/* ── Dados de Contato */}
      <fieldset className="card space-y-4">
        <legend className="text-lg font-semibold text-slate-900 mb-4">Dados de Contato</legend>

        <FormField id="emailContato" label="E-mail de Contato">
          <input
            id="emailContato"
            type="email"
            className="input"
            value={form.emailContato}
            onChange={(e) => atualizar("emailContato", e.target.value)}
            placeholder="contato@suaentidade.org"
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField id="telefoneContato" label="Telefone">
            <input
              id="telefoneContato"
              type="tel"
              className="input"
              value={form.telefoneContato}
              onChange={(e) => atualizar("telefoneContato", mascaraTelefone(e.target.value))}
              placeholder="(00) 00000-0000"
            />
          </FormField>
          <FormField id="whatsapp" label="WhatsApp">
            <input
              id="whatsapp"
              type="tel"
              className="input"
              value={form.whatsapp}
              onChange={(e) => atualizar("whatsapp", mascaraTelefone(e.target.value))}
              placeholder="(00) 00000-0000"
            />
          </FormField>
        </div>
      </fieldset>

      {/* ── Endereço da Sede */}
      <fieldset className="card space-y-4">
        <legend className="text-lg font-semibold text-slate-900 mb-4">Endereço da Sede</legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <FormField id="cep" label="CEP" erro={erros.cep} obrigatorio>
              <input
                id="cep"
                type="text"
                inputMode="numeric"
                className={`input ${erros.cep ? "input-error" : ""}`}
                value={form.cep}
                onChange={(e) => atualizar("cep", mascaraCEP(e.target.value))}
                onBlur={(e) => buscarCEP(e.target.value)}
                placeholder="00000-000"
                maxLength={9}
                aria-describedby={erros.cep ? "cep-erro" : undefined}
                aria-required="true"
              />
            </FormField>
          </div>
          <FormField id="uf" label="UF" erro={erros.uf} obrigatorio>
            <select
              id="uf"
              className={`input ${erros.uf ? "input-error" : ""}`}
              value={form.uf}
              onChange={(e) => atualizar("uf", e.target.value)}
              aria-required="true"
            >
              <option value="">UF</option>
              {UFS.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </FormField>
        </div>

        <FormField id="logradouro" label="Logradouro" erro={erros.logradouro} obrigatorio>
          <input
            id="logradouro"
            type="text"
            className={`input ${erros.logradouro ? "input-error" : ""}`}
            value={form.logradouro}
            onChange={(e) => atualizar("logradouro", e.target.value)}
            aria-describedby={erros.logradouro ? "logradouro-erro" : undefined}
            aria-required="true"
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField id="numero" label="Número" erro={erros.numero} obrigatorio>
            <input
              id="numero"
              type="text"
              className={`input ${erros.numero ? "input-error" : ""}`}
              value={form.numero}
              onChange={(e) => atualizar("numero", e.target.value)}
              aria-required="true"
            />
          </FormField>
          <div className="sm:col-span-2">
            <FormField id="complemento" label="Complemento">
              <input
                id="complemento"
                type="text"
                className="input"
                value={form.complemento}
                onChange={(e) => atualizar("complemento", e.target.value)}
                placeholder="Sala, andar, bloco..."
              />
            </FormField>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField id="bairro" label="Bairro" erro={erros.bairro} obrigatorio>
            <input
              id="bairro"
              type="text"
              className={`input ${erros.bairro ? "input-error" : ""}`}
              value={form.bairro}
              onChange={(e) => atualizar("bairro", e.target.value)}
              aria-required="true"
            />
          </FormField>
          <FormField id="cidade" label="Cidade" erro={erros.cidade} obrigatorio>
            <input
              id="cidade"
              type="text"
              className={`input ${erros.cidade ? "input-error" : ""}`}
              value={form.cidade}
              onChange={(e) => atualizar("cidade", e.target.value)}
              aria-required="true"
            />
          </FormField>
        </div>
      </fieldset>

      {/* ── Ações */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-md btn-outline"
          disabled={carregando}
        >
          Cancelar
        </button>
        <button type="submit" disabled={carregando} className="btn-md btn-primary">
          {carregando
            ? "Salvando..."
            : isCadastro
            ? "Cadastrar Entidade"
            : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
}
