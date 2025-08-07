import { drizzle } from 'drizzle-orm/libsql';

// Create a single instance of the database for the entire application.
// This is more efficient than creating a new connection for every request.
const db = drizzle(process.env.DB_FILE_NAME!);

/**
 * Returns the singleton database instance.
 */
export function useDatabase() {
    return db;
}

