import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './App.css'


function Words({ words, setWords, fetchWords, currentLanguage, currentTag }) {

    // use location to determine which parts of the return goes to both of the views or just either one
    const location = useLocation();

    // function to delete words from the backend
    const deleteWords = async (word) => {
        try {
            const apiUrl = `api/words/${word.id}`;
            const response = await fetch(apiUrl, { method: 'DELETE' });
            if (!response.ok) {
                console.error("A problem occured");
            }
            await fetchWords(currentLanguage, currentTag);
        }
        catch (err) { console.error(err); }
    };

    // function to update(patch) words from the backend
    const updateWords = async (word) => {
        try {
            const apiUrl = `api/words/${word.id}`;
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    foreign_word: word.foreign_word,
                    finnish_word: word.finnish_word,
                    language: word.language,
                    tag: word.tag
                }),
            });
            if (!response.ok) {
                console.error("A problem occured");
            }
            await fetchWords(currentLanguage, currentTag);
        }
        catch (err) { console.error(err); }
    };

    return (
        // maps the words array and makes text input fields from both foreign and finnish words
        <div className="word-container">
            {words.map((word) => (
                <div
                    key={word.id}
                    className={`word-card`}
                >
                    <input
                        type="text"
                        value={word.foreign_word}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setWords((prevWords) =>
                                prevWords.map((w) =>
                                    w.id === word.id ? { ...w, foreign_word: newValue } : w
                                )
                            )
                        }}
                    />
                    <span> = </span>
                    <input
                        type="text"
                        value={word.finnish_word}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setWords((prevWords) =>
                                prevWords.map((w) =>
                                    w.id === word.id ? { ...w, finnish_word: newValue } : w
                                )
                            )
                        }}
                    />
                    {/** Display delete and update buttons only in admin view so user only gets the words itself */}
                    {location.pathname.includes("admin") && (
                        <>  <button style={{ textAlign: 'center', padding: '5px', marginLeft: '50px' }} onClick={() => deleteWords(word)}>Delete word</button>
                            <button style={{ marginLeft: '410px' }} onClick={() => updateWords(word)}>Update</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Words;