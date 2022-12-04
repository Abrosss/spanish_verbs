import React from 'react'

function ApiInfo() {
  const snippet = `{
    [
      {
        "word": "pinto",
        "meaning": [
          {
            "performer": "yo",
            "mood": "Indicative",
            "infinitive": "pintar",
            "performer_en": "I",
            "tense": "Present",
            "translation": "to paint"
          }
        ]
      }
    ]
  }`
  const tag = `<word>`
  return (
    <main>
      <section className='apiInfo'>
        <h1>Get verb information</h1>
        <p><span className='bold'>Usage:</span> to get meaning of a Spanish verb, you can send request to</p>
        <p><code><span className='bold'>https://spanish-verbs-api.vercel.app/api/verbs/</span><span className='italic colored'>{tag}</span></code></p>
        <p className='bold'>Example:</p>
        <p className='exampleRequest'><code><span className='bold'>https://spanish-verbs-api.vercel.app/api/verbs/</span><span className='italic'>pinto</span></code></p>
        <pre>
          <code>{snippet}</code>
        </pre>
      </section>
    </main>
  )
}

export default ApiInfo