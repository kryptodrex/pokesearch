import axios from 'axios'
import router from '@/router'

// You can use your own logic to set your local or production domain
const baseDomain = 'https://pokeapi.co/api/v2'
// The base URL is empty this time due we are using the jsonplaceholder API
const baseURL = `${baseDomain}`

const api = axios.create({
  baseURL
})

api.interceptors.response.use(null, error => {
  // console.log(router)
  console.log(error.response)
  let path = '/error'
  switch (error.response.status) {
    case 404:
      path = '/lost-in-the-tall-grass'
      break
  }
  // console.log(path)
  router.push(path)
  return Promise.reject(error)
  // return error
})

export default api
