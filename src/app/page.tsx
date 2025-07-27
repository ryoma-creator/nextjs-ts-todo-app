'use client'

import React from 'react'
import { useState } from 'react'

const Todo = () => {
  const [userInput, setUserInput] = useState('');
  const [todos, setTodos] = useState([])

  const addTodo = () => {
    if(!userInput.trim()) return;
    const newTodo = {
      id: crypto.randomUUID(),
      text: userInput,
      completed: false,
    }
    setTodos(prev => [
      ...prev, newTodo
    ]);
    setUserInput('');
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  const completeTodo = (id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ))
  }
  return (
    <div style={{padding: '20px', maxWidth: '1000px', margin: '0 auto'}}>
      <div><h1>TO DO LIST</h1></div>
      <div>
        <input
         style={{width: '800px'}}
         type="text"
         value={userInput}
         onChange={(e)=>(setUserInput(e.target.value))}
         onKeyDown={(e)=>{
          if(e.key === 'Enter'){
            addTodo
          }
         }}
        />
        <button
          onClick={addTodo}
        >
          add
        </button>
      </div>
      <ul>
         {todos.map(todo=>(
          <li key={todo.id}
          style={{display: 'flex', justifyContent: 'space-between',}}
          >
            <p>{todo.text}</p>
            <div style={{display: 'flex', gap: '10px'}}>
              <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
              <button
                onClick={()=>completeTodo(todo.id)}>{todo.completed ? 'Completed✅' : 'Incomplete❌' }
              </button>
            </div>
          </li>
         ))}
      </ul>
    </div>
  )
}

export default Todo;