import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AdminSite from './AdminSite';
import './App.css';
import Filters from './Filters';
import Words from './Words';

// user view of the app
function User() {

    const [languages, setLanguages] = useState([]);
    const [tags, setTags] = useState([]);

    const [newWord, setNewWord] = useState({
        id: '',
        foreign_word: '',
        finnish_word: '',
        language: '',
        tag: '',
    });

    const [words, setWords] = useState([]);

    // language is English (id number 1) by default
    const [currentLanguage, setCurrentLanguage] = useState(1);

    // tag is animals (id number 1) by default
    const [currentTag, setCurrentTag] = useState(1);

    const storeLanguage = (languageId) => {
        setCurrentLanguage(languageId);
    }

    const storeTag = (tagId) => {
        setCurrentTag(tagId);
    }

    const fetchWords = async (currentLanguage, currentTag) => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}api/words?language=${currentLanguage}&tag=${currentTag}`;
            const hr = await fetch(apiUrl);
            const data = await hr.json();

            const dataShuffled = randomArray(data);

            setWords(dataShuffled);
        }
        catch (err) { console.error(err); }
    };

    //chat gpt
    useEffect(() => {
        if (languages.length > 0){
            setCurrentLanguage(languages[0].id);
        }

        if (tags.length > 0) {
            setCurrentTag(tags[0].id);
        }

    }, [languages, tags]);

    useEffect(() => {
        if (currentLanguage && currentTag) {
            fetchWords(currentLanguage, currentTag);
        }
    }, [currentLanguage, currentTag]);

    // fetch languages and tags from the backend every time when app mounts
    const fetchLanguageAndTag = async () => {
        try {
            const fetchLanguages = await fetch(`${import.meta.env.VITE_API_URL}api/words/languages`);
            const fetchTags = await fetch(`${import.meta.env.VITE_API_URL}api/words/tags`);

            const languageData = await fetchLanguages.json();
            const tagData = await fetchTags.json();

            setLanguages(languageData);
            setTags(tagData);

            setCurrentLanguage(languageData[0].id);
            setCurrentTag(tagData[0].id);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLanguageAndTag();
    }, []);

    const currentLanguageName = languages.find(lang => lang.id === currentLanguage)?.language;
    const currentTagName = tags.find(tag => tag.id === currentTag)?.tag;

    const randomArray = (array) => {
        // copying the array just in case so the original stays unharmed
        const copyArray = [...array];
        for (let i = copyArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [copyArray[i], copyArray[randomIndex]] = [copyArray[randomIndex], copyArray[i]];
        }
        return copyArray.map((word) => ({ ...word }));
    }

    return (
        <>

            <BrowserRouter>
                <div className="App">

                    <nav className="navBar">
                        <ul>
                            <li className="item">
                                <Link to="/">User</Link>
                            </li>
                            |
                            <li className="item">
                                <Link to="/admin">Admin</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="content">
                        <Routes>
                            <Route path="/" element={
                                <>

                                    <h1>Learn {currentLanguageName}!</h1>
                                    <p>Current theme: {currentTagName}</p>
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
                                    {<Words words={words} setWords={setWords} randomArray={randomArray} />}
                                </>} />
                            <Route path="admin/*" element={<AdminSite
                                                                languages={languages}
                                                                setLanguages={setLanguages}
                                                                tags={tags}
                                                                setTags={setTags}
                                                                words={words}
                                                                setWords={setWords}
                                                                newWord={newWord}
                                                                setNewWord={setNewWord}
                                                                currentLanguage={currentLanguage}
                                                                setCurrentLanguage={setCurrentLanguage}
                                                                currentTag={currentTag}
                                                                storeTag={storeTag}
                                                                storeLanguage={storeLanguage}
                                                                setCurrentTag={setCurrentTag}
                                                                fetchLanguageAndTag={fetchLanguageAndTag}
                                                                currentLanguageName={currentLanguageName}
                                                                currentTagName={currentTagName} />} />
                        </Routes>
                    </div>

                </div>
            </BrowserRouter>
        </>
    )
}

export default User;