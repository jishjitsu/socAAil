import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import FAQ from './pages/FAQ'
import LoginForm from './pages/Login'
import Pricing from './pages/Pricing'
import Dashboard from './authpages/Dashboard'
import Sidebar from './Dikhsuchi/Sidebar'
import Navbar from './Dikhsuchi/Navbar'
import Chatbot from './authpages/Chatbot'
import Writer from './authpages/Writer'
import Compiler from './authpages/Compiler'
import './tailwind.css'

// PrivateRoute component for protected routes
function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check localStorage for the token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token')

    console.log("Token in localStorage on mount:", token) // Debugging token

    if (token) {
      setIsAuthenticated(true)
    } else {
      console.log("No token found, user is not authenticated.")
    }
  }, [])  // Empty dependency array means this will run once on mount

  const handleLogin = (token) => {
    console.log("User logging in with token:", token) // Debugging login
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    console.log("Logging out...") // Debugging logout
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Only render Navbar when authenticated */}
      {!isAuthenticated && <Navbar />}

      <div className="flex flex-1">
        {/* Only render Sidebar when authenticated */}
        {isAuthenticated && <Sidebar handleLogout={handleLogout} />}

        <div className={`flex-1 ${isAuthenticated ? 'ml-16' : ''}`}>
          <Routes>
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Login route */}
            <Route 
              path="/login" 
              element={<LoginForm onLogin={handleLogin} />} 
            />

            {/* Protected routes */}
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
