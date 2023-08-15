import React from 'react'
// forntAwsone icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

// single todo item
export const Todo = ({task, toggleComplete, deleteTodo, editTodo}) => {

  return (
    <div className='Todo'>
      {/* add class if isCompleted: true */}
      <p className={task.isCompleted ? "completed" : ""} onClick={() => toggleComplete(task)} >
        {task.name}
      </p>
      {/* action icons for edit and delete*/}
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  )
}
