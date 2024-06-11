import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import './login.scss'

const Login = () => {
   // State pour gérer l'affichage du formulaire de création de compte
   const [showCreateAccount, setShowCreateAccount] = useState(false)

   // State pour stocker l'email et le mot de passe saisis par l'utilisateur
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   // State pour gérer les messages d'erreur
   const [error, setError] = useState('')

   // Fonction pour basculer entre le formulaire de connexion et de création de compte
   const toggleCreateAccount = () => {
      setShowCreateAccount(!showCreateAccount)
   }

   // Fonction pour traiter la soumission du formulaire (connexion)
   const handleSubmit = async (event) => {
      event.preventDefault()

      try {
         // Appel API pour la connexion
         const response = await fetch(
            'https://taskpilot-9qwm.onrender.com/api/auth/login',
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  email,
                  password,
               }),
            }
         )

         // Vérifie si la réponse est OK
         if (!response.ok) {
            const errorData = await response.json()
            const errorMessage =
               errorData.message || 'An error occurred. Please try again later.'
            setError(errorMessage)
            return
         }

         // Traitement de la réponse
         const data = await response.json()
         if (!data.token) {
            setError('Invalid email or password. Please try again.')
            return // Arrêt ici si les identifiants sont incorrects
         }

         sessionStorage.setItem('token', data.token)
         navigate('/')
      } catch (error) {
         setError('An error occurred. Please try again later.')
         console.error('Error:', error.message)
      }
   }

   // Fonction pour traiter la soumission du formulaire de création de compte
   const handleCreateAccount = async (event) => {
      event.preventDefault()

      try {
         // Appel API pour la création de compte
         const response = await fetch(
            'https://taskpilot-9qwm.onrender.com/api/auth/signup',
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  email,
                  password,
               }),
            }
         )

         // Vérifie si la réponse est OK
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
         }

         // On traite la réponse ou redirige l'utilisateur après la création du compte
         console.log('compte ajouté avec succès')
      } catch (error) {
         setError('An error occurred. Please try again later.')
         console.error('Error:', error.message)
      }
   }

   // Initialiser le hook `useNavigate`
   const navigate = useNavigate()

   // Fonction pour traiter la soumission combinée
   const combinedSubmit = async (event) => {
      event.preventDefault()

      await handleCreateAccount(event)
      await handleSubmit(event)
   }

   const resetError = () => {
      setError('')
   }

   // Si le token existe, on se redirige vers la page home
   const token = sessionStorage.getItem('token')
   if (token !== null) {
      return <Navigate to="/" replace={true} />
   }

   // Rendu du composant
   return (
      <div className="login-page">
         <h2>{showCreateAccount ? 'Create an Account' : 'Login'}</h2>

         <form onSubmit={showCreateAccount ? combinedSubmit : handleSubmit}>
            <label>
               Email:
               <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onClick={resetError}
               />
            </label>
            <label>
               Password:
               <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={resetError}
               />
            </label>
            <button
               type="submit"
               disabled={!email || !password || password.length < 8}
            >
               {showCreateAccount ? 'Create Account' : 'Login'}
            </button>
         </form>

         {error && <p className="error-message">{error}</p>}

         <button className="create-account" onClick={toggleCreateAccount}>
            {showCreateAccount ? 'Back to Login' : 'Create an Account'}
         </button>
      </div>
   )
}

export default Login
