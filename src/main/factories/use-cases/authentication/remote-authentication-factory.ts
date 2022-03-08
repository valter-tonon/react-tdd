import {RemoteAuthentication} from "@/data/useCases/authentication/remote-authentication";
import {Authentication} from "@/domain/useCases/authentication";
import {makeAxiosHttpClient} from "@/main/factories/http/axios-http-client-factory";
import {makeApiUrl} from "@/main/factories/http/api-url-factory";

export const makeRemoteAuthentication = (): Authentication => {
    const url = makeApiUrl('/login')
    return new RemoteAuthentication(url, makeAxiosHttpClient());
};
