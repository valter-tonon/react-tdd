import {AxiosHttpClient} from "@/infra/http/axios-http-client/axios-http-client";
import axios from "axios";
import {mockAxios} from "@/infra/test/mock-axios";
import {mockPostRequest} from "@/data/test/mock-http-post";

jest.mock("axios");

type SutTypes = {
    sut: AxiosHttpClient;
    mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
    const sut =  new AxiosHttpClient();
    const mockedAxios = mockAxios();
    return {
        sut,
        mockedAxios
    };
};

describe('AxiosHttpClient', () => {
    test('Should call axios with correct values', async () => {
        const request = mockPostRequest();
        const {sut, mockedAxios} = makeSut()
        await sut.post(request);
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })
    test('Should return the correct statusCode and body',() => {
        const request = mockPostRequest();
        const {sut, mockedAxios} = makeSut()
        const promise = sut.post(request);
        expect(promise).toEqual(mockedAxios.post.mock.results[0].value as any)
    })

    test('Should return the correct statusCode and body on failure',  () => {
        const {sut, mockedAxios} = makeSut()
        mockedAxios.post.mockRejectedValueOnce({
            response: {
                status: 500,
                data: {
                    message: 'error'
                }
            }
        })
        const promise = sut.post(mockPostRequest());
        expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
})
