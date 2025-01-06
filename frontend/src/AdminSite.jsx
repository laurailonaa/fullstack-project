import { useEffect, useState } from 'react';
import Filters from './Filters';
import Words from './Words';

// imported props from user view which are used in admin view too
function AdminSite({languages, setLanguages, tags, setTags, words, setWords, newWord, setNewWord, currentLanguage, setCurrentLanguage, currentTag, setCurrentTag, fetchLanguageAndTag, currentLanguageName, currentTagName, storeTag, storeLanguage}) {

    // states for adding new languages and tags
    const [newLanguage, setNewLanguage] = useState({language: ''});
    const [newTag, setNewTag] = useState({tag: ''});

    // fetch words from the backend without the shuffle
    const fetchWords = async (currentLanguage, currentTag) => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}api/words?language=${currentLanguage}&tag=${currentTag}`;
            const hr = await fetch(apiUrl);
            const data = await hr.json();
            // change the state so words = fetched data
            setWords(data);
        }
        catch (err) { console.error(err); }
    };

    // when current language or tag is changed and they exist, fetch words again
    useEffect(() => {
        if (currentLanguage && currentTag) {
            fetchWords(currentLanguage, currentTag);
        }
    }, [currentLanguage, currentTag]);

    // post a new word to the backend
    const postWord = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}api/words`, {
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
            // set words as the previous words and the added word
            setWords((prevWords) => [...prevWords, addedWord]);

            // fetch words again so the existing word list in the frontend gets updated right away
            await fetchWords(currentLanguage, currentTag);

            // keep language and tag the same until they are changed but clear the input fields
            setNewWord((prev) => ({ ...prev, foreign_word: '', finnish_word: ''}));
        } catch (err) {
            console.error(err);
        }
    };

    // post a new language to the backend
    const postLanguage = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}api/words/languages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newLanguage),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const addedLanguage = await response.json();
            // set languages as the previous ones and add the new one to the list
            setLanguages((prevLanguages) => [...prevLanguages, addedLanguage]);

            setCurrentLanguage(addedLanguage.id);

            // fetch languages and tags again
            await fetchLanguageAndTag();

            // clear the input fields
            setNewLanguage({ language: ''});
        } catch (err) {
            console.error(err);
        }
    };

    // post a new tag to the backend
    const postTag = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}api/words/tags`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTag),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const addedTag = await response.json();
            // set tags as the previous ones and add the new one to the list
            setTags((prevTags) => [...prevTags, addedTag]);

            setCurrentLanguage(addedTag.id);

            await fetchLanguageAndTag();

            // clear the input fields
            setNewTag({ tag: '' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h1>Learn {currentLanguageName} - ADMIN</h1>
            <p>Here you can add new words, languages and categories and delete or update already existing ones</p>
            <div>
                {/** import filters so it can fetch words based on the language and tag that is shown in the frontend */}
                <Filters
                    currentLanguage={currentLanguage}
                    setCurrentLanguage={storeLanguage}
                    currentTag={currentTag}
                    setCurrentTag={storeTag}
                    languages={languages}
                    tags={tags}
                    newWord={newWord}
                    setNewWord={setNewWord}
                />

                {/** includes add words/languages/tags -part only to the admin view */}
                {location.pathname.includes("admin") && (
                    <>

                        <h2>Add a new word </h2>
                        <h3>Current theme: {currentTagName}</h3>
                        <label>
                            {currentLanguageName}:
                            <input
                                type="text"
                                value={newWord.foreign_word}
                                onChange={(e) => setNewWord({ ...newWord, foreign_word: e.target.value, language: currentLanguage, tag: currentTag, })}
                            />
                        </label>
                        <br />
                        <label>
                            Finnish:
                            <input
                                type="text"
                                value={newWord.finnish_word}
                                onChange={(e) => setNewWord({ ...newWord, finnish_word: e.target.value, language: currentLanguage, tag: currentTag, })}
                            />
                        </label>
                        <br />
                        <button onClick={() => postWord()}>Add Word</button>

                        <h2>Add a new language</h2>
                        <label>
                            New language:
                            <input
                                type="text"
                                value={newLanguage.language}
                                onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
                            />
                        </label>
                        <br />
                        <button onClick={() => postLanguage()}>Add Language</button>

                        <h2>Add a new tag</h2>
                        <label>
                            New tag:
                            <input
                                type="text"
                                value={newTag.tag}
                                onChange={(e) => setNewTag({ ...newTag, tag: e.target.value })}
                            />
                        </label>
                        <br />
                        <button onClick={() => postTag()}>Add Tag</button>
                    </>
                )}

            {/** display words based on filtering in the user AND admin view */}
            <Words words={words} setWords={setWords} fetchWords={fetchWords} currentLanguage={currentLanguage} currentTag={currentTag}/>
            </div >
        </>
    )
}

export default AdminSite;