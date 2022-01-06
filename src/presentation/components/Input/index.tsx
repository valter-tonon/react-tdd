import * as React from 'react';
import Styles from "./input-component-styles.scss";
import Context from "@/presentation/components/context/form-context";
import {useContext} from "react";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export const Input : React.FC<Props> = (props: Props) => {
    const {state, setState} = useContext(Context)
    const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        event.target.readOnly = false;
    };

    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    };
    const error = state[`${props.name}Error`];

    const getStatus = (): string => {
        return error ? '🔴' : '🟢';
    };

    const getTitle = (): string => {
        return error || 'Tudo Certo!';
    };

    return (
        <div className={Styles.inputWrap}>
            <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange}/>
            <span data-testid={`${props.name}-status`}  title={getTitle()} className={Styles.status}>{getStatus()}</span>
        </div>
    );
};
