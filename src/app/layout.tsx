import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/layout";

export const metadata: Metadata = {
  title: "DoaSync — Plataforma de Doações",
  description:
    "Conectando doadores, entidades assistenciais e gestores de forma transparente.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
