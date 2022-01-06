import React from "react";
import faker from "faker";
import { Router } from "react-router-dom";
import 'jest-localstorage-mock';
import {cleanup, fireEvent, render, RenderResult, waitFor} from "@testing-library/react";
import Login from "@/presentation/pages/login/login";
import {ValidationStub} from "@/presentation/test";
import {AuthenticationSpy} from "@/presentation/test/mock-authentication";
import {InvalidCredentialsError} from "@/domain/errors/invalid-credentials-error";
import {createMemoryHistory} from "history";


type SutTypes = {
    sut: RenderResult
    validationStub: ValidationStub
    authenticationSpy: AuthenticationSpy
};

type SutParams = {
    validationError: string
};

const history = createMemoryHistory({
    initialEntries: ['/login'],
});

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    const authenticationSpy = new AuthenticationSpy();
    validationStub.errorMessage = params?.validationError;
    const sut = render(
        <Router location={history.location} navigator={history}>
            <Login validation={validationStub} authentication={authenticationSpy}/>
        </Router>
    );
    return {
        sut,
        validationStub,
        authenticationSpy
    }
};

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
    populateField(sut, 'email', email);
    populateField(sut, 'password', password);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitButton)
}

const populateField = (sut: RenderResult, fieldName: string, value: string): void => {
    const field = sut.getByTestId(fieldName) as HTMLInputElement;
    fireEvent.input(field, {target: {value}});
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const fieldStatus = sut.getByTestId(`${fieldName}-status`);
    expect(fieldStatus.title).toBe(validationError || 'Tudo Certo!');
    expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
}


describe('Login Component', function () {
    afterEach(cleanup)
    beforeEach(() => {
        localStorage.clear();
    })

    test('Should start with initial state', function () {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});

        const errorWrap = sut.getByTestId('error-wrap');
        expect(errorWrap.childElementCount).toBe(0);
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true);
        testStatusForField(sut, 'email', validationError);
        testStatusForField(sut, 'password', validationError);
    })

    test('Should show email error if Validation fails', function () {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});

        populateField(sut, 'email', faker.internet.email());
        testStatusForField(sut, 'email', validationError);
    })

    test('Should show password error if Validation fails', function () {
        const {sut, validationStub} = makeSut();
        validationStub.errorMessage = faker.random.words();
        populateField(sut, 'password', faker.internet.password());
        testStatusForField(sut, 'password', validationStub.errorMessage);
    })

    test('Should show valid email state if Validation succeeds', function () {
        const {sut} = makeSut();
        populateField(sut, 'email', faker.internet.email());
        testStatusForField(sut, 'email');
    })

    test('Should show valid password state if Validation succeeds', function () {
        const {sut} = makeSut();
        populateField(sut, 'password', faker.internet.password());
        testStatusForField(sut, 'password');
    })

    test('Should enable submit button if form is valid', function () {
        const {sut} = makeSut();
        const emailFaker = faker.internet.email();
        const passwordFaker = faker.internet.password();
        simulateValidSubmit(sut, emailFaker, passwordFaker);
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false);
    })

    test('Should show spinner on submit', function () {
        const {sut} = makeSut();
        simulateValidSubmit(sut);
        const loader = sut.getByTestId('spinner');
        expect(loader).toBeTruthy();
    })

    test('Should call Authentication with correct values', function () {
        const {sut, authenticationSpy} = makeSut();
        const emailFaker = faker.internet.email();
        const passwordFaker = faker.internet.password();
        simulateValidSubmit(sut, emailFaker, passwordFaker);
        expect(authenticationSpy.params).toEqual({email: emailFaker, password: passwordFaker})
    })

    test('Should call Authentication only once', function () {
        const {sut, authenticationSpy} = makeSut();
        simulateValidSubmit(sut);
        simulateValidSubmit(sut);
        expect(authenticationSpy.callsCount).toBe(1);
    })

    test('Should not call Authentication if form is invalid', function () {
        const validationError = faker.random.words();
        const {sut, authenticationSpy} = makeSut({validationError});
        fireEvent.submit(sut.getByTestId('form'));
        expect(authenticationSpy.callsCount).toBe(0);
    })

    test('Should present error if Authentication fails', async function () {
        const {sut, authenticationSpy} = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
        simulateValidSubmit(sut);
        const errorWrap = sut.getByTestId('error-wrap');
        await waitFor(() => errorWrap);
        const mainError = sut.getByTestId('main-error');
        expect(mainError.textContent).toBe(error.message);
        expect(errorWrap.childElementCount).toBe(1);
    })

    test('Should add accessToken to localStorage on success', async function () {
        const {sut, authenticationSpy} = makeSut();
        simulateValidSubmit(sut);
        await waitFor(() => sut.getByTestId('form'))
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken);
        expect(history.location.pathname).toBe('/');
    })

    test('Should go to signup page', function () {
        const {sut} = makeSut();
        const register = sut.getByTestId('signup');
        fireEvent.click(register);
        expect(history.location.pathname).toBe('/signup');
    })
});
