// @flow
import * as React from 'react';
import Styles from "./form-login-styles.scss";
import {Input} from "@/presentation/components/Input";
import {ErrorForm} from "@/presentation/components/ErrorForm";


export const FormLogin = () => {
    return (
        <form action="" className={Styles.form}>
            <h2>Login</h2>
            <Input type="email" name="email" placeholder="Digite seu e-mail"/>
            <Input type="password" name="password" placeholder="Digite sua senha"/>
            <button className={Styles.submit} type="submit">Entrar</button>
            <span className={Styles.link}>Criar Conta</span>
            <ErrorForm/>
        </form>
    )
}
