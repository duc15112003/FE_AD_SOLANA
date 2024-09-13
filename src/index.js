import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App'
import store from './store'
import { AuthProvider } from 'src/AuthContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>,
)
