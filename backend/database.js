const sqlite3 = require('sqlite3').verbose();

// make a SQLite database in memory
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    // Create tables for words, languages and tags
    db.run('CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY, foreign_word TEXT, finnish_word TEXT, language INTEGER, tag INTEGER)');
    db.run('CREATE TABLE IF NOT EXISTS languages (id INTEGER PRIMARY KEY, language TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY, tag TEXT)');


    // Insert initial data to the tables which appear when starting the backend
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['cat', 'kissa', 1, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['dog', 'koira', 1, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['cow', 'lehmä', 1, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['mouse', 'hiiri', 1, 1]);

    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['blue', 'sininen', 1, 2]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['red', 'punainen', 1, 2]);

    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['katt', 'kissa', 2, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['hund', 'koira', 2, 1]);

    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['blåa', 'sininen', 2, 2]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['röd', 'punainen', 2, 2]);



    // Insert new languages and tags into tables
    db.run('INSERT INTO languages (language) VALUES (?)', ['English']);
    db.run('INSERT INTO tags (tag) VALUES (?)', ['animals']);

    db.run('INSERT INTO languages (language) VALUES (?)', ['Swedish']);
    db.run('INSERT INTO tags (tag) VALUES (?)', ['colors']);
})

module.exports = db;