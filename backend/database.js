const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    // Create tables for words, languages and tags
    db.run('CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY, foreign_word TEXT, finnish_word TEXT, language INTEGER, tag INTEGER)');
    db.run('CREATE TABLE IF NOT EXISTS languages (id INTEGER PRIMARY KEY, language TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY, tag TEXT)');


    // Insert data
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['cat', 'kissa', 1, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['dog', 'koira', 1, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['cow', 'lehmä', 1, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['mouse', 'hiiri', 1, 1]);


    db.run('INSERT INTO languages (language) VALUES (?)', ['English']);
    db.run('INSERT INTO tags (tag) VALUES (?)', ['animals']);
})

module.exports = db;