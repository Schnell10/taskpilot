import React from 'react'
import './card.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Card = ({ handleCheckboxChange, handleDeleteTask, task }) => {
   return (
      <div className="card">
         <button onClick={() => handleDeleteTask(task._id)}>
            <FontAwesomeIcon icon={faTrash} />
         </button>
         <h3>{task.taskName}</h3>
         <div className="category-date">
            <p className="category">{task.category}</p>
            <p className="date">{task.createdAt}</p>
         </div>
         <p className="description">{task.description}</p>
         <label htmlFor={`do-checkbox-${task._id}`}>
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
