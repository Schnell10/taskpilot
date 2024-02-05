import React from 'react'
import './home.scss'
import { Navigate } from 'react-router-dom'
import TaskList from '../../components/taskList/TaskList'
import TaskFormModal from '../../components/taskFormModal/TaskFormModal'

const Home = () => {
   // Vérifiez si le token n'existe pas
   const isTokenMissing = sessionStorage.getItem('token') === null

   // Si le token est manquant, redirigez vers la page de connexion
   return isTokenMissing ? (
      <Navigate to="/login" replace={true} />
   ) : (
      // Affichez la liste de tâches si le token est présent
      <div className="home-page">
         <h2>My Tasks</h2>
         <TaskFormModal />
         <TaskList />
      </div>
   )
}

export default Home
