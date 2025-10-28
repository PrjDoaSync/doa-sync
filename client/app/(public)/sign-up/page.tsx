"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Title from "@/components/ui/Title";

export default function CadastroForm() {
  return (
    <>
      <Title>
        Crie sua conta no <span className="text-[#FFD600]">DoaSync!</span>
      </Title>
      <Input placeholder="Nome Completo" type="text"></Input>
      <Input placeholder="Informe seu email" type="email"></Input>
      <Input placeholder="Informe sua senha" type="password"></Input>
      <Button onClick={() => alert("Cadastro feito com sucesso !")}>
        Cadastrar
      </Button>

      <p className="text-white cursor-pointer">
        Já tem uma conta?{" "}
        <span className="font-semibold text-[#FFD600]">Faça login</span>
      </p>
    </>
  );
}
