import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Initialize database table
const initDb = async () => {
    try {
        await query(`
      CREATE TABLE IF NOT EXISTS waitlist_emails (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('Database table initialized');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};

initDb();

// API Endpoint to add email to waitlist
app.post('/api/waitlist', async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
        const result = await query(
            'INSERT INTO waitlist_emails (email) VALUES ($1) RETURNING *',
            [email]
        );
        res.status(201).json({ message: 'Email added to waitlist', data: result.rows[0] });
    } catch (err) {
        if (err.code === '23505') { // Unique violation
            return res.status(409).json({ error: 'Email already in waitlist' });
        }
        console.error('Error adding email to waitlist:', err);
        // debug: return full error details
        res.status(500).json({
            error: `DB_ERR: ${err.message || 'Unknown error'}`,
            details: JSON.stringify(err, Object.getOwnPropertyNames(err))
        });
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (!process.env.DATABASE_URL) {
        console.error("CRITICAL: DATABASE_URL is missing!");
    } else {
        console.log("DATABASE_URL is found.");
    }
});
