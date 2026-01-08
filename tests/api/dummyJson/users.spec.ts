import { test, expect } from "@playwright/test";
import { ApiClient } from "../../../src/api/client/apiClient";
import { AuthEndpoint } from "../../../src/api/dummyJson/endpoints/users.endpoint";
import {
    LoginResponseSchema,
    MeResponseSchema,
    RefreshResponseSchema
} from "../../../src/api/dummyJson/schemas/users.schema";

test(
    "Login and user auth-me api - validate business and response schema @users",
    { tag: "@high" },
    async ({ request }) => {
        const api = new ApiClient(request);

        const loginResponse = await api.send(
            AuthEndpoint.login,
            undefined,
            {
                username: "emilys",
                password: "emilyspass",
                expiresInMins: 30
            },
            LoginResponseSchema
        );

        api.setToken(loginResponse.accessToken);

        // optional business assertion
        expect(loginResponse.username).toBe("emilys");
        expect(loginResponse.accessToken).toBeTruthy();

        const meResponse = await api.send(
            AuthEndpoint.me,
            undefined,
            undefined,
            MeResponseSchema
        );

        expect(meResponse.username).toBe("emilys");
    }
);

test(
    "Auth refresh api @users",
    {
        tag: "@high"
    },
    async ({ request }) => {
        const api = new ApiClient(request);

        const loginResponse = await api.send(AuthEndpoint.login, undefined, {
            username: "emilys",
            password: "emilyspass",
            expiresInMins: 30
        });

        const refreshToken = loginResponse.refreshToken;

        await api.send(
            AuthEndpoint.refresh,
            undefined,
            {
                refreshToken: refreshToken,
                expiresInMins: 30,
                credentials: "include"
            },
            RefreshResponseSchema
        );
    }
);
