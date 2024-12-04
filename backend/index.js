const express = require('express')
const wordsRouter = require("./router");
const db = require("./database");
const cors = require("cors");
const app = express()
const path = require("path");
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use("/api/words", wordsRouter);
app.use(express.static(path.join(__dirname, "public")));

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