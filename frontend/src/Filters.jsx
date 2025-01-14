import { useEffect, useState } from 'react'

function Filters({setCurrentLanguage, setCurrentTag, currentLanguage, currentTag, languages, tags, newWord, setNewWord}) {

    // make option bars for language and tag and filter words based on
    // which language and tag is selected (by id)

    // ChatGPT was consulted with currentLanguage and currentTag functionality

    return(
        <>
        <div className="optionBars">
        <label>
                    Language:
                    <select
                        value={currentLanguage}
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
                        value={currentTag}
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
            </div>
        </>
    );
}

export default Filters;