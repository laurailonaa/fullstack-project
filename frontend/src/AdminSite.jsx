import { useEffect, useState } from 'react'
import Words from './Words';

function AdminSite({words, setWords}) {
    const [languages, setLanguages] = useState([]);
    const [tags, setTags] = useState([]);
    const [newWord, setNewWord] = useState({
        foreign_word: '',
        finnish_word: '',
        language: 1,
        tag: 1,
    });

    // fetch languages and tags from the backend every time when app mounts
    useEffect(()=> {
        const fetchLanguageAndTag = async () => {
            try {
                const fetchLanguages = await fetch('http://localhost:3000/api/words/languages');
                const fetchTags = await fetch('http://localhost:3000/api/words/tags');

                const languageData = await fetchLanguages.json();
                const tagData = await fetchTags.json();

                setLanguages(languageData);
                setTags(tagData);

            } catch (err) {
                console.error(err);
            }
        };
        fetchLanguageAndTag();
    }, [])

        // post a new word
        const postWord = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/words', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newWord),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const addedWord = await response.json();
                setWords((prevWords) => [
                    ...prevWords, { id: addedWord.id, foreign_word: addedWord.foreign_word, finnish_word: addedWord.finnish_word }
                ]);

                setNewWord({ foreign_word: '', finnish_word: '', language: '', tag: '' });
            } catch (err) {
                console.error(err);
            }
        };


    return(
        <>
        <h1>Learn English! - ADMIN</h1>
        <p>Here you can add new words, languages and categories and delete or update already existing ones</p>
            <div>
                <label>
                    Language:
                    <select
                        value={newWord.language}
                        onChange={(e) => setNewWord({ ...newWord, language: e.target.value })}>
                        <option value="">Select a language</option>

                        {languages.map((language) => (
                            <option key={language.id} value={language.id}>{language.language}</option>
                        ))}
                    </select>

                </label>
                <label>
                    Tag:
                    <select
                        value={newWord.tag}
                        onChange={(e) => setNewWord({ ...newWord, tag: e.target.value })}>
                        <option value="">Select a tag</option>

                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>{tag.tag}</option>
                        ))}
                    </select>

                </label>
                <h2>Add a new word </h2>
                <label>
                    English:
                    <input
                        type="text"
                        value={newWord.foreign_word}
                        onChange={(e) => setNewWord({ ...newWord, foreign_word: e.target.value })}
                    />
                </label>
                <br />
                <label>
                    Finnish:
                    <input
                        type="text"
                        value={newWord.finnish_word}
                        onChange={(e) => setNewWord({ ...newWord, finnish_word: e.target.value })}
                    />
                </label>
                <br />
                <button onClick={() => postWord()}>Add Word</button>
            </div>
            <Words words={words} setWords={setWords} />
        </>
    )
}

export default AdminSite;