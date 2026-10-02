import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.tipo === "ADMIN") redirect("/admin/entidades");
  if (session.user.tipo === "ENTIDADE") redirect("/entidade/perfil");

  redirect("/login");
}
