import {AuthenticationParams} from "domain/useCases/authentication";
import * as faker from "faker";
import {AccountModel} from "@/domain/Models/account-model";

export const mockAuthentication = (): AuthenticationParams => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
})

export const mockAccountModel = (): AccountModel => ({
    accessToken: faker.datatype.uuid(),
})
