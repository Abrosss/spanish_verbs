import axios from 'axios'

export default axios.create({
    baseURL: 'https://spanish-verbs-api.vercel.app/api'
})

