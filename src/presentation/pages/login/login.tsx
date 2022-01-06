import * as React from 'react';
import Styles from './login-styles.scss'
import LoginHeader from "@/presentation/components/loginHeader";
import {FormLogin} from "@/presentation/components/FormLogin";
import {Footer} from "@/presentation/components/Footer";
import {useEffect, useState} from "react";
import Context from "@/presentation/components/context/form-context";
import {Validation} from "@/presentation/protocols/Validation";
import {Authentication} from "@/domain/useCases/authentication";

type Props = {
    validation: Validation
    authentication: Authentication
}

const Login: React.FC<Props> = ({validation, authentication}:Props) => {
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        errorMessage: '',
        emailError: '',
        passwordError: '',
    });

    useEffect(() => {
        setState({
            ...state,
            emailError: validation.validate('email', state.email),
            passwordError: validation.validate('password', state.password)
        })
    }, [state.email, state.password]);

    return (
        <div className={Styles.login}>
            <LoginHeader/>
            <Context.Provider value={{state, setState, authentication}}>
                <FormLogin/>
            </Context.Provider>
            <Footer/>
        </div>
    );
};

export default Login
