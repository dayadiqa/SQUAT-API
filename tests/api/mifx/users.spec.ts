import { test, expect } from "@playwright/test";
import { UsersRequestHelper } from "./users.helper";
import { saveUsersToCsv } from "./csv.helper";

test(
    "A-01 Valid request with page=2",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "2"
        });

        expect(usersResponse.status).toBe(200);
    }
);

test(
    "A-02 Response content type",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "2"
        });

        expect(usersResponse.contentType).toContain("application/json");
    }
);

test(
    "A-03 Validate page value",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "2"
        });

        expect(usersResponse.data.page).toBe(2);
    }
);

test(
    "A-04 Validate per_page value",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "2"
        });

        expect(usersResponse.data.per_page).toBe(6);
    }
);

test(
    "A-05 Validate total users",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "2"
        });

        expect(usersResponse.data.total).toBe(12);
    }
);

test(
    "A-06 Validate total pages",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "2"
        });

        expect(usersResponse.data.total_pages).toBe(2);
    }
);

test(
    "A-07 Validate data array size",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "2"
        });

        expect(Array.isArray(usersResponse.data.data)).toBeTruthy();
        expect(usersResponse.data.data.length).toBe(6);
    }
);

test(
    "A-08 Validate user object structure",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "2"
        });

        usersResponse.data.data.forEach((user) => {
            expect(user).toHaveProperty("id");
            expect(user).toHaveProperty("email");
            expect(user).toHaveProperty("first_name");
            expect(user).toHaveProperty("last_name");
            expect(user).toHaveProperty("avatar");
        });
    }
);

test(
    "A-09 Validate user ID range",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "2"
        });

        const users = usersResponse.data.data;

        users.forEach((user) => {
            expect(user.id).toBeGreaterThanOrEqual(7);
            expect(user.id).toBeLessThanOrEqual(12);
        });
    }
);

test(
    "A-12 Missing page parameter",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: undefined
        });

        expect(usersResponse.status).toBe(200);
    }
);

test(
    "A-13 Page out of range",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "999"
        });

        expect(usersResponse.status).toBe(200);
        expect(Array.isArray(usersResponse.data.data)).toBeTruthy();
        expect(usersResponse.data.data.length).toBe(0);
    }
);

test(
    "A-14 Invalid page value (string)",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "abc"
        });

        expect(usersResponse.status).toBe(200);
        expect(Array.isArray(usersResponse.data.data)).toBeTruthy();
        expect(usersResponse.data.data.length).toBe(6);
    }
);

test(
    "A-15 Negative page value",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "-1"
        });

        expect(usersResponse.status).toBe(200);
        expect(Array.isArray(usersResponse.data.data)).toBeTruthy();
        expect(usersResponse.data.data.length).toBe(0);
    }
);

test(
    "A-18 Response time",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "2"
        });

        expect(usersResponse.responseTime).toBeLessThanOrEqual(2000);
    }
);

test(
    "Export users API to CSV @csv",
    {
        tag: "@mifx"
    },
    async ({ request }) => {
        const usersResponse = await UsersRequestHelper({
            request,
            page: "2"
        });

        await saveUsersToCsv(usersResponse.data.data, "users.csv");
    }
);
