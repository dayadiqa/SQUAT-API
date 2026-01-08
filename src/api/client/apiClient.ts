import type { APIRequestContext } from "@playwright/test";
import type { ApiEndpoint } from "../http/types";
import { getBaseUrl } from "../../config/env";
import type { ZodType } from "zod";
import { ZodError } from "zod";

type FetchOptions = Parameters<APIRequestContext["fetch"]>[1];
type QueryParams = Record<string, string | number | boolean | null | void>;

export class ApiClient {
    private token?: string;

    constructor(private request: APIRequestContext) {}

    setToken(token: string) {
        this.token = token;
    }

    async send<TQuery extends QueryParams | void, TPayload, TResponse>(
        endpoint: ApiEndpoint<TQuery, TPayload, TResponse>,
        query?: TQuery,
        payload?: TPayload,
        responseSchema?: ZodType<TResponse>
    ): Promise<TResponse> {
        const headers: Record<string, string> = {};

        if (endpoint.contentType) {
            headers["Content-Type"] = endpoint.contentType;
        }

        if (endpoint.requiresAuth) {
            if (!this.token) {
                throw new Error(
                    `Authorization token is missing for ${endpoint.path}`
                );
            }

            headers["Authorization"] = `Bearer ${this.token}`;
        }

        const queryString =
            query && Object.keys(query).length > 0
                ? `?${new URLSearchParams(
                      Object.entries(query).reduce<Record<string, string>>(
                          (acc, [key, value]) => {
                              if (value !== undefined && value !== null) {
                                  acc[key] = String(value);
                              }
                              return acc;
                          },
                          {}
                      )
                  ).toString()}`
                : "";

        const url = `${getBaseUrl()}${endpoint.path}${queryString}`;

        const options: FetchOptions = {
            method: endpoint.method,
            ...(payload && { data: payload })
        };

        const response = await this.request.fetch(url, options);

        const status = response.status();
        const responseBody = (await response.json()) as TResponse;

        // === PRINT RESPONSE ===
        console.log("=== API RESPONSE ===");
        console.log("Method:", endpoint.method);
        console.log("URL:", url);
        console.log("Status:", status);
        console.log("Body:", responseBody, "\n");

        if (!response.ok()) {
            throw new Error(
                `[${endpoint.method}] ${endpoint.path} failed: ${status}`
            );
        }

        if (responseSchema) {
            try {
                responseSchema.parse(responseBody);
            } catch (error) {
                if (error instanceof ZodError) {
                    console.error("Zod Validation Error:", error.issues);
                    throw new Error(
                        `Response schema validation failed for ${endpoint.path}`
                    );
                }
                throw error;
            }
        }

        return responseBody;
    }
}
