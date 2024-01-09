import React, { useState } from 'react'

import './login.scss'

const Login = () => {
   const [showCreateAccount, setShowCreateAccount] = useState(false)

   const toggleCreateAccount = () => {
      setShowCreateAccount(!showCreateAccount)
   }

   return (
      <div className="login-page">
         <h2>{showCreateAccount ? 'Create an Account' : 'Login'}</h2>

         {/* Formulaire de connexion */}
         {!showCreateAccount && (
            <form>
               <label>
                  Email:
                  <input type="email" placeholder="Enter your email" />
               </label>
               <label>
                  Password:
                  <input type="password" placeholder="Enter your password" />
               </label>
               <button type="submit">Login</button>
            </form>
         )}

         {/* Formulaire de création de compte */}
         {showCreateAccount && (
            <form>
               <label>
                  First Name:
                  <input type="text" placeholder="Enter your first name" />
               </label>
               <label>
                  Last Name:
                  <input type="text" placeholder="Enter your last name" />
               </label>
               <label>
                  Email:
                  <input type="email" placeholder="Enter your email" />
               </label>
               <label>
                  Password:
                  <input type="password" placeholder="Enter your password" />
               </label>
               <button type="submit">Create Account</button>
            </form>
         )}

         {/* Bouton pour afficher/cacher le formulaire de création de compte */}
         <button onClick={toggleCreateAccount}>
            {showCreateAccount ? 'Back to Login' : 'Create an Account'}
         </button>
      </div>
   )
}

export default Login
