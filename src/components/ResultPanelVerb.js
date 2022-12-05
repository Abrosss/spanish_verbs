import React from 'react'
import { capitalizeFirstLetter } from '../functions/functions'
function ResultPanelVerb({ word, setTableRequested, tableRequested }) {
  return (
   <>
   <p className='pronoun'>{word.meaning[0].performer && capitalizeFirstLetter(word.meaning[0].performer)} <span className='selected'>{word.word}</span> </p>
   <p className='italic'>{word.meaning[0].translation}</p>
   <p>show conjugation for <span onClick={() => setTableRequested(!tableRequested)} className='dotted'>{word.meaning[0].infinitive ||word.meaning[0].verb  } </span></p> 
   </>
  )
}

export default ResultPanelVerb