// @flow
import * as React from 'react';
import Styles from "./form-login-styles.scss";
import {Input} from "@/presentation/components/Input";
import Context from "@/presentation/components/context/form-context";
import {ErrorForm} from "@/presentation/components/ErrorForm";
import {Link, useNavigate} from 'react-router-dom';


export const FormLogin = () => {
    const history = useNavigate();
    const {state, setState, authentication} = React.useContext(Context);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        try {
            if (state.isLoading || state.emailError || state.passwordError){
                return;
            }

            setState({
                ...state,
                isLoading: true,
            })
            const account = await authentication.auth({
                email: state.email,
                password: state.password
            })
            localStorage.setItem('accessToken', account.accessToken);
            history('/');
        } catch (error) {
            setState({
                ...state,
                isLoading: false,
                errorMessage: error.message
            })
        }
    };
    return (
        <form data-testid={'form'} className={Styles.form} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <Input type="email" name="email" placeholder="Digite seu e-mail"/>
            <Input type="password" name="password" placeholder="Digite sua senha"/>
            <button data-testid={"submit"} disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>
            <Link data-testid={'signup'} className={Styles.link} to={'/signup'}>Criar Conta</Link>
            <ErrorForm/>
        </form>
    )
}
