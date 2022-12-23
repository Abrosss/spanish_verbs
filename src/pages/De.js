import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
function De() {
    const [data, setData] = useState([])
    async function doThis() {
        await axios.get('/words').then((response) => {
            setData(response.data)
          });
    }
let newWord = []
    if(data.length > 0) {
        data.map(word => {
            word.meaning.map(meaning => {
                newWord.push({word:word.word, translation: meaning.translation })
               
            })
            
        })
       
    }

  newWord.map(word => {
        word.translation.split(';').map(splitted => {
            console.log(splitted.split(' ').filter(word => word !== 'to').filter(word => word !== '').join('').split('[')[0])
        })
    })
    useEffect(() => {
        doThis()
    }, [])
  return (
    <div>de</div>
  )
}

export default De