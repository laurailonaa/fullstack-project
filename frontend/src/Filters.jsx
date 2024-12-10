import { useEffect, useState } from 'react'
import AdminSite from './AdminSite';

function Filters({setCurrentLanguage, setCurrentTag, languages, tags, newWord, setNewWord}) {

    return(
        <>
        <label>
                    Language:
                    <select
                        value={newWord.language}
                        onChange={(e) => {
                            const selectedLanguageId = parseInt(e.target.value);
                            setNewWord({ ...newWord, language: selectedLanguageId });
                            setCurrentLanguage(selectedLanguageId); // Update the current language
                        }}>
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
                        onChange={(e) => {
                            const selectedTagId = parseInt(e.target.value);
                            setNewWord({ ...newWord, tag: selectedTagId });
                            setCurrentTag(selectedTagId); // Update the current tag
                        }}>
                        <option value="">Select a tag</option>

                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>{tag.tag}</option>
                        ))}
                    </select>

                </label>
        </>
    );
}

export default Filters;