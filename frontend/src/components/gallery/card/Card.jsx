import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import TaskFormModal from '../../taskFormModal/TaskFormModal'
import './card.scss'

const Card = ({
   handleCheckboxChange,
   handleDeleteTask,
   task,
   handleTaskAdded,
   showModifyTaskModal,
   setShowModifyTaskModal,
   handleModifyTask,
   taskToModify,
}) => {
   return (
      <div className={`card ${showModifyTaskModal ? 'card-modal-open' : ''}`}>
         <div className="modify-delet">
            <button onClick={() => handleModifyTask(task._id)}>
               <FontAwesomeIcon icon={faPen} />
            </button>
            <TaskFormModal
               onTaskAdded={handleTaskAdded}
               task={task}
               showModifyTaskModal={showModifyTaskModal}
               setShowModifyTaskModal={setShowModifyTaskModal}
               taskToModify={taskToModify}
            />

            <button onClick={() => handleDeleteTask(task._id)}>
               <FontAwesomeIcon icon={faTrash} />
            </button>
         </div>
         <h3>{task.taskName}</h3>
         <div className="category-date">
            <p className={task.category}>{task.category}</p>
            <p className="date">{task.createdAt}</p>
         </div>
         <p className="description">{task.description}</p>
         <label className="label-checkbox" htmlFor={`do-checkbox-${task._id}`}>
            Do{' '}
            <input
               type="checkbox"
               id={`do-checkbox-${task._id}`}
               checked={task.do}
               onChange={() => handleCheckboxChange(task._id, !task.do)}
            />
         </label>
      </div>
   )
}

export default Card
