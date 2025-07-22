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
        id: Date.now(),
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
          {filteredTodos.map(
            (filteredTodo)=>(
              <div key={filteredTodo.id}>
                {filteredTodo.text}
              </div>
            )
          )}
        </div>
      </div>
   </>
  )
}

export default TodoApp