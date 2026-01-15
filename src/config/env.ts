import dotenv from "dotenv";

if (process.env.NODE_ENV !== "ci") {
    dotenv.config();
}

type EnvName = "DUMMY_JSON" | "MIFX_TEST";

function getEnvName(): EnvName {
    const env = process.env.ENV;

    if (env === "DUMMY_JSON" || env === "MIFX_TEST") {
        return env;
    }

    throw new Error(`Invalid or missing ENV: ${env}`);
}

const BASE_URL_MAP: Record<EnvName, string> = {
    DUMMY_JSON: process.env.DUMMY_JSON_BASE_URL!,
    MIFX_TEST: process.env.MIFX_TEST_BASE_URL!
};

export function getBaseUrl(): string {
    const env = getEnvName();
    return BASE_URL_MAP[env];
}
