import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-3e0ac/us-central1/api'  // THE API {cloudFunction} URL
})

export default instance


