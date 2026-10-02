// Campo de formulário reutilizável com label, slot de input e mensagem de erro
import { WarningCircle } from "@phosphor-icons/react/dist/ssr";

interface FormFieldProps {
  id: string;
  label: string;
  erro?: string;
  obrigatorio?: boolean;
  children: React.ReactNode;
}

export function FormField({ id, label, erro, obrigatorio, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {obrigatorio && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {erro && (
        <p id={`${id}-erro`} className="helper-error" role="alert">
          <WarningCircle size={12} className="inline mr-1" aria-hidden="true" />
          {erro}
        </p>
      )}
    </div>
  );
}
