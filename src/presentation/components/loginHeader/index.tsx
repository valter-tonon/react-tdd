import * as React from 'react';
import Styles from "./login-header-styles.scss";
import {Logo} from "@/presentation/components/logo";

const LoginHeader = () => {
    return (
        <header className={Styles.header}>
            <Logo/>
            <h1>4Devs Enquete para programadores</h1>
        </header>
    );
};

export default LoginHeader;
