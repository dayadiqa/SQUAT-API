import type { APIRequestContext } from "@playwright/test";
import type { ApiEndpoint } from "../http/types";
import { getBaseUrl } from "../../config/env";
import type { ZodType } from "zod";
import { ZodError } from "zod";

type FetchOptions = Parameters<APIRequestContext["fetch"]>[1];

export class ApiClient {
    private token?: string;

    constructor(private request: APIRequestContext) {}

    setToken(token: string) {
        this.token = token;
    }

    async send<TPayload, TResponse>(
        endpoint: ApiEndpoint<TPayload, TResponse>,
        payload?: TPayload,
        responseSchema?: ZodType<TResponse>
    ): Promise<TResponse> {
        const headers: Record<string, string> = {};

        // Content-Type
        if (endpoint.contentType) {
            headers["Content-Type"] = endpoint.contentType;
        }

        // 🔐 Authorization (hanya jika endpoint butuh auth)
        if (endpoint.requiresAuth) {
            if (!this.token) {
                throw new Error(
                    `Authorization token is missing for ${endpoint.path}`
                );
            }

            headers["Authorization"] = `Bearer ${this.token}`;
        }

        const options: FetchOptions = {
            method: endpoint.method,
            ...(payload && { data: payload })
        };

        const url = `${getBaseUrl()}${endpoint.path}`;

        const response = await this.request.fetch(url, options);

        const status = response.status();
        const responseBody = (await response.json()) as TResponse;

        // === PRINT RESPONSE ===
        console.log("\n=== API RESPONSE ===");
        console.log("Method:", endpoint.method);
        console.log("URL:", url);
        console.log("Status:", status);
        console.log("Body:", responseBody);
        console.log("====================");

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
                    console.error("❌ Zod Validation Error:", error.issues);
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
