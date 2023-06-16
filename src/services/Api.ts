import axios from 'axios'

import Config from 'Config'

const Api = axios.create({
  baseURL: `${Config.api.baseUrl}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Config.api.token}`,
  },
})

export default Api
