import React, {useState} from 'react'

// edit existing item form
export const EditTodoForm = ({editTodo, task}) => {
  const [value, setValue] = useState(task.name);

  const addTask = (e) => {
    e.preventDefault();

    //add task on submit
    editTodo(value, task);

    //clear input field after submit
    setValue("");
  }

  return (
    <form className="todo-form" onSubmit={addTask}>
      <input type="text" className="todo-input" value={value} placeholder='Edit todo item' onChange={(e) => setValue(e.target.value)} />
      <button type="submit" className='add-btn'>Update</button>
    </form>
  )
}
