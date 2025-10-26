'use client';

import Layout from "./Layout";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Title from "../ui/Title";

export default function LoginForm(){
  return (
    <Layout>
        <Title>Bem vindo ao <span className="text-[#FFD600]">DoaSync!</span></Title>
        <Input placeholder="Informe seu email" type="email"></Input>
        <Input placeholder="Informe sua senha" type="password"></Input>
        
        <div className="text-white "> 
          <p className="text-sm cursor-pointer">Esqueceu sua senha? <span className="text-[#FFD600]">Clique aqui</span></p>
        </div>

        <Button onClick={() => alert("Bem vindo ao sistema")}>Entrar</Button>

        <p className="text-white cursor-pointer">Não tem uma conta? <span className="font-semibold">Cadastre-se</span></p>
    </Layout>
  );
}