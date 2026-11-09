
const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Database connection
const db = new Database(path.join(__dirname, "students.db"));

// Create students table
db.exec(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        course TEXT NOT NULL
    )
`);

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// READ: Get all students
app.get("/api/students", (req, res) => {
    try {
        const students = db.prepare(
            "SELECT * FROM students ORDER BY id DESC"
        ).all();

        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve students." });
    }
});

// CREATE: Add student
app.post("/api/students", (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            error: "All fields are required."
        });
    }

    try {
        const result = db.prepare(`
            INSERT INTO students (name, email, course)
            VALUES (?, ?, ?)
        `).run(name.trim(), email.trim(), course.trim());

        res.status(201).json({
            message: "Student added successfully.",
            id: result.lastInsertRowid
        });

    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                error: "Email already exists."
            });
        }

        res.status(500).json({ error: "Failed to add student." });
    }
});

// UPDATE: Update student
app.put("/api/students/:id", (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            error: "All fields are required."
        });
    }

    try {
        const result = db.prepare(`
            UPDATE students
            SET name = ?, email = ?, course = ?
            WHERE id = ?
        `).run(name.trim(), email.trim(), course.trim(), req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({
                error: "Student not found."
            });
        }

        res.json({ message: "Student updated successfully." });

    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                error: "Email already exists."
            });
        }

        res.status(500).json({ error: "Failed to update student." });
    }
});

// DELETE: Delete student
app.delete("/api/students/:id", (req, res) => {
    try {
        const result = db.prepare(
            "DELETE FROM students WHERE id = ?"
        ).run(req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({
                error: "Student not found."
            });
        }

        res.json({ message: "Student deleted successfully." });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete student." });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
