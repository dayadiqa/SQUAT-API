export interface LoginPayload {
    username: string;
    password: string;
    /**
     * Optional, default 60 minutes
     */
    expiresInMins?: number;
}

export type Gender = "male" | "female";

export interface LoginResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    image: string;
    accessToken: string;
    refreshToken: string;
}
