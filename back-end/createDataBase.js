// Import necessary modules
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

// Set the database path
const dbPath = path.join(__dirname, 'todoApplication.db');

const initializeDatabase = async () => {
    try {
        // Open a database connection
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        // Create the 'todo' table if it doesn't exist
        await db.exec(`
            CREATE TABLE IF NOT EXISTS todo (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                todo TEXT NOT NULL,
                priority TEXT NOT NULL,
                status TEXT NOT NULL,
                category TEXT NOT NULL,
                due_date TEXT NOT NULL
            );
        `);

        console.log('Database and table created successfully!');

        // Optionally, insert sample data
        await db.run(`
            INSERT INTO todo (todo, priority, status, category, due_date) VALUES
            ('Learn React', 'HIGH', 'TO DO', 'LEARNING', '2024-09-30'),
            ('Complete Project', 'MEDIUM', 'IN PROGRESS', 'WORK', '2024-10-05'),
            ('Grocery Shopping', 'LOW', 'DONE', 'HOME', '2024-09-28');
        `);

        console.log('Sample data inserted successfully!');

        // Close the database connection
        await db.close();
    } catch (error) {
        console.error('Error creating database:', error);
    }
};

// Call the function to initialize the database
initializeDatabase();
