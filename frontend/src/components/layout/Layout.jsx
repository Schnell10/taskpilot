import React from 'react'
import { Link } from 'react-router-dom'
import './layout.scss'

const Layout = ({ children, isLoggedIn, handleLogout }) => {
   return (
      <div className="app-container">
         <header>
            <h1>TaskPilot</h1>
         </header>
         <nav>
            <ul>
               <li>
                  <Link to="/">Home</Link>
               </li>
               {isLoggedIn ? (
                  <li>
                     <button onClick={handleLogout}>Logout</button>
                  </li>
               ) : (
                  <li>
                     <Link to="/login">Login</Link>
                  </li>
               )}
            </ul>
         </nav>
         <div className="main-content">{children}</div>
         <footer>
            <p>© 2023 Your App</p>
         </footer>
      </div>
   )
}

export default Layout
