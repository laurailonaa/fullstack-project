import { useEffect, useState } from 'react';
import Filters from './Filters';
import Words from './Words';

function AdminSite() {

    // states for filtering data
    const [languages, setLanguages] = useState([]);
    const [tags, setTags] = useState([]);

    // state is clear by default so when posting a new word it's set clear after that
    const [newWord, setNewWord] = useState({
        id: '',
        foreign_word: '',
        finnish_word: '',
        language: '',
        tag: '',
    });

    // state for showing words
    const [words, setWords] = useState([]);

    // language is English (id number 1) by default
    const [currentLanguage, setCurrentLanguage] = useState(1);

    // tag is animals (id number 1) by default
    const [currentTag, setCurrentTag] = useState(1);

    // fetch words from the backend and filter them using current language and tag
    const fetchWords = async (currentLanguage, currentTag) => {
        try {
            const apiUrl = `api/words?language=${currentLanguage}&tag=${currentTag}`;
            const hr = await fetch(apiUrl);
            const data = await hr.json();
            // change the state so words = fetched data
            setWords(data);
        }
        catch (err) { console.error(err); }
    };

    useEffect(() => {
        fetchWords(currentLanguage, currentTag);
    }, [currentLanguage, currentTag]);

    // fetch languages and tags from the backend every time when app mounts
    useEffect(() => {
        const fetchLanguageAndTag = async () => {
            try {
                const fetchLanguages = await fetch('http://localhost:3000/api/words/languages');
                const fetchTags = await fetch('http://localhost:3000/api/words/tags');

                const languageData = await fetchLanguages.json();
                const tagData = await fetchTags.json();

                setLanguages(languageData);
                setTags(tagData);

                setCurrentLanguage(languageData[0].id);
                setCurrentTag(tagData[0].id);

                setNewWord(prev => ({ ...prev, language: currentLanguage, tag: currentTag }));

            } catch (err) {
                console.error(err);
            }
        };
        fetchLanguageAndTag();
    }, [])

    // post a new word to the backend
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
            setWords((prevWords) => [...prevWords, addedWord]);

            // fetch words again so the existing word list in the frontend gets updated right away
            await fetchWords(currentLanguage, currentTag);

            // keep language and tag the same until they are changed but clear the input fields
            setNewWord((prev) => ({ ...prev, foreign_word: '', finnish_word: ''}));
        } catch (err) {
            console.error(err);
        }
    };

    // filter which language and tag is currently in use by id so names will show in the frontend
    // ChatGPT was code-consulted due pure confusion of how I could implement my thoughts of this
    const currentLanguageName = languages.find(lang => lang.id === currentLanguage)?.language;
    const currentTagName = tags.find(tag => tag.id === currentTag)?.tag;


    return (
        <>
            <h1>Learn {currentLanguageName} - ADMIN</h1>
            <p>Here you can add new words, languages and categories and delete or update already existing ones</p>
            <div>
                {/** import filters so it can fetch words based on the language and tag that is shown in the frontend */}
                <Filters
                    currentLanguage={currentLanguage}
                    setCurrentLanguage={setCurrentLanguage}
                    currentTag={currentTag}
                    setCurrentTag={setCurrentTag}
                    languages={languages}
                    tags={tags}
                    newWord={newWord}
                    setNewWord={setNewWord}
                />

                {/** includes add words -part only to the admin view */}
                {location.pathname.includes("admin") && (
                    <>

                        <h2>Add a new word </h2>
                        <h3>Current theme: {currentTagName}</h3>
                        <label>
                            {currentLanguageName}:
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


                    </>
                )}

            {/** display words based on filtering in the user or admin view */}
            <Words words={words} setWords={setWords} fetchWords={fetchWords} currentLanguage={currentLanguage} currentTag={currentTag}/>
            </div >
        </>
    )
}

export default AdminSite;