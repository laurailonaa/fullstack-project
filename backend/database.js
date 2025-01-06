const sqlite3 = require('sqlite3').verbose();

// make a SQLite database in memory
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    // Create tables for words, languages and tags
    db.run('CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY, foreign_word TEXT, finnish_word TEXT, language INTEGER, tag INTEGER)');
    db.run('CREATE TABLE IF NOT EXISTS languages (id INTEGER PRIMARY KEY, language TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY, tag TEXT)');


    // Insert initial data to the tables which appear when starting the backend

    // Words for English
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['cat', 'kissa', 1, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['dog', 'koira', 1, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['cow', 'lehmä', 1, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['mouse', 'hiiri', 1, 1]);

    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['blue', 'sininen', 1, 2]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['red', 'punainen', 1, 2]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['yellow', 'keltainen', 1, 2]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['green', 'vihreä', 1, 2]);

    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['car', 'auto', 1, 3]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['plane', 'lentokone', 1, 3]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['bus', 'bussi', 1, 3]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['train', 'juna', 1, 3]);

    // Words for Swedish
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['katt', 'kissa', 2, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['hund', 'koira', 2, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['ko', 'lehmä', 2, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['mus', 'hiiri', 2, 1]);

    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['blå', 'sininen', 2, 2]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['röd', 'punainen', 2, 2]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['gul', 'keltainen', 2, 2]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['grön', 'vihreä', 2, 2]);

    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['bil', 'auto', 2, 3]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['flygplan', 'lentokone', 2, 3]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['buss', 'bussi', 2, 3]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['tåg', 'juna', 2, 3]);

    // Words for German
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['Katze', 'kissa', 3, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['Hund', 'koira', 3, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['Kuh', 'lehmä', 3, 1]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['Maus', 'hiiri', 3, 1]);

    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['Blau', 'sininen', 3, 2]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['Rot', 'punainen', 3, 2]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['Gelb', 'keltainen', 3, 2]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['Grün', 'vihreä', 3, 2]);

    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['Auto', 'auto', 3, 3]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['Flugzeug', 'lentokone', 3, 3]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['Bus', 'bussi', 3, 3]);
    db.run('INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)', ['Zug', 'juna', 3, 3]);

    // Insert new languages and tags into tables
    db.run('INSERT INTO languages (language) VALUES (?)', ['English']);
    db.run('INSERT INTO languages (language) VALUES (?)', ['Swedish']);
    db.run('INSERT INTO languages (language) VALUES (?)', ['German']);

    db.run('INSERT INTO tags (tag) VALUES (?)', ['animals']);
    db.run('INSERT INTO tags (tag) VALUES (?)', ['colors']);
    db.run('INSERT INTO tags (tag) VALUES (?)', ['vehicles']);
})

// now when the language app starts, there are three languages and tags by default,
// four words in each tag
// admin can add new words to the desired tag and language in the frontend
// admin can also add new languages and tags to the database

module.exports = db;