import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import FAQ from './pages/FAQ'
import LoginForm from './pages/Login'
import Pricing from './pages/Pricing'
import Dashboard from './User_pages/Dashboard'
import Sidebar from './Dikhsuchi/Sidebar'
import Navbar from './Dikhsuchi/Navbar'
import Chatbot from './User_pages/Chatbot'
import Writer from './User_pages/Writer'
import Compiler from './User_pages/Compiler'
import './tailwind.css'

// PrivateRoute component for protected routes
function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (token) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1">
        {isAuthenticated && <Sidebar handleLogout={handleLogout} />}

        <div className={`flex-1 ${isAuthenticated ? 'ml-16' : ''}`}>
          <Routes>
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Chatbot />
                </PrivateRoute>
              }
            />
            <Route
              path="/writer"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Writer />
                </PrivateRoute>
              }
            />
            <Route
              path="/compiler"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Compiler />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
