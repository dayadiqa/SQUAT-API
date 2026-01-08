export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiEndpoint<
    TQuery = unknown,
    TPayload = unknown,
    TResponse = unknown
> {
    path: string;
    query?: TQuery;
    method: HttpMethod;
    contentType?: string;
    requiresAuth?: boolean;

    payload?: TPayload;
    response?: TResponse;
}
