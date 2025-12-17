import type { ApiEndpoint } from "../../http/types";
import { ContentType } from "../../http/contentType";
import type {
    LoginPayload,
    LoginResponse,
    MeResponse
} from "../payloads/users.payload";

export const AuthEndpoint = {
    login: {
        path: "/user/login",
        method: "POST",
        contentType: ContentType.JSON
    } as ApiEndpoint<LoginPayload, LoginResponse>,

    me: {
        path: "/user/me",
        method: "GET",
        requiresAuth: true
    } as ApiEndpoint<void, MeResponse>
};
