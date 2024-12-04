const db = require("./database");

const functions = {
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
    patchById: (id, update) => {
        return new Promise((resolve, reject) => {
            // make the SQL command based on which value is wanted to be updated
            let updateValues = "UPDATE words SET ";
            const values = [];

            if (update.foreign_word !== undefined) {
                updateValues += "foreign_word = ?";
                values.push(update.foreign_word); // "UPDATE locations SET foreign_word = ?"
            }

            if (update.finnish_word !== undefined) {
                updateValues += ", finnish_word = ?";
                values.push(update.finnish_word); // "UPDATE locations SET finnish_word = ?"
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
}

module.exports = functions;