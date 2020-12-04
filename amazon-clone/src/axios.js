import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://us-central1-clone-3e0ac.cloudfunctions.net/api'  // THE API {cloudFunction} URL
})

export default instance


// LOCAL
//http://localhost:5001/clone-3e0ac/us-central1/api

