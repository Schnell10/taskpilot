import React from 'react'
import Card from './card/Card'
import './gallery.scss'

const Gallery = ({
   handleCheckboxChange,
   handleDeleteTask,
   tasks,
   handleTaskAdded,
   showModifyTaskModal,
   setShowModifyTaskModal,
   handleModifyTask,
   taskToModify,
}) => {
   return (
      <div
         className={`gallery ${
            showModifyTaskModal ? '' : 'gallery-modal-close'
         }`}
      >
         {tasks.map((task) => (
            <figure className="figure-gallery" key={task._id}>
               <Card
                  handleCheckboxChange={handleCheckboxChange}
                  handleDeleteTask={handleDeleteTask}
                  task={task}
                  handleTaskAdded={handleTaskAdded}
                  showModifyTaskModal={showModifyTaskModal}
                  setShowModifyTaskModal={setShowModifyTaskModal}
                  handleModifyTask={handleModifyTask}
                  taskToModify={taskToModify}
               />
            </figure>
         ))}
      </div>
   )
}

export default Gallery
