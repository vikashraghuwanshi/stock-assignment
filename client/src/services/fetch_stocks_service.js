import axios from 'axios'

let baseUrl = `/api/fetchStockData`

const fetch = async data => {
  const response = await axios.post(baseUrl, data)
  return response
}

export default { fetch }