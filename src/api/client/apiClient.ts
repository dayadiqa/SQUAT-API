import type { APIRequestContext } from "@playwright/test";
import type { ApiEndpoint } from "../http/types";
import { getBaseUrl } from "../../config/env";
import type { ZodType } from "zod";
import { ZodError } from "zod";

type FetchOptions = Parameters<APIRequestContext["fetch"]>[1];
type QueryParams = Record<string, string | number | boolean | null | void>;

export interface ApiResponse<T> {
    status: number;
    data: T;
    contentType?: string;
    responseTime: number;
}

export class ApiClient {
    private token?: string;
    private apiKey?: string;

    constructor(private request: APIRequestContext) {}

    setToken(token: string) {
        this.token = token;
    }

    setApiKey(apiKey: string) {
        this.apiKey = apiKey;
    }

    async send<TQuery extends QueryParams | void, TPayload, TResponse>(
        endpoint: ApiEndpoint<TQuery, TPayload, TResponse>,
        query?: TQuery,
        payload?: TPayload,
        responseSchema?: ZodType<TResponse>
    ): Promise<ApiResponse<TResponse>> {
        const headers: Record<string, string> = {
            Accept: "application/json, text/html;q=0.9,*/*;q=0.8"
        };

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

        if (endpoint.requiresApiKey) {
            if (!this.apiKey) {
                throw new Error(`API key is missing for ${endpoint.path}`);
            }

            const headerName = endpoint.apiKeyHeaderName ?? "x-api-key";
            headers[headerName] = this.apiKey;
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
            headers,
            ...(payload && { data: payload })
        };

        const startTime = Date.now();

        const response = await this.request.fetch(url, options);

        const responseTime = Date.now() - startTime;

        const status = response.status();

        const contentType = response.headers()["content-type"] ?? "";

        let responseBody: unknown;

        if (contentType.includes("application/json")) {
            responseBody = await response.json();
        } else {
            responseBody = await response.text();
        }

        // === PRINT RESPONSE ===
        // console.log("=== API RESPONSE ===");
        // console.log("Method:", endpoint.method);
        // console.log("URL:", url);
        // console.log("Status:", status);
        // console.log("Content-Type:", contentType);
        // console.log("Body:", responseBody, "\n");

        if (!response.ok()) {
            throw new Error(
                `[${endpoint.method}] ${endpoint.path} failed: ${status}`
            );
        }

        if (responseSchema && contentType.includes("application/json")) {
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

        return {
            status,
            contentType,
            data: responseBody as TResponse,
            responseTime
        };
    }
}
