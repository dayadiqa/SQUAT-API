import type { ApiEndpoint } from "../../http/types";
import { ContentType } from "../../http/contentType";
import type { LoginPayload, LoginResponse } from "../payloads/users.payload";

export const AuthEndpoint = {
    login: {
        path: "/user/login",
        method: "POST",
        contentType: ContentType.JSON
    } as ApiEndpoint<LoginPayload, LoginResponse>
};
