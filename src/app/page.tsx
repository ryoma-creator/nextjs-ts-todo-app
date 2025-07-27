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
    }
    setTodos([
      ...todos, newTodo
    ]);
    setUserInput('');
  }

  return (
    <div style={{padding: '20px', maxWidth: '1000px', margin: '0 auto'}}>
      <h1>TO DO LIST</h1>
      <input
       style={{width: '800px'}}
       type="text" 
       value={userInput}
       onChange={(e)=>(setUserInput(e.target.value))}
       onMouseEnter={(e)=>{
        if(e.key === 'enter'){

        }
       }}
      />
      <button
        onClick={addTodo}
      >
        add
      </button>
    </div>
  )
}

export default Todo;