import React from 'react'
import './taskFilter.scss'

const TaskFilter = ({ setShowToDoTasks }) => {
   return (
      <div>
         <button
            onClick={() => {
               setShowToDoTasks(false)
               console.log('Set to true')
            }}
         >
            Show To-Do Tasks
         </button>
         <button
            onClick={() => {
               setShowToDoTasks(true)
               console.log('Set to false')
            }}
         >
            Show Done Tasks
         </button>
      </div>
   )
}

export default TaskFilter
