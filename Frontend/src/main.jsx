import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import HomePage from './components/HomePage/HomePage.jsx'
import LoginPage from './components/Login/LoginPage.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import LinksPage from './components/LinksPage/LinksPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<HomePage/>}/>
      <Route path='login' element={<LoginPage />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='links' element={<LinksPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
