import React, { useState, useEffect } from 'react'
import './taskList.scss'

// Composant TaskList
const TaskList = () => {
   // État local pour stocker les tâches récupérées de l'API
   const [tasks, setTasks] = useState([])

   const handleCheckboxChange = async (taskId, newStatus) => {
      try {
         const response = await fetch(
            `http://localhost:3000/api/task/${taskId}`,
            {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ do: newStatus }),
            }
         )

         if (response.ok) {
            const updatedTasks = tasks.map((task) =>
               task._id === taskId ? { ...task, do: newStatus } : task
            )

            setTasks(updatedTasks)
         } else {
            console.error('Error updating task status:', response.status)
         }
      } catch (error) {
         console.error('Error sending request:', error)
      }
   }

   // Effet useEffect pour récupérer les tâches lors du montage du composant
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch('http://localhost:3000/api/task')
            const data = await response.json()

            // Formatez la date dans chaque tâche avant de mettre à jour l'état
            const formattedData = data.map((task) => {
               // Assurez-vous que la propriété "dueDate" existe avant de la formater
               if (task.dueDate) {
                  const formattedDueDate = new Date(
                     task.dueDate
                  ).toLocaleDateString('en-CA', {
                     year: 'numeric',
                     month: '2-digit',
                     day: '2-digit',
                  })

                  return { ...task, dueDate: formattedDueDate }
               }
               return task
            })

            setTasks(formattedData)
         } catch (error) {
            // Gestion des erreurs lors de la récupération des données
            console.error('Erreur de récupération des données:', error)
         }
      }

      // Appel de la fonction fetchData
      fetchData()
   }, []) // Le tableau vide en tant que dépendance garantit que useEffect s'exécute une seule fois lors du montage

   // Rendu du composant
   return (
      <table>
         <thead>
            <tr>
               <th>Title</th>
               <th>Due Date</th>
               <th>Category</th>
               <th>Status</th>
            </tr>
         </thead>
         <tbody>
            {/* Mapping sur le tableau de tâches pour créer les lignes du tableau */}
            {tasks.map((task, index) => (
               <tr key={index}>
                  {/* Cellules pour chaque propriété de la tâche */}
                  <td>{task.taskName}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.category}</td>
                  <td>
                     <input
                        type="checkbox"
                        checked={task.do}
                        onChange={() =>
                           handleCheckboxChange(task._id, !task.do)
                        }
                     />
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   )
}

// Export du composant TaskList
export default TaskList
