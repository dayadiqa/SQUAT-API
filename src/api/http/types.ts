export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiEndpoint<TPayload = unknown, TResponse = unknown> {
    path: string;
    method: HttpMethod;
    contentType?: string;

    payload?: TPayload;
    response?: TResponse;
}
