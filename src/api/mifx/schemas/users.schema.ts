import { z } from "zod";

export const UserSchema = z.object({
    id: z.number(),
    email: z.email(),
    first_name: z.string(),
    last_name: z.string(),
    avatar: z.url()
});

export const SupportSchema = z.object({
    url: z.url(),
    text: z.string()
});

export const MetaCTASchema = z.object({
    label: z.string(),
    url: z.url()
});

export const MetaSchema = z.object({
    powered_by: z.string(),
    docs_url: z.url(),
    upgrade_url: z.url(),
    example_url: z.url(),
    variant: z.string(),
    message: z.string(),
    cta: MetaCTASchema,
    context: z.string()
});

export const UsersResponseSchema = z.object({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number(),
    data: z.array(UserSchema),
    support: SupportSchema,
    _meta: MetaSchema
});
