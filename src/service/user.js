import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/users'

const token = localStorage.getItem('token')

const headers = { Authorization: `Bearer ${token}` }

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const getAllUsers = async (page = 0, size = 10) => {
  try {
    const response = await apiClient.get('/all', {
      params: { page, size },
      headers,
    })
    console.log(response.data.result)
    return response.data.result
  } catch (error) {
    console.error('Error get all users', error)
    throw error
  }
}

const createUser = async (user) => {
  try {
    const response = await apiClient.post('/create', user, { headers })
    return response.data.result
  } catch (error) {
    console.error('Error add user:', error)
    throw error
  }
}

const updateUser = async (user) => {
  try {
    const response = await apiClient.put('/update', user, { headers })
    return response.data.result
  } catch (error) {
    console.error('Error update user:', error)
    throw error
  }
}

const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/delete/${id}`, { headers })
  } catch (error) {
    console.error('Error delete user:', error)
    throw error
  }
}

const userService = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
}

export default userService
