'use client';

import Layout from "./Layout";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Title from "../ui/Title";

export default function Recover(){
    return(
        <Layout >
            <Title>Esqueceu a senha?</Title>
            <p className="text-white font-semibold text-center ">Informe o email e enviaremos um  link <br /> para recuperação de senha.  </p>
            <Input type="email" placeholder="Informe seu email"></Input>
            <Button onClick={() => alert ("Email enviado para recuperação de senha !")}> Enviar </Button>
        </Layout>
    )
}