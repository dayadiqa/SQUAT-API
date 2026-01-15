import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import type { User } from "../../../src/api/mifx/payloads/users.payload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Save users data to CSV
 */
export async function saveUsersToCsv(users: User[], fileName: string) {
    if (users.length === 0) {
        throw new Error("Data kosong, tidak ada yang ditulis ke CSV");
    }

    const filePath = path.join(__dirname, fileName);

    const header = "first_name,last_name,email\n";

    const rows = users
        .map((u) =>
            [u.first_name, u.last_name, u.email]
                .map((v) => `"${String(v).replace(/"/g, "")}"`)
                .join(",")
        )
        .join("\n");

    const csvContent = header + rows + "\n";

    await writeFile(filePath, csvContent, "utf-8");
}
