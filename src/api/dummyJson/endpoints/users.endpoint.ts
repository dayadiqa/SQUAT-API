import type { ApiEndpoint } from "../../http/types";
import { ContentType } from "../../http/contentType";
import type {
    LoginPayload,
    LoginResponse,
    MeResponse,
    RefreshPayload,
    RefreshResponse
} from "../payloads/users.payload";

export const AuthEndpoint = {
    login: {
        path: "/user/login",
        method: "POST",
        contentType: ContentType.JSON
    } as ApiEndpoint<void, LoginPayload, LoginResponse>,

    me: {
        path: "/user/me",
        method: "GET",
        requiresAuth: true
    } as ApiEndpoint<void, void, MeResponse>,

    refresh: {
        path: "/auth/refresh",
        method: "POST",
        contentType: ContentType.JSON
    } as ApiEndpoint<void, RefreshPayload, RefreshResponse>
};
