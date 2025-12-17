import { test, expect } from "@playwright/test";
import { ApiClient } from "../../../src/api/client/apiClient";
import { AuthEndpoint } from "../../../src/api/dummyJson/endpoints/users.endpoint";
import {
    LoginResponseSchema,
    MeResponseSchema
} from "../../../src/api/dummyJson/schemas/users.schema";

test(
    "login api - validate response schema",
    { tag: "@coba" },
    async ({ request }) => {
        const api = new ApiClient(request);

        const loginResponse = await api.send(
            AuthEndpoint.login,
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
            MeResponseSchema
        );

        expect(meResponse.username).toBe("emilys");
    }
);
