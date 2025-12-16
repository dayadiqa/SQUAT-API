import { z } from "zod";

export const GenderSchema = z.enum(["male", "female"]);

export const LoginResponseSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.email(),
    firstName: z.string(),
    lastName: z.string(),
    gender: GenderSchema,
    image: z.url(),
    accessToken: z.string().min(1),
    refreshToken: z.string().min(1)
});
