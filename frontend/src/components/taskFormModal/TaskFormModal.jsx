import React, { useState } from 'react'
import './taskFormModal.scss'

const TaskFormModal = ({ onTaskAdded }) => {
   const [showModal, setShowModal] = useState(false)
   const [taskData, setTaskData] = useState({
      taskName: '',
      category: '',
      description: '',
   })

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setTaskData((prevData) => ({
         ...prevData,
         [name]: value,
      }))
   }

   const isFormValid = taskData.taskName !== '' && taskData.category !== ''

   const handleFormSubmit = async (e) => {
      e.preventDefault()
      try {
         if (isFormValid) {
            const response = await fetch('http://localhost:3000/api/task', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
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

               setShowModal(false)
               onTaskAdded()
            } else {
               const errorResponse = await response.json()
               console.error(
                  'Error adding task:',
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
         <button onClick={() => setShowModal(true)}>Add Task</button>

         {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
               <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <span className="close" onClick={() => setShowModal(false)}>
                     &times;
                  </span>
                  <h2>Add Task</h2>
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
                        <input
                           type="text"
                           name="category"
                           value={taskData.category}
                           onChange={handleInputChange}
                           id="category"
                        />
                     </label>
                     <label htmlFor="description">
                        Description:
                        <textarea
                           name="description"
                           value={taskData.description}
                           onChange={handleInputChange}
                           id="description"
                           maxlength="100"
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
