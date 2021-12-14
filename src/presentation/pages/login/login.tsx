import * as React from 'react';
import Styles from './login-styles.scss'
import LoginHeader from "@/presentation/components/loginHeader";
import {FormLogin} from "@/presentation/components/FormLogin";
import {Footer} from "@/presentation/components/Footer";



const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <LoginHeader/>
            <FormLogin/>
            <Footer/>
        </div>
    );
};

export default Login
