import React from "react";
import Login from "@/presentation/pages/login/login";
import {makeRemoteAuthentication} from "@/main/factories/use-cases/authentication/remote-authentication-factory";
import {makeLoginValidationComposite} from "@/main/factories/pages/login/login-validation-factory";

export const MakeLogin : React.FC =  () => {
    return (
        <>
            <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidationComposite()}/>
        </>
    )
}
