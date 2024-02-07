import React from 'react'
import './gallery.scss'
import Card from './card/Card'

const Gallery = ({ handleCheckboxChange, handleDeleteTask, tasks }) => {
   // Rendu du composant
   return (
      <div className="gallery">
         {tasks.map((task) => (
            <figure key={task._id}>
               <Card
                  handleCheckboxChange={handleCheckboxChange}
                  handleDeleteTask={handleDeleteTask}
                  task={task}
               />
               {/* On fait passer les props au composant Card*/}
            </figure>
         ))}
      </div>
   )
}

export default Gallery
