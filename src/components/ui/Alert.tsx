// Componente de alerta / feedback in-page
import { WarningCircle, CheckCircle, Info } from "@phosphor-icons/react/dist/ssr";

type AlertVariant = "error" | "success" | "warning" | "info";

const VARIANT_CONFIG: Record<
  AlertVariant,
  { borderColor: string; bgClass: string; textClass: string; Icon: React.ElementType }
> = {
  error: {
    borderColor: "border-red-500",
    bgClass: "bg-feedback-error-bg",
    textClass: "text-feedback-error-text",
    Icon: WarningCircle,
  },
  success: {
    borderColor: "border-green-500",
    bgClass: "bg-feedback-success-bg",
    textClass: "text-feedback-success-text",
    Icon: CheckCircle,
  },
  warning: {
    borderColor: "border-yellow-400",
    bgClass: "bg-feedback-warning-bg",
    textClass: "text-feedback-warning-text",
    Icon: WarningCircle,
  },
  info: {
    borderColor: "border-blue-400",
    bgClass: "bg-feedback-info-bg",
    textClass: "text-feedback-info-text",
    Icon: Info,
  },
};

interface AlertProps {
  variant: AlertVariant;
  children: React.ReactNode;
  role?: "alert" | "status";
}

export function Alert({ variant, children, role = "alert" }: AlertProps) {
  const { borderColor, bgClass, textClass, Icon } = VARIANT_CONFIG[variant];

  return (
    <div
      role={role}
      className={`flex items-start gap-2 rounded-md border-l-4 ${borderColor} ${bgClass} p-3 text-sm ${textClass}`}
    >
      <Icon size={16} weight="fill" className="mt-0.5 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
