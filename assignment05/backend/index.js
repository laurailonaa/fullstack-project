const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const app = express()
const path = require("path");
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    // Create a table
    db.run('CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY, latitude DECIMAL, longitude DECIMAL)');

    // Insert data
    db.run('INSERT INTO locations (latitude, longitude) VALUES (?, ?)', [70.25, 90.19]);
    db.run('INSERT INTO locations (latitude, longitude) VALUES (?, ?)', [60, 60]);
    db.run('INSERT INTO locations (latitude, longitude) VALUES (?, ?)', [-34.78, -117.90]);
})

app.get('/api/locations', (req, res) => {
    db.all('SELECT * FROM locations', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
})

const shutdown = () => {
    console.info("\nShutting down gracefully...");
    db.close((err) => {
        if (err) {
            console.error("Error closing database connection:", err);
        } else {
            console.info("Database connection closed.");
        }
        server.close((err) => {
            if (err) {
                console.error("Error closing Express server:", err);
            } else {
                console.info("Express server closed.");
            }
            //process.exit(0);
        });
    });
};

process.on("SIGTERM", shutdown); // system manager, some other application
process.on("SIGINT", shutdown); // ctrl-c

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})