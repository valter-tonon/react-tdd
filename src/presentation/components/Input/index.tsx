import * as React from 'react';
import Styles from "./input-component-styles.scss";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export const Input : React.FC<Props> = (props: Props) => {
    const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        event.target.readOnly = false;
    };
    return (
        <div className={Styles.inputWrap}>
            <input {...props} readOnly onFocus={enableInput}/>
            <span className={Styles.status}>🔴</span>
        </div>
    );
};
