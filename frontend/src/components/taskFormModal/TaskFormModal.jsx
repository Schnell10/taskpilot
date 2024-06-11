import React, { useState, useEffect } from 'react'
import './taskFormModal.scss'

const TaskFormModal = ({
   onTaskAdded,
   taskToModify,
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
      // Si une tâche est sélectionnée, on remplie les champs avec les données de la tâche
      if (taskToModify) {
         setTaskData({
            taskName: taskToModify.taskName,
            category: taskToModify.category,
            description: taskToModify.description,
         })
      }
   }, [taskToModify])

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
            const apiUrl = taskToModify
               ? `https://taskpilot-9qwm.onrender.com/api/task/modifyTask/${taskToModify._id}`
               : 'https://taskpilot-9qwm.onrender.com/api/task'

            const requestMethod = taskToModify ? 'PUT' : 'POST'

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
               if (taskToModify) {
                  setShowModifyTaskModal(false)
               } else {
                  setShowAddTaskModal(false)
               }
               onTaskAdded()
            } else {
               const errorResponse = await response.json()
               console.error(
                  `Error ${taskToModify ? 'modifying' : 'adding'} task:`,
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
         {(showAddTaskModal || showModifyTaskModal) && (
            <div
               className="modal-overlay"
               onClick={() =>
                  taskToModify
                     ? setShowModifyTaskModal(false)
                     : setShowAddTaskModal(false)
               }
            >
               <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <span
                     className="close"
                     onClick={() =>
                        taskToModify
                           ? setShowModifyTaskModal(false)
                           : setShowAddTaskModal(false)
                     }
                  >
                     &times;
                  </span>
                  <h2>{taskToModify ? 'Modify Task' : 'Add Task'}</h2>
                  <form onSubmit={handleFormSubmit}>
                     <label htmlFor="taskName">
                        Task Name:
                        <input
                           type="text"
                           name="taskName"
                           value={taskData.taskName}
                           onChange={handleInputChange}
                           id="taskName"
                           maxLength={20}
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
