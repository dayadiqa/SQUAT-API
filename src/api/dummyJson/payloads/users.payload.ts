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

export interface MeResponse {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: Gender;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string; // ISO-like date string
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: string;
}

export interface Hair {
    color: string;
    type: string;
}

export interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

export interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
}

export interface Crypto {
    coin: string;
    wallet: string;
    network: string;
}

export type Credentials = "include";

export interface RefreshPayload {
    refreshToken?: string;
    expiresInMins?: number;
    credentials: Credentials;
}

export interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}
