import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AdminSite from './AdminSite';
import './App.css'
import Words from './Words';

function App() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const apiUrl = "/api/words";
        const hr = await fetch(apiUrl);
        const data = await hr.json();
        // change the state so words = fetched data
        setWords(data);
      }
      catch (err) { console.error(err); }
    };

    fetchWords();
  },[]);

  let arr = words.map(word => <span key={word.id}>English: {word.foreign_word} | Finnish: {word.finnish_word}</span>)


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

                  <h1>Learn English!</h1>
                  {<Words words={words} />}
                </>} />
              <Route path="admin/*" element={<AdminSite words={words} setWords={setWords} />} />
            </Routes>
          </div>

        </div>
      </BrowserRouter>
    </>
  )
}

export default App
