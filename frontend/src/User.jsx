import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AdminSite from './AdminSite';
import Filters from './Filters';
import Words from './Words';

// user view of the app
function User() {

    // states for languages and tags
    const [languages, setLanguages] = useState([]);
    const [tags, setTags] = useState([]);

    // state for adding new words
    const [newWord, setNewWord] = useState({
        id: '',
        foreign_word: '',
        finnish_word: '',
        language: '',
        tag: '',
    });

    // state for words
    const [words, setWords] = useState([]);

    // language is English (id number 1) by default
    const [currentLanguage, setCurrentLanguage] = useState(1);

    // tag is animals (id number 1) by default
    const [currentTag, setCurrentTag] = useState(1);

    //state to determine whether the quiz is on/off
    const [start, setStart] = useState(false);


    // these will synchronize current language and tag visible in both user and admin view at the time
    // AI consulted solution
    const storeLanguage = (languageId) => {
        setCurrentLanguage(languageId);
    }

    const storeTag = (tagId) => {
        setCurrentTag(tagId);
    }

    // if word pairs are foreign-finnish or finnish-foreign
    const [reversed, isReversed] = useState(false);

    // when clicked, state changes to true
    const reversedClick = () => {
        isReversed((list) => !list);
    }

    // fetch words from the backend
    const fetchWords = async (currentLanguage, currentTag) => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}api/words?language=${currentLanguage}&tag=${currentTag}`;
            const hr = await fetch(apiUrl);
            const data = await hr.json();

            // make words order shuffle so it's not the same every time
            const dataShuffled = randomArray(data);

            setWords(dataShuffled);
        }
        catch (err) { console.error(err); }
    };

    // if current language or tag changes and they exist, fetch words again
    // so the interface only shows wanted vocabulary
    useEffect(() => {
        if (currentLanguage && currentTag) {
            fetchWords(currentLanguage, currentTag);
        }
    }, [currentLanguage, currentTag]);

    // fetch languages and tags from the backend
    const fetchLanguageAndTag = async () => {
        try {
            const fetchLanguages = await fetch(`${import.meta.env.VITE_API_URL}api/words/languages`);
            const fetchTags = await fetch(`${import.meta.env.VITE_API_URL}api/words/tags`);

            const languageData = await fetchLanguages.json();
            const tagData = await fetchTags.json();

            setLanguages(languageData);
            setTags(tagData);

        } catch (err) {
            console.error(err);
        }
    };

    // fetch languages and tags every time app mounts
    useEffect(() => {
        fetchLanguageAndTag();
    }, []);

    // find the name of the current language and tag by going through the arrays
    // so the id is matching current id
    // if the word-pairs are reversed, currentLanguageName is Finnish
    // AI consulted solution
    const currentLanguageName = reversed ? "Finnish" : languages.find(lang => lang.id === currentLanguage)?.language;
    const currentTagName = tags.find(tag => tag.id === currentTag)?.tag;

    // making the words appear shuffled in the user view for diversity of app's use
    // AI consulted tips
    const randomArray = (array) => {
        // copying the array just in case so the original stays unharmed
        const copyArray = [...array];
        // making the words appear in random order by using sort and Math.random()
        // randomizing the array between values [-0.5, 0.5]
        return copyArray.sort(() => Math.random() - 0.5);
    }

    // starts the quiz, makes start button disappear by changing the state and randomizing the word order
    const startQuiz = () => {
        setStart(true);
        setWords((prev) => randomArray(prev));
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

                                    <h1>Learn {reversed ? "Finnish" : currentLanguageName}!</h1>
                                    <p>Write the {reversed ? "Finnish definition" : "foreign definition"} to the words. Change the language or theme from the option bar below.</p>
                                    <p>Check your answers by pressing the check button. You can also try again by pressing the retry button.</p>

                                    <strong><p>Current theme: {currentTagName}</p></strong>
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
                                <div className="start">
                                        {!start && <button onClick={(startQuiz)}>Start quiz</button>}
                                </div>

                                {<Words words={words} setWords={setWords} randomArray={randomArray} reversed={reversed} isReversed={isReversed} reversedClick={reversedClick} start={start} setStart={setStart}/>}

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

                    <div className="footer">
                        <p>© Laura Shemeikka 2025</p>
                    </div>

                </div>
            </BrowserRouter>
        </>
    )
}

export default User;