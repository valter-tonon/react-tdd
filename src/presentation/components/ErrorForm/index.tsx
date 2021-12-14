import * as React from 'react';
import Styles from "./error-styles.scss";
import Spinner from "@/presentation/components/spinner/spinner";

type Props = {

};
export const ErrorForm = (props: Props) => {
    return (
        <div className={Styles.errorWrap}>
            <Spinner className={Styles.spinner}/>
            <span className={Styles.error}>Erro</span>
        </div>
    );
};
