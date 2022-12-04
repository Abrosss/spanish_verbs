
import './css/styles.css';
import axios from './api/axios';
import { useState, useRef } from 'react';
import Arrow from './assets/images/arrow.svg';
import SpainFlag from './assets/images/spain.svg';
import Table from './components/Table';
import ResultPanelVerb from './components/ResultPanelVerb';
import ResultPanelRoot from './components/ResultPanelRoot';
function App() {

  const [result, setResult] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tableRequested, setTableRequested] = useState(false)
  const [currentWord, setCurrentWord] = useState(null)
  const [error, setError] = useState(null)
  const [allWords, setAllWords] = useState([])
  const [isRoot, setIsRoot] = useState(false)

  const input = useRef()

console.log(allWords)
  function validInput(string) {
    let err = 'delete spaces or try again'
    let array = string.split(' ')
    if (array.length > 1) {

      return err
    }
    else return
  }
  function inputChange(e) {

    setError(null)
  }

  async function handleSubmit(e, word) {
    e.preventDefault()
    setTableRequested(false)
    setCurrentWord(input.current.value)
    const err = validInput(word)
    if (err) setError(err)
    let root
    if (!err) {
      setIsLoaded(false)
      setLoading(true)
      await axios.get(`/verbs/${word.toLowerCase()}`).then((response) => {
        setResult(response.data)
        if (response.data[0].meaning[0].tense === "Infinitive") {
          root = word
          setIsRoot(true)
        }

        else {
          root = response.data[0].meaning[0].infinitive
          setIsRoot(false)
        }
      }).catch(err => {
        if (err) setError('No word found. Check the spelling')
      })
      await axios.get(`/roots/${root}`).then((response) => {
        setAllWords(response.data)
        setIsLoaded(true)
        setLoading(false)
      });
    }


  }


  return (
    <>
      <nav>
        <a href='/'><img src={SpainFlag} alt='es flag icon'></img> Spanish Verbs</a>
      </nav>
      <header>
        <h1>Spanish Verbs</h1>
        <form>
          <input autoFocus='on' ref={input} autoComplete='off' onChange={inputChange} placeholder='Conjugate' name='word'></input>
          <button onClick={(e) => handleSubmit(e, input.current.value)}><img src={Arrow} alt='arrow icon'></img></button>
        </form>
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
            <h2>Indicative</h2>
            <Table currentWord={currentWord} words={allWords} />
          </section>}

      </main>
    </>
  );
}

export default App;
