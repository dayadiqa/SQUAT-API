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

export const CoordinatesSchema = z.object({
    lat: z.number(),
    lng: z.number()
});

export const AddressSchema = z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    stateCode: z.string(),
    postalCode: z.string(),
    coordinates: CoordinatesSchema,
    country: z.string()
});

export const HairSchema = z.object({
    color: z.string(),
    type: z.string()
});

export const BankSchema = z.object({
    cardExpire: z.string(), // "05/28"
    cardNumber: z.string(), // keep string (very large number)
    cardType: z.string(),
    currency: z.string(),
    iban: z.string()
});

export const CompanySchema = z.object({
    department: z.string(),
    name: z.string(),
    title: z.string(),
    address: AddressSchema
});

export const CryptoSchema = z.object({
    coin: z.string(),
    wallet: z.string(),
    network: z.string()
});

export const MeResponseSchema = z.object({
    id: z.number(),

    firstName: z.string(),
    lastName: z.string(),
    maidenName: z.string(),

    age: z.number().int(),
    gender: GenderSchema,

    email: z.email(),
    phone: z.string(),

    username: z.string(),
    password: z.string(),

    birthDate: z.string(), // could be refined to date format

    image: z.url(),

    bloodGroup: z.string(),

    height: z.number(),
    weight: z.number(),

    eyeColor: z.string(),
    hair: HairSchema,

    ip: z.string(),

    address: AddressSchema,

    macAddress: z.string(),

    university: z.string(),

    bank: BankSchema,

    company: CompanySchema,

    ein: z.string(),
    ssn: z.string(),

    userAgent: z.string(),

    crypto: CryptoSchema,

    role: z.string()
});

export const RefreshResponseSchema = z.object({
    accessToken: z.string().min(1, "accessToken is required"),
    refreshToken: z.string().min(1, "refreshToken is required")
});
