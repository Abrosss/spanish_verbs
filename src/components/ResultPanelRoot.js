import React from 'react'
import { capitalizeFirstLetter } from '../functions/functions'
function ResultPanelRoot({ word, setTableRequested, tableRequested }) {
  return (
    <>
      <p className='pronoun'><span className='selected'>{capitalizeFirstLetter(word.word)}</span> </p>
      <p className='italic'>{word.meaning[0].translation}</p>
      <p>show conjugation for <span onClick={() => setTableRequested(!tableRequested)} className='dotted'>{word.word} </span></p>
    </>
  )
}

export default ResultPanelRoot