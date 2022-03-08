import {Input} from "@/presentation/components/Input/index";
import {fireEvent, render, RenderResult} from "@testing-library/react";
import React from "react"
import Context from "@/presentation/components/context/form-context";

const makeSut = (): RenderResult => {
    return render(
        <Context.Provider value={{state: {}}}>
            <Input name={'field'}/>
        </Context.Provider>
    );
}

describe('Input Component', function () {
    test('Should begin with readOnly', () => {
        const sut = makeSut();
        const input = sut.getByTestId('field') as HTMLInputElement;
        expect(input.readOnly).toBe(true);
    });
});
describe('Input Component', function () {
    test('Should begin with readOnly', () => {
        const sut = makeSut();
        const input = sut.getByTestId('field') as HTMLInputElement;
        fireEvent.focus(input);
        expect(input.readOnly).toBe(false);
    });
});

