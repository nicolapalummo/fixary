import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;


const connectionString = process.env.DATABASE_URL;

// Debug logging for connection string (masked)
if (!connectionString) {
    console.error("DB Config Error: DATABASE_URL is not defined.");
} else {
    // Mask password for logs: postgres://user:*****@host:port/db
    const masked = connectionString.replace(/:([^:@]+)@/, ':*****@');
    console.log(`DB Config: Found connection string: ${masked}`);
}

// Check if we are using an internal Railway address
const isInternal = connectionString && connectionString.includes('railway.internal');

const pool = new Pool({
    connectionString: connectionString,
    ssl: isInternal ? false : { rejectUnauthorized: false }
});

console.log(`DB Config: SSL is ${isInternal ? 'DISABLED (Internal Network)' : 'ENABLED (External/Default)'}`);

export const query = (text, params) => pool.query(text, params);
