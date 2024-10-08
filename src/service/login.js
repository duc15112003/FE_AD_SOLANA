import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = 'http://localhost:8080/api/auth'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const LoginProcess = async (username, password) => {
  try {
    console.log('Username:', username)
    console.log('Password:', password)

    const response = await apiClient.post('/login', { username, password })

    console.log('Response data:', response.data)

    localStorage.setItem('token', response.data.accessToken)
    localStorage.setItem('us', username)
    const decordToken = jwtDecode(response.data.accessToken)
    localStorage.setItem('role', decordToken.roles)
    return 'oke'
  } catch (error) {
    if (error.response) {
      // Client received an error response (5xx, 4xx)
      console.error('Response error data:', error.response.data)
      console.error('Response status:', error.response.status)
      console.error('Response headers:', error.response.headers)
    } else if (error.request) {
      // Client never received a response, or request never left
      console.error('No response received:', error.request)
    } else {
      // Anything else
      console.error('Error message:', error.message)
    }
    throw error
  }
}

const LoginService = {
  LoginProcess,
}

export default LoginService
