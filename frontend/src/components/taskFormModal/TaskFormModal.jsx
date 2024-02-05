import React, { useState } from 'react'
import './taskFormModal.scss'

const TaskFormModal = () => {
   const [showModal, setShowModal] = useState(false)
   const [taskData, setTaskData] = useState({
      taskName: '',
      dueDate: '',
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

   const isFormValid =
      taskData.taskName !== '' &&
      taskData.dueDate !== '' &&
      taskData.category !== ''

   const handleFormSubmit = async (e) => {
      e.preventDefault()
      try {
         if (isFormValid) {
            // Formatez la date ici avant de l'envoyer
            const formattedDueDate = new Date(taskData.dueDate).toISOString()

            const response = await fetch('http://localhost:3000/api/task', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ ...taskData, dueDate: formattedDueDate }),
            })

            if (response.ok) {
               setTaskData({
                  taskName: '',
                  dueDate: '',
                  category: '',
                  description: '',
               })

               setShowModal(false)
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
                     <label>
                        Task Name:
                        <input
                           type="text"
                           name="taskName"
                           value={taskData.taskName}
                           onChange={handleInputChange}
                        />
                     </label>
                     <label>
                        Due Date:
                        <input
                           type="date"
                           name="dueDate"
                           value={taskData.dueDate}
                           onChange={handleInputChange}
                        />
                     </label>
                     <label>
                        Category:
                        <input
                           type="text"
                           name="category"
                           value={taskData.category}
                           onChange={handleInputChange}
                        />
                     </label>
                     <label>
                        Description:
                        <textarea
                           name="description"
                           value={taskData.description}
                           onChange={handleInputChange}
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
