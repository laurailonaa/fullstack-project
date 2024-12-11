import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AdminSite from './AdminSite';
import './App.css';
import Filters from './Filters';
import Words from './Words';

function App() {

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

      } catch (err) {
        console.error(err);
      }
    };
    fetchLanguageAndTag();
  }, [])

  const currentLanguageName = languages.find(lang => lang.id === currentLanguage)?.language;
  const currentTagName = tags.find(tag => tag.id === currentTag)?.tag;

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
                    setCurrentLanguage={setCurrentLanguage}
                    currentTag={currentTag}
                    setCurrentTag={setCurrentTag}
                    languages={languages}
                    tags={tags}
                    newWord={newWord}
                    setNewWord={setNewWord}
                  />
                  {<Words words={words} setWords={setWords}/>}
                </>} />
              <Route path="admin/*" element={<AdminSite words={words} setWords={setWords}/>} />
            </Routes>
          </div>

        </div>
      </BrowserRouter>
    </>
  )
}

export default App