import React, {useEffect, useState} from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

export const TodoWrapper = () => {
  // Set const
  const [todos, setTodos] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // load todos list from assets/db.json
  useEffect(() => {
    fetch('http://localhost:8000/todos')
      .then(res => {
        if(!res.ok) {
          throw Error('Could not fetch the data');
        }
        return res.json();
      })
      .then((data) => {
        setTodos(data);
        setIsPending(false);
        setError(null);
      })
      .catch(err => {
        setIsPending(false);
        setError(err.message);
      })
  }, []);

  // Add TodoItem on submit
  const addTodo = (todo) => {
    setTodos([...todos, {name: todo}]);
  }

  // Toggle isComplete value
  const toggleComplete = (item) => {
    fetch('http://localhost:8000/todos/' + item.id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...item,
        "isCompleted": !item.isCompleted
      })
    }).then(() => {
      setTodos(
        todos.map((todo) =>
        todo.id === item.id ? { ...todo, isCompleted: !todo.isCompleted} : todo)
      )
    })
  }

  // Delete TodoItem
  const deleteTodo = (id) => {
    fetch('http://localhost:8000/todos/' + id, {
      method: 'DELETE'
    }).then(() => {
      setTodos(todos.filter(todo => todo.id !== id))
    })
  }

  // Edit todo
  const editTodo = (task) => {
    fetch('http://localhost:8000/todos/' + task.id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "name": task.name,
        "isEditing": !task.isEditing
      })}).then(() => {
        setTodos(
          todos.map((todo) => todo.id === task.id ? { ...todo, isEditing: !todo.isEditing} : todo)
        )
      })
  }

  // Edit task
  const editTask = (task, item) => {
    if(task.trim() === ''){
      // Input is empty
      alert('Input is empty! Please add value to input field!');
      // item is set back to previous state/value
      setTodos(
        todos.map((todo) =>
        todo.id === item.id ? { ...todo, isEditing: false, name: item.name, isCompleted: item.isCompleted} : todo)
      )
      return;
    } else {
      // update db with updated value, set isCompleted, isEditing to false
      fetch('http://localhost:8000/todos/' + item.id, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          "name": task,
          "isCompleted": false,
          "isEditing": false
        })
      }).then(() => {
        setTodos(
          todos.map((todo) =>
          todo.id === item.id ? { ...todo, isEditing: !todo.isEditing, name: task, isCompleted: false} : todo)
        )
      })
    }
  }

  return (
    <div className="main-container">
      <h1>Todo List</h1>

      {/* Render todo form */}
      <TodoForm addTodo={addTodo} />

      {/* Show error message if any */}
      { error && <div>{ error }</div> }

      {/* Show pending pessage while loading */}
      { isPending && <div>Loading...</div> }

      {/* Todos list */}
      {todos && todos.map((todo, index) => (
        todo.isEditing ? (
          // open edit form is marked for editting
          <EditTodoForm editTodo={editTask} task={todo} key={index} />
        ) : (
          // basic todo list
          <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />)
      ))}
    </div>
  )
}
