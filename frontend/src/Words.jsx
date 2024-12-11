import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './App.css'


function Words({ words, setWords, fetchWords, currentLanguage, currentTag }) {

    // use location to determine which parts of the return goes to both of the views or just either one
    const location = useLocation();

    const [reversed, isReversed] = useState(false);

    const [result, setResult] = useState(0);

    const reversedClick = () => {
        isReversed((prev) => !prev);
    }

    const handleInput = (wordId, value) => {
        setWords((prevWords) =>
            prevWords.map((w) =>
                w.id === wordId ? { ...w, input: value, isCorrect:null } : w
            )
        )
    }

    const answerCheck = () => {
        let count = 0;
        const updateWords =
            words.map((word) => {
                const isCorrect =
                    (!reversed && word.input === word.finnish_word) ||
                    (reversed && word.input === word.foreign_word);

                if (isCorrect) {
                    count += 1;
                }
                return { ...word, isCorrect };
            });

        setWords(updateWords);
        setResult(count);
        alert(`You got ${count} out of ${words.length} right!`);
    }

    // function to delete words from the backend
    const deleteWords = async (word) => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}api/words/${word.id}`;
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
            const apiUrl = `${import.meta.env.VITE_API_URL}api/words/${word.id}`;
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
        <>
        <div className="reverse">
                {!location.pathname.includes("admin") && (
                    <>
                    <button onClick={(reversedClick)}>Reverse</button>
                    </>
                )}
        </div>
        {/** maps the words array and makes text input fields from both foreign and finnish words */}

            <div className="word-container">
            {words.map((word) => (
                <div
                    key={word.id}
                    className={`word-card ${word.isCorrect === true
                                ? "correct"
                                : word.isCorrect === false
                                ? "incorrect"
                                : ""
                                }`}>
                    {location.pathname.includes("admin") ? (
                        <>
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
                        </>
                    ) : reversed ? (
                        <>
                        <strong>{word.finnish_word}</strong>
                        <span> = </span>
                            <input
                                type="text"
                                value={word.input || ''}
                                onChange={(e) => {
                                    handleInput(word.id, e.target.value)
                                }}
                            />
                        </>
                    ) : (

                        <>
                            <strong>{word.foreign_word}</strong>
                            <span> = </span>
                            <input
                                type="text"
                                value={word.input || ''}
                                onChange={(e) => {
                                    handleInput(word.id, e.target.value)
                            }}/>
                        </>
                    )}

                    {/** Display delete and update buttons only in admin view so user only gets the words itself */}
                    {location.pathname.includes("admin") && (
                        <>  <button style={{ textAlign: 'center', padding: '5px', marginLeft: '50px' }} onClick={() => deleteWords(word)}>Delete word</button>
                            <button style={{ marginLeft: '410px' }} onClick={() => updateWords(word)}>Update</button>
                        </>
                    )}
                </div>
            ))}
        </div>
            {!location.pathname.includes("admin") && (
                <>
                    <button onClick={(answerCheck)}>Check</button>
                </>
            )}
        </>
    );
};

export default Words;