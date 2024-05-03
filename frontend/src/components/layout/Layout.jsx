import React from 'react'
import { useNavigate } from 'react-router-dom'

import './layout.scss'

const Layout = ({ children }) => {
   const token = sessionStorage.getItem('token')
   const navigate = useNavigate()

   const handleLogout = () => {
      sessionStorage.removeItem('token')
      navigate('/login')
   }

   return (
      <div className="app-container">
         <header>
            <h1>TaskPilot</h1>
            {token !== null && <button onClick={handleLogout}>Logout</button>}
         </header>
         <div className="main-content">{children}</div>
         <footer>
            <p>© 2024 Pierre Schnell</p>
         </footer>
      </div>
   )
}

export default Layout
