import type { ApiEndpoint } from "../../http/types";
import { ContentType } from "../../http/contentType";
import type {
    UsersPaginationQuery,
    UsersResponse
} from "../payloads/users.payload";

export const UsersEndpoint = {
    users: {
        path: "/api/users",
        method: "GET",
        contentType: ContentType.JSON,
        requiresApiKey: true
    } as ApiEndpoint<UsersPaginationQuery, void, UsersResponse>
};
