export enum HttpStatusCode {
    unauthorized = 401,
    badRequest = 400,
    noContent = 204,
    ok = 200,
    notFound = 404,
    internalServerError = 500,
}

export type HttpResponse<T> = {
    statusCode: HttpStatusCode;
    body?: any;
}
