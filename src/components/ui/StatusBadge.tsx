import {
  CheckCircle,
  Clock,
  XCircle,
  Prohibit,
} from "@phosphor-icons/react/dist/ssr";
import type { StatusEntidade } from "@/lib/constants";

const CONFIG: Record<
  StatusEntidade,
  { label: string; className: string; Icon: React.ElementType }
> = {
  APROVADA: { label: "Aprovada", className: "badge-aprovada", Icon: CheckCircle },
  PENDENTE: { label: "Pendente", className: "badge-pendente", Icon: Clock },
  REPROVADA: { label: "Reprovada", className: "badge-reprovada", Icon: XCircle },
  INATIVA: { label: "Inativa", className: "badge-inativa", Icon: Prohibit },
};

export function StatusBadge({ status }: { status: string }) {
  const cfg = CONFIG[status as StatusEntidade] ?? CONFIG.PENDENTE;
  const { Icon, label, className } = cfg;

  return (
    <span className={className}>
      <Icon size={12} weight="fill" aria-hidden="true" />
      {label}
    </span>
  );
}
