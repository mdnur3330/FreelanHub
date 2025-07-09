import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { ruter } from './Route/Router'
import AuthProvider from './providers/AuthProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={ruter}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
