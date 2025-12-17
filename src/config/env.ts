import dotenv from "dotenv";

if (process.env.NODE_ENV !== "ci") {
    dotenv.config();
}

type EnvName = "DUMMY_JSON";

function getEnvName(): EnvName {
    const env = process.env.ENV;

    if (env === "DUMMY_JSON") {
        return env;
    }

    throw new Error(`Invalid or missing ENV: ${env}`);
}

const ENV = getEnvName();

const BASE_URL_MAP: Record<EnvName, string> = {
    DUMMY_JSON: (() => {
        const url = process.env.DUMMY_JSON_BASE_URL;
        if (!url) {
            throw new Error("DUMMY_JSON_BASE_URL is not defined");
        }
        return url;
    })()
};

export function getBaseUrl(): string {
    return BASE_URL_MAP[ENV];
}
