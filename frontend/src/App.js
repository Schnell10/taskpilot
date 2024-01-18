import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
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
