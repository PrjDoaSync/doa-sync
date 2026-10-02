"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DotsThree,
  CheckCircle,
  XCircle,
  Prohibit,
  ArrowCounterClockwise,
  ArrowSquareOut,
  X,
  WarningCircle,
} from "@phosphor-icons/react";
import { STATUS_ENTIDADE } from "@/lib/constants";
import type { StatusEntidade } from "@/lib/constants";

interface EntidadeResumo {
  id: string;
  razaoSocial: string;
  nomeFantasia: string | null;
  statusAprovacao: string;
}

interface Props {
  entidade: EntidadeResumo;
}

type AcaoStatus = StatusEntidade | null;

interface ModalState {
  aberto: boolean;
  acao: AcaoStatus;
  motivo: string;
  erroMotivo: string;
}

const ACOES_CONFIG: Record<
  StatusEntidade,
  { label: string; Icon: React.ElementType; className: string }
> = {
  APROVADA: { label: "Aprovar", Icon: CheckCircle, className: "text-green-600 hover:bg-green-50" },
  REPROVADA: { label: "Reprovar", Icon: XCircle, className: "text-red-600 hover:bg-red-50" },
  INATIVA: { label: "Desativar", Icon: Prohibit, className: "text-slate-600 hover:bg-slate-100" },
  PENDENTE: { label: "Recolocar como Pendente", Icon: ArrowCounterClockwise, className: "text-yellow-600 hover:bg-yellow-50" },
};

const MENSAGENS: Record<string, (nome: string) => string> = {
  APROVADA: (nome) => `Deseja aprovar a entidade "${nome}"?`,
  REPROVADA: (nome) => `Deseja reprovar a entidade "${nome}"? Informe o motivo:`,
  INATIVA: (nome) => `Deseja desativar a entidade "${nome}"? Ela ficará invisível na plataforma.`,
  PENDENTE: (nome) => `Deseja recolocar "${nome}" como pendente para nova análise?`,
};

export function AdminEntidadeActions({ entidade }: Props) {
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [modal, setModal] = useState<ModalState>({
    aberto: false,
    acao: null,
    motivo: "",
    erroMotivo: "",
  });
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha menu ao clicar fora
  useEffect(() => {
    function handleClickFora(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuAberto(false);
      }
    }
    if (menuAberto) document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, [menuAberto]);

  // Fecha menu com Escape
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuAberto(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  function abrirModal(acao: AcaoStatus) {
    setMenuAberto(false);
    setModal({ aberto: true, acao, motivo: "", erroMotivo: "" });
  }

  function fecharModal() {
    if (carregando) return;
    setModal({ aberto: false, acao: null, motivo: "", erroMotivo: "" });
  }

  async function confirmarAcao() {
    if (!modal.acao) return;

    if (modal.acao === STATUS_ENTIDADE.REPROVADA && !modal.motivo.trim()) {
      setModal((prev) => ({ ...prev, erroMotivo: "Informe o motivo da reprovação." }));
      return;
    }

    setCarregando(true);
    try {
      const res = await fetch(`/api/entidades/${entidade.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: modal.acao, motivo: modal.motivo }),
      });

      if (!res.ok) {
        const data = await res.json();
        setModal((prev) => ({
          ...prev,
          erroMotivo: data.error ?? "Erro ao processar.",
        }));
        return;
      }

      fecharModal();
      router.refresh();
    } catch {
      setModal((prev) => ({ ...prev, erroMotivo: "Erro de conexão." }));
    } finally {
      setCarregando(false);
    }
  }

  const nome = entidade.nomeFantasia ?? entidade.razaoSocial;
  const status = entidade.statusAprovacao as StatusEntidade;

  // Ações disponíveis conforme status atual
  const acoesDisponiveis: StatusEntidade[] = [];
  if (status !== STATUS_ENTIDADE.APROVADA) acoesDisponiveis.push(STATUS_ENTIDADE.APROVADA);
  if (status !== STATUS_ENTIDADE.REPROVADA) acoesDisponiveis.push(STATUS_ENTIDADE.REPROVADA);
  if (status !== STATUS_ENTIDADE.INATIVA) acoesDisponiveis.push(STATUS_ENTIDADE.INATIVA);
  if (status === STATUS_ENTIDADE.REPROVADA || status === STATUS_ENTIDADE.INATIVA)
    acoesDisponiveis.push(STATUS_ENTIDADE.PENDENTE);

  return (
    <>
      <div className="relative inline-block" ref={menuRef}>
        <button
          onClick={() => setMenuAberto((v) => !v)}
          className="btn-sm btn-ghost"
          aria-haspopup="true"
          aria-expanded={menuAberto}
          aria-label={`Ações para ${nome}`}
        >
          <DotsThree size={20} weight="bold" aria-hidden="true" />
        </button>

        {menuAberto && (
          <div
            role="menu"
            className="absolute right-0 z-10 mt-1 w-52 rounded-md border border-slate-200 bg-white shadow-md"
          >
            {status === STATUS_ENTIDADE.APROVADA && (
              <a
                href={`/entidades/${entidade.id}`}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <ArrowSquareOut size={16} aria-hidden="true" />
                Ver perfil público
              </a>
            )}

            {status === STATUS_ENTIDADE.APROVADA && acoesDisponiveis.length > 0 && (
              <div className="border-t border-slate-100 my-1" />
            )}

            {acoesDisponiveis.map((acao) => {
              const cfg = ACOES_CONFIG[acao];
              return (
                <button
                  key={acao}
                  role="menuitem"
                  onClick={() => abrirModal(acao)}
                  className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors ${cfg.className}`}
                >
                  <cfg.Icon size={16} aria-hidden="true" />
                  {cfg.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de confirmação */}
      {modal.aberto && modal.acao && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titulo"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 id="modal-titulo" className="text-lg font-semibold text-slate-900">
                {ACOES_CONFIG[modal.acao].label} Entidade
              </h2>
              <button
                onClick={fecharModal}
                disabled={carregando}
                className="btn-sm btn-ghost"
                aria-label="Fechar modal"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              <p className="text-slate-600">{MENSAGENS[modal.acao](nome)}</p>

              {modal.acao === STATUS_ENTIDADE.REPROVADA && (
                <div>
                  <label htmlFor="motivo-reprovacao" className="label">
                    Motivo{" "}
                    <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="motivo-reprovacao"
                    rows={3}
                    className={`input h-auto py-2 resize-none ${modal.erroMotivo ? "input-error" : ""}`}
                    value={modal.motivo}
                    onChange={(e) =>
                      setModal((prev) => ({ ...prev, motivo: e.target.value, erroMotivo: "" }))
                    }
                    placeholder="Ex: Documentação incompleta, CNPJ não verificado..."
                    aria-required="true"
                    aria-describedby={modal.erroMotivo ? "motivo-erro" : undefined}
                  />
                </div>
              )}

              {modal.erroMotivo && (
                <p id="motivo-erro" role="alert" className="helper-error">
                  <WarningCircle size={12} className="inline mr-1" aria-hidden="true" />
                  {modal.erroMotivo}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                onClick={fecharModal}
                disabled={carregando}
                className="btn-md btn-outline"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarAcao}
                disabled={carregando}
                className={`btn-md ${
                  modal.acao === STATUS_ENTIDADE.REPROVADA ||
                  modal.acao === STATUS_ENTIDADE.INATIVA
                    ? "btn-destructive"
                    : "btn-primary"
                }`}
              >
                {carregando ? "Processando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
