import { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom';
import './App.css'


function Words ({ words, setWords }) {

    const location = useLocation();

        const deleteWords = async (word) => {
            try {
                const apiUrl = `api/words/${word.id}`;
                const response = await fetch(apiUrl, { method: 'DELETE' });
                if(!response.ok) {
                    console.error("A problem occured");
                }
                setWords((prevWords) => prevWords.filter((deletedWord) => deletedWord.id !== word.id));
            }
            catch (err) { console.error(err); }
        };

    const updateWords = async (word) => {
        try {
            const apiUrl = `api/words/${word.id}`;
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    foreign_word : word.foreign_word,
                    finnish_word: word.finnish_word
                }),
            });
            if (!response.ok) {
                console.error("A problem occured");
            }
            const updatedWord = await response.json();
            setWords((prevWords) =>
                prevWords.map((w) => (w.id === updatedWord.id ? updatedWord : w)));
        }
        catch (err) { console.error(err); }
    };

    return (
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
                                    w.id === word.id ? {...w, foreign_word: newValue} : w
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
                    {location.pathname.includes("admin") && (
                    <>  <button style={{textAlign:'center', padding:'5px', marginLeft:'50px'}} onClick={() => deleteWords(word)}>Delete word</button>
                        <button style={{marginLeft: '410px' }} onClick={() => updateWords(word)}>Update</button>
                    </>
                    )}
                     </div>
            ))}
        </div>
    );
};

export default Words;