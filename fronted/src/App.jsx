import React from 'react'
import { Routes, Route } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Interview from './pages/Interview'
import Analytics from './pages/Analytics'
import ResumeUpload from './pages/Resume'
import Certificate from './pages/Certificate'
import Logout from './pages/logout'
import Protected from './api/auth/components/protected'
import Chatbot from './pages/chatbot'
// import FaceLogin from './pages/faceLogin'
// import FaceRegister from './pages/faceRegister'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Protected><Home /></Protected>} />
        <Route path="/login" element={<Login />} />
        <Route path="/analytics" element={<Protected><Analytics /></Protected>} />
        <Route path="/resume" element={<Protected><ResumeUpload /></Protected>} />
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/interview" element={<Protected><Interview /></Protected>} />
        <Route path="/certificate" element={<Protected><Certificate /></Protected>} />
        <Route path="/logout" element={<Protected><Logout /></Protected>} />
        <Route path="/chatbot" element={<Chatbot />} />
        {/* <Route
          path="/face-register"
          element={<FaceRegister />}
        />

        <Route
          path="/face-login"
          element={<FaceLogin />}
        /> */}
      </Routes>

    </div>
  )
}

export default App
