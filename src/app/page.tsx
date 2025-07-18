'use client'

import { useState } from "react"

const todolist = () => {
  const [todos, setTodos] = useState([]);
  const[userInput, setUserInput]=useState("");

  const addTodo=()=>{
    const newTodo = {
      id: Date.now(),
      task: userInput,
      completed: false,
    }
    setTodos([...todos, newTodo]);
    setUserInput("");
  }

  return(
  <>
    <div>
     <h1>TODOLIST</h1>
     <div>
      <input
       type="text"
       value={userInput}
       placeholder="add your task here"
       onChange={(e)=>setUserInput(e.target.value)}
      />
      <button
        onClick={addTodo}
      >
        add
      </button>
     </div>
    </div>
  </>);
}; 

export default todolist;
