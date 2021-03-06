import {HttpPostClient} from "../../protocols/http/http-post-client";
import {Authentication, AuthenticationParams} from "@/domain/useCases/authentication";
import {HttpStatusCode} from "@/data/protocols/http/http-response";
import {InvalidCredentialsError} from "@/domain/errors/invalid-credentials-error";
import {UnexpectedError} from "@/domain/errors/unexpected-error";
import {AccountModel} from "@/domain/Models/account-model";

export class RemoteAuthentication implements Authentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
    ) {}

    async auth (params: AuthenticationParams): Promise<AccountModel> {
        const httpResponse = await this.httpPostClient.post({
            url: this.url, body: params
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return httpResponse.body
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError()
            default:
                throw new UnexpectedError()
        }
    }
}
