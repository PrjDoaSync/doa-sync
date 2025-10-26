'use client';

import Layout from "./Layout";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Title from "../ui/Title";


export default function CadastroForm (){ 
  return(
        
    <Layout>
      <Title>Bem vindo ao <span className="text-[#FFD600]">DoaSync!</span></Title>
      <Input placeholder="Nome Completo" type="text"></Input>
      <Input placeholder="Informe seu email" type="email"></Input>
      <Input placeholder="Informe sua senha" type="password"></Input>
      <Button onClick={() => alert ("Cadastro feito com sucesso !")}>Cadastrar</Button>

      <p className="text-white cursor-pointer">Já tem uma conta? <span className="font-semibold text-[#FFD600]">Faça login</span></p>
      
    </Layout>
    
  )
}