import axios from 'axios'

const baseDomain = 'https://pokeapi.co/api/v2'

const api = axios.create({
  baseURL: baseDomain
})

api.interceptors.response.use(null, error => {
  console.log(error.response)
  if (error.response?.status === 404) {
    import('@/router').then(({ default: router }) => {
      router.push('/lost-in-the-tall-grass')
    })
  }
  return Promise.reject(error)
})

export default api
