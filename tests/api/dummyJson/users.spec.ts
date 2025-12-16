import { test, expect } from "@playwright/test";
import { ApiClient } from "../../../src/api/client/apiClient";
import { AuthEndpoint } from "../../../src/api/dummyJson/endpoints/users.endpoint";
import { LoginResponseSchema } from "../../../src/api/dummyJson/schemas/users.schema";

test(
    "login api - validate response schema",
    { tag: "@coba" },
    async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.send(
            AuthEndpoint.login,
            {
                username: "emilys",
                password: "emilyspass",
                expiresInMins: 30
            },
            LoginResponseSchema
        );

        // optional business assertion
        expect(response.username).toBe("emilys");
        expect(response.accessToken).toBeTruthy();
    }
);
