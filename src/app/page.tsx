'use client'

import React, { useState } from 'react'


const TodoApp = () => {
  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontSize: "16px"
  }

  const buttonStyle = {
    backgroundColor: "green",
  }

  const [userInput, setUserInput] = useState("");
  const [todos, setTodos] = useState([]); 
  const [searchValue, setSearchValue] = useState("");

  const addTodo = () => {
    if (userInput.trim()) {
      const newTask = {
        id: crypto.randomUUID(),
        text: userInput,
        completed: false
      }
      console.log("追加前todos:", todos);  // デバッグ
      console.log("追加するタスク:", newTask);  // デバッグ
      setTodos([...todos, newTask]);
      setUserInput("");
    } else {
      console.log("空文字のため追加されませんでした");  // デバッグ
    }
  }

  const filteredTodos = todos.filter(
    (todo) => todo.text.toLowerCase().includes(searchValue.toLowerCase())
  );
  
  console.log("現在のtodos:", todos);
  console.log("searchValue:", searchValue);
  console.log("filteredTodos:", filteredTodos);

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo=>todo.id!==id));
  }

  const completedTodo = (id) => {
    setTodos(todos.map(todo=>
      todo.id===id 
      ? {...todo, completed: !todo.completed} 
      : todo
    )); 
  }

  return (
    <>
      <div style={containerStyle}>
        <h1>Todo App</h1>
        <input
        type="text"
        value={userInput}
        onChange={(e)=>setUserInput(e.target.value)}
        onKeyPress={(e)=>{
          if(e.key == 'Enter'){
            addTodo();
          }
        }}
        placeholder='Add your task here'
        />
        <button
          onClick={addTodo}
          style={buttonStyle}
        >
          add
        </button>

        <input
        type="text"
        value={searchValue}
        onChange={(e)=>setSearchValue(e.target.value)}
        placeholder='Search your task here'
        />


      <div>
        <p>全タスク数: {todos.length}</p>
        <p>表示タスク数: {filteredTodos.length}</p>
        {searchValue && <p>検索ワード: {searchValue}</p>}
        
        {filteredTodos.map((filteredTodo)=>(
          <div key={filteredTodo.id} 
            style={{border: '1px solid red', padding: '10px', margin: '5px',
            display: 'flex', justifyContent: 'space-between', gap: '10px',
            }}>
            <span 
              style={{
                color: filteredTodo.completed ? 'green': 'red',
                textDecoration: filteredTodo.completed ? 'line-through' : 'none'
                }}>{filteredTodo.text}</span>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '8px', padding: "2px"}}>
              <button 
                key={filteredTodo.id}
                onClick={()=>completedTodo(filteredTodo.id)}
              >{filteredTodo.completed ? '戻す' : '完了'}</button>
              <button
               key={filteredTodo.id}
               onClick={()=>deleteTodo(filteredTodo.id)}
               >delete</button>
            </div>
          </div>
        ))}
      </div>
      </div>
   </>
  )
}

export default TodoApp