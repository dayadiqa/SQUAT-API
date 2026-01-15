import type { APIRequestContext } from "@playwright/test";
import { ApiClient } from "../../../src/api/client/apiClient";
import { UsersEndpoint } from "../../../src/api/mifx/endpoints/users.endpoint";
import { UsersResponseSchema } from "../../../src/api/mifx/schemas/users.schema";

type UsersHelperQueryParams = {
    request: APIRequestContext;
    page?: string;
};

export async function UsersRequestHelper({
    request,
    page = "1"
}: UsersHelperQueryParams) {
    const api = new ApiClient(request);

    if (!process.env.REQRES_API_KEY) {
        throw new Error("REQRES_API_KEY is not defined in .env");
    }

    api.setApiKey(process.env.REQRES_API_KEY);

    return await api.send(
        UsersEndpoint.users,
        { page },
        undefined,
        UsersResponseSchema
    );
}
