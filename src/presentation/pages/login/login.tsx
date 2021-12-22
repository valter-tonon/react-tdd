import * as React from 'react';
import Styles from './login-styles.scss'
import LoginHeader from "@/presentation/components/loginHeader";
import {FormLogin} from "@/presentation/components/FormLogin";
import {Footer} from "@/presentation/components/Footer";
import {useState} from "react";
import Context from "@/presentation/components/context/form-context";

type State = {
    isLoading: boolean,
    errorMessage: string
}

const Login: React.FC = () => {
    const [state] = useState<State>({
        isLoading: false,
        errorMessage: ''
    });
    return (
        <div className={Styles.login}>
            <LoginHeader/>
            <Context.Provider value={state}>
                <FormLogin/>
            </Context.Provider>
            <Footer/>
        </div>
    );
};

export default Login
