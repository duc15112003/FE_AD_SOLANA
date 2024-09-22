import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/admin'

const token = localStorage.getItem('token')

const headers = { Authorization: `Bearer ${token}` }

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const getAllAdmins = async (page = 0, size = 10) => {
    try {
      const response = await apiClient.get('/all', {
        params: { page, size },
        headers,
      })
      console.log(response.data.result.content)
      return response.data.result.content
    } catch (error) {
      console.error('Error get all admins', error)
      throw error
    }
  }
  
  const createAdmin = async (admin) => {
    try {
      const response = await apiClient.post('/create', admin, { headers })
      return response.data.result
    } catch (error) {
      console.error('Error add admin:', error)
      throw error
    }
  }
  
  const updateAdmin = async (admin) => {
    try {
      const response = await apiClient.put('/update', admin, { headers })
      return response.data.result
    } catch (error) {
      console.error('Error update admin:', error)
      throw error
    }
  }
  
  const deleteAdmin = async (id) => {
    try {
      const response = await apiClient.delete(`/id/${id}`, { headers })
    } catch (error) {
      console.error('Error delete admin:', error)
      throw error
    }
  }

  const adminService = {
    getAllAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin
  }

  export default adminService

