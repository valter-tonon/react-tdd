import {RemoteAuthentication} from "./remote-authentication";
import {HttpPostClientSpy} from "../../test/mock-http-client";
import faker from "faker";
import {InvalidCredentialsError} from "@/domain/errors/invalid-credentials-error";
import {HttpStatusCode} from "@/data/protocols/http/http-response";
import {UnexpectedError} from "@/domain/errors/unexpected-error";
import {AuthenticationParams} from "@/domain/useCases/authentication";
import {AccountModel} from "@/domain/Models/account-model";
import {mockAccountModel, mockAuthentication} from "@/domain/test/mock-account";

type SutTypes = {
    sut: RemoteAuthentication;
    httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy =new HttpPostClientSpy<AuthenticationParams, AccountModel>()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
};

describe('RemoteAuthentication', () => {
    test('should call httpPostClient with correct URL', async() => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })
    test('should call httpPostClient with correct body', async() => {
        const { sut, httpPostClientSpy } = makeSut()
        const authenticationParams = mockAuthentication()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })
    test('should InvalidCredentialError if HttpPostClient return 401', async() => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unauthorized,
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
    test('should throw Unespected error if HttpPostClient return 400', async() => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest,
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('should throw Unespected error if HttpPostClient return 500', async() => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.internalServerError,
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('should throw Unespected error if HttpPostClient return 404', async() => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound,
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('should return an AccountModels if HttpPostClient returns 200', async() => {
        const { sut, httpPostClientSpy } = makeSut()
        const httpResult = mockAccountModel()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        }
        const account = await sut.auth(mockAuthentication())
        expect(account).toEqual(httpResult)
    })
})
