const express = require("express");
const database = require("./database");
const db = require("./dbfunctions");

const wordsRouter = express.Router();

// get all words
wordsRouter.get("/", async (req, res) => {
    try {
        const { language, tag } = req.query;

        const lang = language ? parseInt(language) : undefined;
        const t = tag ? parseInt(tag) : undefined;

        // for filtering the words
        if (lang || t) {
            const filterWords = await db.filterWords({
                language: lang,
                tag: t,
            });
            res.status(200).json(filterWords);
            console.info("Fetched filtered data from database successfully.");
            return;
        }

        const words = await db.findAll();
        res.json(words);
        console.info("Fetched data from database successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occured during fetching." });
        return;
    }
});

// get all languages
wordsRouter.get('/languages', (req, res) => {
    database.all('SELECT * FROM languages', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
})

// get all tags
wordsRouter.get('/tags', (req, res) => {
    database.all('SELECT * FROM tags', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
})

// post a new word
wordsRouter.post("/", async (req, res) => {
    try {
        const word = await db.save(req.body);
        res.status(201).json(word);
        console.info("Inserted new data to database successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured during posting" });
        return;
    }
});

// DELETE BY ID
wordsRouter.delete("/:myId", async (req, res) => {
    try {
        const id = parseInt(req.params.myId);
        const word = await db.deleteById(id);
        if (!word) {
            res.status(404).json({
                error: "Location with ID does not exist.",
                suggestion: "Ensure the location ID is correct.",
            });
            return;
        }
        res.status(204).json();
        console.info(`Deleted data with id ${id} from database successfully.`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured during delete" });
        return;
    }
});

// PATCH EXISTING WORD
wordsRouter.patch("/:myId", async (req, res) => {
    try {
        const id = parseInt(req.params.myId);
        const word = await db.findById(id);
        if (!word) {
            res.status(404).json({ error: "Word not found" });
            return;
        }
        const patchedWord = req.body;
        const result = await db.patchById(id, patchedWord);
        res.json(result);
        console.info(`Patched data with id ${id} successfully.`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating word." });
        return;
    }
});

module.exports = wordsRouter;