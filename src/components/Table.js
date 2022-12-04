import React from 'react'

function Table({ words, currentWord }) {

    let pronouns = ['yo', 'tú', "él/ella/usted", 'nosotros/nosotras', 'vosotros/vosotras', 'ellos/ellas/ustedes']
    let tenses = ['Present', 'Preterite', 'Imperfect', 'Conditional', 'Future']

    function filter(pronoun, mood, tense) {
        let pronouns = []
        words.filter(word => word.meaning.map(el => el.performer === pronoun && el.mood === mood && el.tense === tense ? pronouns.push({ word: word.word, meaning: el }) : pronouns))
        return pronouns[0].word
    }
    
    return (
        <table>
            <tbody>
                <tr>
                    <th></th>
                    {tenses.map((tense, index) => (
                        <th key={index}>{tense}</th>
                    ))}
                </tr>
                {pronouns.map((pronoun, index) => (
                    <tr key={index}>
                        <td>{pronoun}</td>
                        {tenses.map((tense, index) => (
                            <td key={index} className={currentWord === filter(pronoun, "Indicative", tense) ? "selected" : ""}>{words.length > 0 && filter(pronoun, "Indicative", tense)}</td>
                        ))}
                    </tr>


                ))}

            </tbody>
        </table>
    )
}

export default Table