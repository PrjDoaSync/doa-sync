"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Title from "@/components/ui/Title";

export default function Recover() {
  return (
    <>
      <Title>Esqueceu a senha?</Title>
      <p className="text-white font-semibold text-center ">
        Informe o email e enviaremos um link <br /> para recuperação de senha.{" "}
      </p>
      <Input type="email" placeholder="Informe seu email"></Input>
      <Button
        onClick={() => alert("Email enviado para recuperação de senha !")}
      >
        {" "}
        Enviar{" "}
      </Button>
    </>
  );
}
