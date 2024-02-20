import React from 'react'
import './taskFilter.scss'

const TaskFilter = ({ setShowToDoTasks, showToDoTasks }) => {
   return (
      <div className="task-filter">
         <button
            onClick={() => {
               setShowToDoTasks(false)
               console.log('Set to true')
            }}
            className={`do-done to-do-task ${
               showToDoTasks === false ? 'showToDoTask' : ''
            }`}
         >
            Show To-Do Tasks
         </button>
         <button
            onClick={() => {
               setShowToDoTasks(true)
               console.log('Set to false')
            }}
            className={`do-done done-task ${
               showToDoTasks ? 'showDoneTask' : ''
            }`}
         >
            Show Done Tasks
         </button>
      </div>
   )
}

export default TaskFilter
