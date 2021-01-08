import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://api_explorer:8085/api/v1'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  responseType: 'json',
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || error.message || 'Something went wrong'
    )
)

export default axiosInstance
