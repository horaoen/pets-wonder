import { drizzle } from "drizzle-orm/libsql";

export function useDatabase() {
    return drizzle(process.env.DB_FILE_NAME!)
}
