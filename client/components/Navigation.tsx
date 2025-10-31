import Link from "next/link";
import { Button } from "./ui/button";
import { User } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="w-full h-18 bg-[#2E7D32] flex justify-between items-center px-10">
      <p className="text-white">Logo</p>
      <div className="flex items-center gap-10 text-white ">
        <Link
          className="border-b-2 border-transparent hover:border-white"
          href="/"
        >
          Quem somos
        </Link>
        <Link
          className="border-b-2 border-transparent hover:border-white"
          href="/"
        >
          Como ajudar
        </Link>
        <Link
          className="border-b-2 border-transparent hover:border-white"
          href="/"
        >
          Projetos
        </Link>
        <Link
          className="border-b-2 border-transparent hover:border-white"
          href="/"
        >
          Instituições
        </Link>
        <Button className="w-30 h-10 bg-[#FFD600] text-[#2E7D32] hover:bg-[#f4df76] text-md">
          Usuario <User size={24} />{" "}
        </Button>
      </div>
    </nav>
  );
};
