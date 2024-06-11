import React, { useState, useEffect } from 'react'
import './home.scss'
import { Navigate } from 'react-router-dom'

import TaskFormModal from '../../components/taskFormModal/TaskFormModal'
import Gallery from '../../components/gallery/Gallery'
import TaskFilter from '../../components/taskFilter/TaskFilter'

const Home = () => {
   const [tasks, setTasks] = useState([])
   const [showToDoTasks, setShowToDoTasks] = useState(false)
   const [showAddTaskModal, setShowAddTaskModal] = useState(false)
   const [showModifyTaskModal, setShowModifyTaskModal] = useState(false)
   const [taskToModify, setTaskToModify] = useState(null)

   const token = sessionStorage.getItem('token')

   const handleModifyTask = (taskId) => {
      const taskToModify = tasks.find((task) => task._id === taskId)
      setShowModifyTaskModal(true)
      setTaskToModify(taskToModify)
   }

   const handleCheckboxChange = async (taskId, newStatus) => {
      try {
         const response = await fetch(
            `https://taskpilot-9qwm.onrender.com/api/task/modifyDo/${taskId}`,
            {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify({ do: newStatus }),
            }
         )

         if (response.ok) {
            const updatedTasks = tasks.map((task) =>
               task._id === taskId ? { ...task, do: newStatus } : task
            )

            setTasks(updatedTasks)
            fetchTasks() //Permet de passer la tache dans la partie en cour ou faite sans rafraichir la page
         } else {
            console.error('Error updating task status:', response.status)
         }
      } catch (error) {
         console.error('Error sending request:', error)
      }
   }

   const handleDeleteTask = async (taskId) => {
      try {
         const response = await fetch(
            `https://taskpilot-9qwm.onrender.com/api/task/${taskId}`,
            {
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
               },
            }
         )

         if (response.ok) {
            const updatedTasks = tasks.filter((task) => task._id !== taskId)
            setTasks(updatedTasks)
            console.log('Task deleted successfully.')
         } else {
            const errorText = await response.text()
            console.error('Error deleting task:', response.status)
            console.error('Error details:', errorText)
         }
      } catch (error) {
         console.error('Error sending delete request:', error)
      }
   }

   const fetchTasks = async () => {
      console.log(showToDoTasks)
      // Requête fetch pour récupérer les tâches
      try {
         const response = await fetch(
            'https://taskpilot-9qwm.onrender.com/api/task',
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         if (response.ok) {
            const data = await response.json()

            //On tri selon tache en cour ou terminé
            const dataFilter = showToDoTasks
               ? data.filter((task) => task.do)
               : data.filter((task) => !task.do)

            // Formate la date dans chaque tâche avant de mettre à jour l'état
            const formattedData = dataFilter.map((task) => {
               if (task.createdAt) {
                  const formattedCreatedAt = new Date(
                     task.createdAt
                  ).toLocaleDateString('en-CA', {
                     year: 'numeric',
                     month: '2-digit',
                     day: '2-digit',
                     timeZone: 'Europe/Paris',
                  })

                  return { ...task, createdAt: formattedCreatedAt }
               }
               return task
            })

            setTasks(formattedData)
         } else {
            console.error('Erreur de requête:', response.status)
         }
      } catch (error) {
         console.error('Erreur de récupération des données:', error)
      }
   }
   useEffect(() => {
      fetchTasks() // Appel fetchTasks() lors du montage du composant
   }, [showToDoTasks])

   // Fonction pour mettre à jour les tâches après l'ajout réussi d'une nouvelle tâche
   const handleTaskAdded = () => {
      fetchTasks()
   }

   // Vérifie si le token n'existe pas
   const isTokenMissing = sessionStorage.getItem('token') === null

   // Si le token est manquant, redirrection vers la page de connexion
   return isTokenMissing ? (
      <Navigate to="/login" replace={true} />
   ) : (
      // Affiche la liste de tâches si le token est présent
      <div className="home-page">
         <div className="title-filter">
            <h2>My Tasks</h2>
            <TaskFilter
               setShowToDoTasks={setShowToDoTasks}
               showToDoTasks={showToDoTasks}
            />
            <div>
               <button
                  className="button-add-task"
                  onClick={() => setShowAddTaskModal(true)}
               >
                  {' '}
                  Add Task{' '}
               </button>

               <TaskFormModal
                  onTaskAdded={handleTaskAdded}
                  showAddTaskModal={showAddTaskModal}
                  setShowAddTaskModal={setShowAddTaskModal}
               >
                  Add Task
               </TaskFormModal>
            </div>
         </div>
         <Gallery
            handleCheckboxChange={handleCheckboxChange}
            handleDeleteTask={handleDeleteTask}
            tasks={tasks}
            handleTaskAdded={handleTaskAdded}
            showModifyTaskModal={showModifyTaskModal}
            setShowModifyTaskModal={setShowModifyTaskModal}
            handleModifyTask={handleModifyTask}
            taskToModify={taskToModify}
         />
      </div>
   )
}

export default Home
