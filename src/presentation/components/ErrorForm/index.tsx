import * as React from 'react';
import Styles from "./error-styles.scss";
import Spinner from "@/presentation/components/spinner/spinner";
import Context from "@/presentation/components/context/form-context";
import {useContext} from "react";

export const ErrorForm = () => {

    const {state} = useContext(Context);
    const {isLoading, errorMessage} = state;

    return (
        <div data-testid={'error-wrap'} className={Styles.errorWrap}>
            {
                isLoading && <Spinner className={Styles.spinner}/>
            }
            {
                errorMessage && <span data-testid="main-error" className={Styles.error}>{errorMessage}</span>
            }
        </div>
    );
};
