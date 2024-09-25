const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const cookieParser = require('cookie-parser'); // Import cookie-parser

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

const dbPath = path.join(__dirname, 'todoApplication.db');
let db = null;

app.get('/', (req, res) => {
    res.send('Welcome to the Todo Application API! Use /signup to register and /login to log in.');
});

const JWT_SECRET = 'jwt_secretkey';

const initializingDBserver = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);

        app.listen(3000, () => {
            console.log('Server is running at http://localhost:3000/');
        });
    } catch (e) {
        console.log(e.message);
    }
};

initializingDBserver();

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Access the token from cookies

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        req.user = user; // Attach user info to request
        next();
    });
};

// (Keep your existing request validation middleware here...)

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    console.log("Received signup request:", username); // Log the username

    try {
        const existingUser = await db.get('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser) {
            console.log("User already exists"); // Log this
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        console.log("User registered successfully"); // Log successful registration
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error("Error during registration:", error.message); // Log error
        res.status(500).send('Internal Server Error');
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, JWT_SECRET);
        res.cookie('token', token, { httpOnly: true, secure: false }); // Set the token in a cookie
        return res.status(200).send('Login successful'); // Send a success response
    } else {
        res.sendStatus(403); // Forbidden
    }
});


// API-1: Get all todos
app.get('/todos/',authenticateToken, checkRequestsQueries, async (request, response) => {
    const { status = '', search_q = '', priority = '', category = '' } = request;

    const getTodoQuery = `
      SELECT id, todo, priority, status, category, due_date AS dueDate
      FROM todo
      WHERE todo LIKE ? AND priority LIKE ? AND status LIKE ? AND category LIKE ?
    `;

    try {
        const todoAll = await db.all(getTodoQuery, [`%${search_q}%`, `%${priority}%`, `%${status}%`, `%${category}%`]);
        response.send(todoAll);
    } catch (error) {
        response.status(500).send('Internal Server Error');
    }
});

// API-2: Get a todo by ID
app.get('/todos/:todoId/',authenticateToken, checkRequestsQueries, async (request, response) => {
    const { todoId } = request.params;
    const getTodoQueryId = `
    SELECT id, todo, priority, status, category, due_date AS dueDate
    FROM todo
    WHERE 
    id = ${todoId}
    `;
    const todoget = await db.get(getTodoQueryId);
    if (todoget) {
        response.send(todoget);
    } else {
        response.status(404).send('Todo Not Found');
    }
});

// API-3: Get all todos due on a specific date
app.get('/agenda/',authenticateToken, checkRequestsQueries, async (request, response) => {
    const { date } = request;
    const selectedTodoQuery = `
    SELECT id, todo, priority, status, category, due_date AS dueDate
    FROM todo
    WHERE 
    due_date = '${date}'
    `;
    const datetodo = await db.all(selectedTodoQuery);
    if (datetodo.length > 0) {
        response.send(datetodo);
    } else {
        response.status(400).send('Invalid Due Date');
    }
});

// API-4: Create a new todo
app.post('/todos/',authenticateToken, checkRequestsBody, async (request, response) => {
    const { id, todo, priority, status, category, dueDate } = request.body;

    // Validate required fields
    if (!todo) {
        return response.status(400).send({ message: 'Todo is required' });
    }

    const addTodoQuery = `
      INSERT INTO 
      todo (id, todo, priority, status, category, due_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
        await db.run(addTodoQuery, [id, todo, priority, status, category, dueDate]);
        response.status(201).send({ message: 'Todo Successfully Added' });
    } catch (error) {
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

// API-5: Update a todo by todoId
app.put('/todos/:todoId/',authenticateToken, checkRequestsBody, async (request, response) => {
    const { todoId } = request.params;
    const { todo, priority, status, category, dueDate } = request.body;

    let updateQueries = [];

    if (status) updateQueries.push(`status = ?`);
    if (priority) updateQueries.push(`priority = ?`);
    if (todo) updateQueries.push(`todo = ?`);
    if (category) updateQueries.push(`category = ?`);
    if (dueDate) updateQueries.push(`due_date = ?`);

    if (updateQueries.length === 0) {
        return response.status(400).send({ message: 'No fields to update' });
    }

    const updatedTodoQuery = `
      UPDATE todo
      SET ${updateQueries.join(', ')}
      WHERE id = ?
    `;

    try {
        await db.run(updatedTodoQuery, [...Object.values(request.body), todoId]);
        response.send({ message: 'Todo Updated' });
    } catch (error) {
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

// API-6: Delete a todo by todoId
app.delete('/todos/:todoId/', async (request, response) => {
    const { todoId } = request.params;
    const deleteTodoQuery = `
      DELETE FROM todo
      WHERE id = ?
    `;

    try {
        await db.run(deleteTodoQuery, [todoId]);
        response.status(204).send();
    } catch (error) {
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = app;