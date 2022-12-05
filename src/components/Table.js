import React from 'react'

function Table({ words, currentWord, mood, tenses }) {

    let pronouns = ['yo', 'tú', "él/ella/usted", 'nosotros/nosotras', 'vosotros/vosotras', 'ellos/ellas/ustedes']


    function filter(pronoun, mood, tense) {
        if (mood === 'Perfect') {
            mood = 'Indicative'
        }
        if (mood === 'Subjunctive Perfect') {
            mood = 'Subjunctive'
        }

        let pronouns = []

        words.filter(word =>
            word.meaning.map(el =>
                (Array.isArray(el.performer) ? el.performer.filter(pro => pro === pronoun)[0]
                    : el.performer === pronoun)
                    && el.mood === mood
                    && el.tense === tense
                    ? pronouns.push({ word: word.word, meaning: el }) : pronouns))

        if (pronouns.length === 0) return '-'
        if (pronouns[0].meaning.has_long) return pronouns[0].meaning.long
        return pronouns[0].word
    }
    // function getAllVerbs(pronoun, mood, tense) {
    //     if(pronoun && !tense && !mood) {
    //         let pronouns = []
    //         words.filter(word => word.meaning.map(el => el.performer === pronoun ? pronouns.push({ word: word.word, meaning: el }) : pronouns))
    //         return pronouns
    //     }
    //     if(pronoun && mood && !tense) {
    //         let pronouns = []
    //         words.filter(word => word.meaning.map(el => el.performer === pronoun && el.mood.includes(mood) ? pronouns.push({ word: word.word, meaning: el }) : pronouns))
    //         return pronouns
    //     }
    //     if(pronoun && mood && tense) {
    //         let pronouns = []
    //         words.filter(word => word.meaning.map(el => el.performer === pronoun && el.mood.includes(mood) && el.tense.includes(tense) ? pronouns.push({ word: word.word, meaning: el }) : pronouns))
    //         return pronouns
    //     }
    // }

    return (
        <table>
            <tbody>
                <tr>
                    <th></th>
                    {tenses.map((tense, index) => (
                        <th key={index}>{tense === 'Preterite (Archaic)' ? 'Preterite' : tense}</th>
                    ))}
                </tr>
                {pronouns.map((pronoun, index) => (
                    <tr key={index}>
                        <td>{pronoun}</td>
                        {tenses.map((tense, index) => (
                            <td key={index} className={currentWord === filter(pronoun, mood, tense) ? "selected" : ""}>{words.length > 0 && filter(pronoun, mood, tense)}</td>
                        ))}
                    </tr>


                ))}

            </tbody>
        </table>
    )
}

export default Table