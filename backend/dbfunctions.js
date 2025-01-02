const db = require("./database");

// Database functions that are used from http requests
const functions = {
    // Searches all words from the database
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM words', [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    },
    // Save/post new data into the database
    save: (data) => {
        return new Promise((resolve, reject) => {
            const { foreign_word, finnish_word, language, tag } = data;
            const query = 'INSERT INTO words (foreign_word, finnish_word, language, tag) VALUES (?, ?, ?, ?)';
            db.run(query, [foreign_word, finnish_word, language, tag], (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ foreign_word, finnish_word, language, tag });
            });
        })
    },
    // Save/post new languages into the database
    saveLang: (data) => {
        return new Promise((resolve, reject) => {
            const { language } = data;
            const query = 'INSERT INTO languages (language) VALUES (?)';
            db.run(query, [language], (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ language });
            });
        })
    },
    // Searches specific data with its id
    findById: (id) => {
        return new Promise((resolve, reject) => {
            const searchId = "SELECT * FROM words WHERE id = ?";

            db.run(searchId, [id], (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    },
    // Deletes specific data with its id
    deleteById: (id) => {
        return new Promise((resolve, reject) => {
            const deleteId = "DELETE FROM words WHERE id = ?";

            db.run(deleteId, id, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    },
    // Patches specific data with its id
    patchById: (id, update) => {
        return new Promise((resolve, reject) => {
            // make the SQL command based on which value is wanted to be updated
            let updateValues = "UPDATE words SET ";
            const values = [];

            if (update.foreign_word !== undefined) {
                updateValues += "foreign_word = ?";
                values.push(update.foreign_word); // "UPDATE words SET foreign_word = ?"
            }

            if (update.finnish_word !== undefined) {
                updateValues += ", finnish_word = ?";
                values.push(update.finnish_word); // "UPDATE words SET finnish_word = ?"
            }

            updateValues += " WHERE id = ?";
            values.push(id);

            // using the values array here and updating either value
            db.run(updateValues, values, (err) => {
                if (err) {
                    reject(err);
                }
                const searchId = "SELECT * FROM words WHERE id = ?";
                db.run(searchId, [id], (err) => {
                    if (err) {
                        reject(err);
                    }

                    const updatedWord = values;
                    resolve(updatedWord);
                });
            });
        });
    },
    // Filters words that appear in the frontend by using language and tag
    filterWords: ({ language, tag }) => {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM words WHERE ";
            const values = [];

            if (language) {
                query += "language = ?";
                values.push(language);
            }

            if (tag) {
                if (values.length > 0) {
                    query += " AND ";
                }
                query += "tag = ?";
                values.push(tag);
            }

            db.all(query, values, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    },
}

module.exports = functions;