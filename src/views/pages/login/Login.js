import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { AuthContext } from 'src/AuthContext'
import LoginService from 'src/service/login'

const Login = () => {
  const { isLoggedIn, login } = useContext(AuthContext)

  const [variable, setVariable] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000) // Chờ 2 giây trước khi chuyển hướng
    }
  }, [isLoggedIn])

  const handleUsernameChange = (e) => {
    const { value } = e.target

    //Cái preState này là đại diện cho một đối tượng có giá trị cũ, còn cái ...preState là cái sao chép những thuộc tính của đối tượng cũ,
    // cụ thể khi mình cập nhật thuộc tính username thì cái password nó là giá trị cũ được giữ nguyên, còn giá trị mới ở đây chính là username
    setVariable((prevState) => ({
      ...prevState,
      username: value,
    }))
  }

  //Hàm này để cập nhật giá trị password mỗi khi nhập
  const handlePasswordChange = (e) => {
    const { value } = e.target

    //Cái preState này là đại diện cho một đối tượng có giá trị cũ, còn cái ...preState là cái sao chép những thuộc tính của đối tượng cũ,
    // cụ thể khi mình cập nhật thuộc tính password thì cái username nó là giá trị cũ được giữ nguyên, còn giá trị mới ở đây chính là password
    setVariable((prevState) => ({
      ...prevState,
      password: value,
    }))
  }

  //Còn này là cái hàm login chính thức nè, nhân giá trị username và password từ biến mảng variable
  const handleLogin = async (e) => {
    e.preventDefault() // Ngăn chặn hành động mặc định của sự kiện
    try {
      // Gọi hàm login với đối tượng chứa thông tin đăng nhập
      await LoginService.LoginProcess(variable.username, variable.password)
      login()
    } catch (error) {
      setTimeout(() => {
        alert('Tài khoản hoặc mật khẩu sai')
      }, 2000) // Chờ 2 giây trước khi ẩn thông báo
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        onChange={handleUsernameChange}
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={handleLogin} color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
