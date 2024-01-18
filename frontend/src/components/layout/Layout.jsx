import React from 'react'

import './layout.scss'

const Layout = ({ children, isLoggedIn, handleLogout }) => {
   return (
      <div className="app-container">
         <header>
            <h1>TaskPilot</h1>
         </header>
         <div className="main-content">{children}</div>
         <footer>
            <p>© 2023 Your App</p>
         </footer>
      </div>
   )
}

export default Layout
