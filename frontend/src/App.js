import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './components/login/Login'
import Home from './pages/Home'
import './styles/styles.scss'

const App = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   const handleLogout = () => {
      // Logique de déconnexion ici
      setIsLoggedIn(false)
   }

   return (
      <Router>
         <Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout}>
            <Routes>
               <Route path="/login" element={<Login />}></Route>
               <Route path="/" element={<Home />}></Route>
            </Routes>
         </Layout>
      </Router>
   )
}

export default App
