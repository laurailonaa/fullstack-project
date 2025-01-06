import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './App.css'

// component to show word pairs from the backend
function Words({ words, setWords, fetchWords, currentLanguage, currentTag, randomArray }) {

    // use location to determine which parts of the return goes to both of the views or just either one
    // (user or admin only)
    const location = useLocation();

    // if word pairs are foreign-finnish or finnish-foreign
    const [reversed, isReversed] = useState(false);

    // state for result of the word quiz
    const [result, setResult] = useState(0);

    // when clicked, state changes to true
    const reversedClick = () => {
        isReversed((prev) => !prev);
    }

    // function to handle user input
    const handleInput = (wordId, value) => {
        setWords((prevWords) =>
            prevWords.map((w) =>
                w.id === wordId ? { ...w, input: value, isCorrect:null } : w
            )
        )
    }

    // function to check how many inputs were correct
    const answerCheck = () => {
        let count = 0;
        const updateWords =
            words.map((word) => {
                // if the input matches its pair in the backend, add 1 point to the count
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
                {/** reverse button is only shown in the user view */}
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
                        <>  <button className="delete" onClick={() => deleteWords(word)}>Delete word</button>
                            <button className="update" onClick={() => updateWords(word)}>Update</button>
                        </>
                    )}
                </div>
            ))}
        </div>
            {/** Check and retry buttons are only shown in user view */}
            {!location.pathname.includes("admin") && (
                <>
                    <button onClick={(answerCheck)}>Check</button>
                    <button onClick={() => {
                        window.location.reload(false)
                       setWords((prevWords) => randomArray(prevWords));
                    }}>Retry</button>
                </>
            )}
        </>
    );
};

export default Words;