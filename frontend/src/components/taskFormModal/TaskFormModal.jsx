import React, { useState, useEffect } from 'react'
import './taskFormModal.scss'

const TaskFormModal = ({
   onTaskAdded,
   task,
   children,
   showAddTaskModal,
   setShowAddTaskModal,
   showModifyTaskModal,
   setShowModifyTaskModal,
}) => {
   const [taskData, setTaskData] = useState({
      taskName: '',
      category: '',
      description: '',
   })

   useEffect(() => {
      // Si une tâche est sélectionnée, mettez à jour les données de la tâche
      if (task) {
         setTaskData({
            taskName: task.taskName,
            category: task.category,
            description: task.description,
         })
      }
   }, [task])

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setTaskData((prevData) => ({
         ...prevData,
         [name]: value,
      }))
   }

   const isFormValid = taskData.taskName !== '' && taskData.category !== ''

   const token = sessionStorage.getItem('token')

   const handleFormSubmit = async (e) => {
      e.preventDefault()
      try {
         if (isFormValid) {
            const apiUrl = task
               ? `http://localhost:3000/api/task/modifyTask/${task._id}`
               : 'http://localhost:3000/api/task'

            const requestMethod = task ? 'PUT' : 'POST'

            const headers = {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            }

            const response = await fetch(apiUrl, {
               method: requestMethod,
               headers: headers,
               body: JSON.stringify({
                  ...taskData,
               }),
            })

            if (response.ok) {
               setTaskData({
                  taskName: '',
                  category: '',
                  description: '',
               })
               if (task) {
                  setShowModifyTaskModal(false)
               } else {
                  setShowAddTaskModal(false)
               }
               onTaskAdded()
            } else {
               const errorResponse = await response.json()
               console.error(
                  `Error ${task ? 'modifying' : 'adding'} task:`,
                  response.status,
                  errorResponse
               )
            }
         }
      } catch (error) {
         console.error('Error sending request:', error)
      }
   }

   return (
      <>
         <button
            onClick={() =>
               task ? setShowModifyTaskModal(true) : setShowAddTaskModal(true)
            }
         >
            {children}
         </button>

         {(showAddTaskModal || showModifyTaskModal) && (
            <div
               className="modal-overlay"
               onClick={() =>
                  task
                     ? setShowModifyTaskModal(false)
                     : setShowAddTaskModal(false)
               }
            >
               <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <span
                     className="close"
                     onClick={() =>
                        task
                           ? setShowModifyTaskModal(false)
                           : setShowAddTaskModal(false)
                     }
                  >
                     &times;
                  </span>
                  <h2>{task ? 'Modify Task' : 'Add Task'}</h2>
                  <form onSubmit={handleFormSubmit}>
                     <label htmlFor="taskName">
                        Task Name:
                        <input
                           type="text"
                           name="taskName"
                           value={taskData.taskName}
                           onChange={handleInputChange}
                           id="taskName"
                        />
                     </label>
                     <label htmlFor="category">
                        Category:
                        <select
                           name="category"
                           value={taskData.category}
                           onChange={handleInputChange}
                           id="category"
                        >
                           <option value="">Select a category</option>
                           <option value="Private">Private</option>
                           <option value="Work">Work</option>
                           <option value="School">School</option>
                        </select>
                     </label>
                     <label htmlFor="description">
                        Description:
                        <textarea
                           name="description"
                           value={taskData.description}
                           onChange={handleInputChange}
                           id="description"
                           maxLength="100"
                        />
                     </label>
                     <button type="submit" disabled={!isFormValid}>
                        Validate
                     </button>
                  </form>
               </div>
            </div>
         )}
      </>
   )
}

export default TaskFormModal
