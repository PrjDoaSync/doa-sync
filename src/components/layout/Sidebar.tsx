"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Buildings,
  ChartBar,
  SignOut,
  UserCircle,
  Heart,
} from "@phosphor-icons/react";
import { TIPO_USUARIO } from "@/lib/constants";

const navAdmin = [
  { href: "/admin", label: "Dashboard", Icon: ChartBar },
  { href: "/admin/entidades", label: "Entidades", Icon: Buildings },
];

const navEntidade = [
  { href: "/entidade/perfil", label: "Meu Perfil", Icon: UserCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.tipo === TIPO_USUARIO.ADMIN;
  const nav = isAdmin ? navAdmin : navEntidade;

  return (
    <aside className="fixed inset-y-0 left-0 flex w-sidebar flex-col bg-white border-r border-slate-200 z-30">
      {/* Logo */}
      <div className="flex items-center gap-2 h-16 px-6 border-b border-slate-200">
        <Heart size={24} weight="fill" className="text-brand-primary" aria-hidden="true" />
        <span className="text-lg font-bold text-slate-900">DoaSync</span>
      </div>

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Navegação principal">
        <ul className="space-y-1">
          {nav.map(({ href, label, Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand-primary text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={20} weight={active ? "fill" : "regular"} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Usuário + logout */}
      <div className="border-t border-slate-200 p-4">
        <div className="mb-3">
          <p className="text-sm font-medium text-slate-900 truncate">
            {session?.user?.name}
          </p>
          <p className="text-xs text-slate-500 truncate">{session?.user?.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="btn-md btn-ghost w-full justify-start text-slate-600"
          aria-label="Sair da conta"
        >
          <SignOut size={18} aria-hidden="true" />
          Sair
        </button>
      </div>
    </aside>
  );
}
