import {Authentication, AuthenticationParams} from "@/domain/useCases/authentication";
import {mockAccountModel} from "@/domain/test/mock-account";
import {AccountModel} from "@/domain/Models/account-model";

export class AuthenticationSpy implements Authentication {
    account = mockAccountModel()
    params: AuthenticationParams
    callsCount = 0
    async auth (params: AuthenticationParams): Promise<AccountModel> {
        this.params = params
        this.callsCount++
        return Promise.resolve(this.account)
    }
}
