'use client'

import React from 'react'
import { useState } from 'react'

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const Todo:React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [Todos, setTodos] = useState<Todo[]>([])

  const addTodo = ():void => {
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

  const deleteTodo = (id: Todo['id']) => {
    setTodos(prev => prev.filter(Todo => Todo.id !== id));
  }

  const completeTodo = (id: Todo['id']):void => {
    setTodos(prev => prev.map(Todo => 
      Todo.id === id
        ? { ...Todo, completed: !Todo.completed }
        : Todo
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
            addTodo()
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
         {Todos.map(Todo=>(
          <li key={Todo.id}
          style={{display: 'flex', justifyContent: 'space-between',}}
          >
            <p>{Todo.text}</p>
            <div style={{display: 'flex', gap: '10px'}}>
              <button onClick={()=>deleteTodo(Todo.id)}>Delete</button>
              <button
                onClick={()=>completeTodo(Todo.id)}>{Todo.completed ? 'Completed✅' : 'Incomplete❌' }
              </button>
            </div>
          </li>
         ))}
      </ul>
    </div>
  )
}

export default Todo;