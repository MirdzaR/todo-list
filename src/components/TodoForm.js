import React, {useState} from 'react'

export const TodoForm = ({addTodo}) => {
  const [name, setName] = useState("");

  const addName = (e) => {
    e.preventDefault();

    // Set const with default isCompleted and isEditing values
    const todoItem = {
      name,
      "isCompleted": false,
      "isEditing": false
    };

    if(name.trim() === ''){
      // Input is empty
      alert('Input is empty! Please add value to input field!');
      return;
    } else {
      fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoItem)
      }).then(() => {
        console.log(todoItem)
      })
    }

    //add TodoItem on submit
    addTodo(name);

    //clear input field after submit
    setName("");
  }

  return (
    <form className="todo-form" onSubmit={addName}>
      <input type="text" className="todo-input" value={name} placeholder='Add todo item' onChange={(e) => setName(e.target.value)} />
      <button type="submit" className='add-btn'>Add</button>
    </form>
  )
}

export default TodoForm;
