import { test } from "@playwright/test";
import { ApiClient } from "../../../src/api/client/apiClient";
import { AuthEndpoint } from "../../../src/api/dummyJson/endpoints/users.endpoint";

test(
    "login api",
    {
        tag: "@coba"
    },
    async ({ request }) => {
        const api = new ApiClient(request);

        await api.send(AuthEndpoint.login, {
            username: "emilys",
            password: "emilyspass",
            expiresInMins: 30
        });
    }
);
