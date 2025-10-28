"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Title from "@/components/ui/Title";

export default function LoginForm() {
  return (
    <>
      <Title>
        Bem vindo ao <span className="text-[#FFD600]">DoaSync!</span>
      </Title>
      <Input placeholder="Informe seu email" type="email"></Input>
      <Input placeholder="Informe sua senha" type="password"></Input>

      <div className="text-white ">
        <p className="text-sm cursor-pointer">
          Esqueceu sua senha?{" "}
          <span className="text-[#FFD600]">Clique aqui</span>
        </p>
      </div>

      <Button onClick={() => alert("Bem vindo ao sistema")}>Entrar</Button>

      <p className="text-white cursor-pointer">
        Não tem uma conta? <span className="font-semibold">Cadastre-se</span>
      </p>
    </>
  );
}
