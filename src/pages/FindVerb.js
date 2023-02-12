import React from 'react'
import axios from '../api/axios';
import { useState, useRef } from 'react';
import Arrow from '../assets/images/arrow.svg';
import Arrow2 from '../assets/images/arrowNoCircle.svg';
import Clear from '../assets/images/cancel.svg';
import Table from '../components/Table';
import ResultPanelVerb from '../components/ResultPanelVerb';
import ResultPanelRoot from '../components/ResultPanelRoot';
import { useEffect } from 'react';

function FindVerb() {
  const [result, setResult] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tableRequested, setTableRequested] = useState(false)
  const [currentWord, setCurrentWord] = useState(null)
  const [error, setError] = useState(null)
  const [allWords, setAllWords] = useState([])
  const [isRoot, setIsRoot] = useState(false)
  const [currentMood, setCurrentMood] = useState(0)
  const [suggestions, setSuggestions] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

  let tenses = [
    {
      mood: "Indicative",
      tenses: ['Present', 'Preterite', 'Imperfect', 'Conditional', 'Future']
    },
    {
      mood: "Subjunctive",
      tenses: ['Present', 'Imperfect', 'Future']
    },
    {
      mood: "Perfect",
      tenses: ['Present Perfect', 'Preterite (Archaic)', 'Past Perfect', 'Conditional Perfect', 'Future Perfect']
    },
    {
      mood: "Subjunctive Perfect",
      tenses: ['Present Perfect', 'Past Perfect', 'Future Perfect']
    }
  ]
  const input = useRef()


  async function inputChange(request) {
    if (!request || input.current.value === '') {
      setSuggestions([])
      return
    }
    const response = await axios.get(`/searchVerbs/${request.toLowerCase()}`)
    setSuggestions(response.data)

    setError(null)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/verbs/pinta')
    }
    fetchData();
  }, []);

  async function getRoot(word) {
    const englishRoot = await getRootFromEnglish(word) //check if the word is in english and return the es translation
    if (englishRoot) return englishRoot

    const isRootES = await isRootAlready(word) //check if the word is already a root, then just return the root
    if (isRootES) return handleRoot(word)

    return handleNotRoot(word) // else if not english, and not the root then return the root for the word

  }
  async function handleRoot(spanishWord) {
    setIsRoot(true)
    return spanishWord
  }
  async function handleNotRoot(spanishWord) {
    setIsRoot(false)
    const response = await axios.get(`/verbs/${spanishWord.toLowerCase()}`);
    return response.data[0].meaning[0].infinitive || response.data[0].meaning[0].verb
  }
  async function getRootFromEnglish(englishWord) {
    try {
      const englishToSpanishRoot = await axios.get(`/roots/en/${englishWord.toLowerCase()}`);
      setIsRoot(true)
      return englishToSpanishRoot.data[0].word
    } catch (error) {
      return null
    }
  }
  async function isRootAlready(inputSpanishWord) {
    try {
      const response = await axios.get(`/verbs/${inputSpanishWord.toLowerCase()}`);
      if (response.data[0].meaning[0].tense === "Infinitive") {
        return true
      } else {
        return false
      }
    } catch (error) {
      if (error) return "No word found. Check the spelling"
    }
  }
  function validEnVerb(string) {
    let wordBreak = string.split(' ');

    // Check if the first word is 'to'
    if (wordBreak[0].toLowerCase() === "to") {
      // If so, remove it and join the remaining words back together
      wordBreak.shift();
      return wordBreak.join(' ');
    } else {
      // If not, return the original string
      return string;
    }
  }

  async function handleSubmit(e, word) {
    e.preventDefault()
    input.current.blur()
    setSuggestions([])
    setTableRequested(false)
    setCurrentWord(input.current.value)
    setIsLoaded(false);
    setLoading(true);
    const root = await getRoot(validEnVerb(word))
    const allVerbsForTable = await axios.get(`/roots/${root}`);
    const result = await axios.get(`/verbs/${word.toLowerCase()}`);
    if (result.data.length === 0) {
      const english = await axios.get(`/verbs/${root.toLowerCase()}`)
      if (english.data.length === 0) {
        setError("No word found. Check the spelling")
        setResult([])
      }
      else setResult(english.data)
    }
    else setResult(result.data)

    setAllWords(allVerbsForTable.data);
    setIsLoaded(true);
    setLoading(false);
  }

  function clearInput(e) {
    e.preventDefault()
    input.current.value = ''
    input.current.focus()
    setSuggestions([])
  }

  
  const handleArrowKeyDown = () => {

    if (selectedIndex === suggestions.length - 1) return;
    setSelectedIndex(prev => prev + 1)
    input.current.value = suggestions[selectedIndex + 1].word

  };

  const handleArrowKeyUp = (e) => {
    e.preventDefault()
    if (selectedIndex === 0) return;
    setSelectedIndex(prev => prev - 1)
    input.current.value = suggestions[selectedIndex - 1].word

  };
  function setMood(direction) {
    let lastIndex = tenses.length - 1
    if (direction === 'left') {
      if (currentMood === 0) setCurrentMood(lastIndex)
      else setCurrentMood(prev => prev - 1)
    }
    if (direction === 'right') {
      setCurrentMood(prev => prev + 1)
      if (currentMood === lastIndex) setCurrentMood(0)
    }
  }

  return (
    <>

      <header>
        <h1>Spanish Verbs</h1>
        <section className='searchBar'>
          <form tabIndex={-1} onKeyDown={e => {
            if (e.key === "ArrowDown") handleArrowKeyDown();
            if (e.key === "ArrowUp") handleArrowKeyUp(e);
          }}>
            <input autoFocus='on' spellcheck="false" className={suggestions.length > 0 ? 'suggestionsOn' : ''} ref={input} autoComplete='off' onChange={(e) => inputChange(e.target.value)} placeholder='Conjugate' name='word' ></input>
            <button onClick={(e) => handleSubmit(e, input.current.value)}><img src={Arrow} alt='arrow icon'></img></button>
            <button className={suggestions.length === 0 ? "clearButton hide" : "clearButton"} onClick={(e) => clearInput(e)}><img src={Clear} alt='clear icon'></img></button>
          </form>
          <ul className={suggestions.length === 0 ? 'suggestions hidden' : ' suggestions'}>
            {suggestions.map((suggestion, index) => (
              <li onClick={(e) => handleSubmit(e, suggestion.word)} key={index} className={index === selectedIndex ? 'selected suggestion' : 'suggestion'}>{suggestion.word} {suggestion.translation && '(' + suggestion.translation[0] + ')'}</li>
            ))}
          </ul>
        </section>


        <span className='note'>type a word in Spanish or English</span>
      </header>

      <main>
        {error && <span>{error}</span>}

        {loading &&
          <lord-icon
            src="https://cdn.lordicon.com/ekjuxqnh.json"
            trigger="loop"
            delay="2000"
            colors="primary:#6c63ff"
            style={{ width: "50px", height: "50px", opacity: ".8" }}>
          </lord-icon>
        }

        {isLoaded && result.map((word, index) => (
          <section key={index} className='resultPanel'>

            {isRoot ?
              <ResultPanelRoot word={word} tableRequested={tableRequested} setTableRequested={setTableRequested} /> :
              <ResultPanelVerb word={word} tableRequested={tableRequested} setTableRequested={setTableRequested} />}
          </section>
        ))
        }

        {isLoaded && tableRequested &&

          <section className='table'>
            <div className='moodNavigation'><button onClick={() => setMood('left')} className='leftArrow' title='previous'><img src={Arrow2} alt='left arrow'></img></button><h2>{tenses[currentMood].mood}</h2><button onClick={() => setMood('right')} className='rightArrow' title='next'><img src={Arrow2} alt='right arrow'></img></button></div>
            <Table currentWord={currentWord} words={allWords} mood={tenses[currentMood].mood} tenses={tenses[currentMood].tenses} />

          </section>

        }

      </main>
    </>
  );
}

export default FindVerb

 //if no en word found, check for ANY similarities and give a suggestion