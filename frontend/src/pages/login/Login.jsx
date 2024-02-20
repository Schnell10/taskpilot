import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import './login.scss'

const Login = () => {
   // State pour gérer l'affichage du formulaire de création de compte
   const [showCreateAccount, setShowCreateAccount] = useState(false)

   // State pour stocker l'email et le mot de passe saisis par l'utilisateur
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   // Fonction pour basculer entre le formulaire de connexion et de création de compte
   const toggleCreateAccount = () => {
      setShowCreateAccount(!showCreateAccount)
   }

   // Fonction pour traiter la soumission du formulaire (connexion)
   const handleSubmit = async (event) => {
      event.preventDefault()

      try {
         // Appel API pour la connexion
         const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               email,
               password,
            }),
         })
         console.log('Response:', response)

         // Vérifier si la réponse est OK
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
         }

         // Traitement de la réponse
         const data = await response.json()
         if (data.token === undefined || data.token === null) {
            console.log('Error: Invalid token.')
         }
         sessionStorage.setItem('token', data.token)
         navigate('/')
      } catch (error) {
         console.error('Error:', error.message)
         console.log(document.cookie)
      }
   }

   // Fonction pour traiter la soumission du formulaire de création de compte
   const handleCreateAccount = async (event) => {
      event.preventDefault()

      try {
         // Appel API pour la création de compte
         const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               email,
               password,
            }),
         })

         // Vérifier si la réponse est OK
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
         }

         // Vous pouvez traiter la réponse ou rediriger l'utilisateur après la création du compte
         console.log('compte ajouté avec succé')
      } catch (error) {
         console.error('Error:', error.message)
      }
   }

   const token = sessionStorage.getItem('token')
   const navigate = useNavigate()

   const combinedSubmit = async (event) => {
      event.preventDefault()

      await handleCreateAccount(event)
      await handleSubmit(event)
   }

   // Si le token est existe, redirigez vers la page home
   return token !== null ? (
      <Navigate to="/" replace={true} />
   ) : (
      <div className="login-page">
         {/* Titre dynamique en fonction du formulaire actuellement affiché */}
         <h2>{showCreateAccount ? 'Create an Account' : 'Login'}</h2>

         {/* Formulaire de connexion ou de création de compte */}
         <form onSubmit={showCreateAccount ? combinedSubmit : handleSubmit}>
            <label>
               Email:
               {/* Champ de saisie pour l'email avec gestion de l'état */}
               <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </label>
            <label>
               Password:
               {/* Champ de saisie pour le mot de passe avec gestion de l'état */}
               <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </label>
            {/* Bouton pour soumettre le formulaire (connexion ou création de compte) */}
            <button type="submit">
               {showCreateAccount ? 'Create Account' : 'Login'}
            </button>
         </form>

         {/* Bouton pour afficher/cacher le formulaire de création de compte */}
         <button onClick={toggleCreateAccount}>
            {showCreateAccount ? 'Back to Login' : 'Create an Account'}
         </button>
      </div>
   )
}

export default Login
