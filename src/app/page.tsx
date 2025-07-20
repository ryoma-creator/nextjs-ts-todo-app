'use client'

import { useState } from "react"

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}


const todolist = () => {

// 問題7: 文字数チェック（length使用）
// 入力例: "abc", 2 → true, "a", 2 → false
function isMinLength(str: string, minLength: number): boolean {
  // lengthを使って最小文字数をチェック
  return str.length === minLength;
}

// テスト
console.log(isMinLength("abc", 2)); // true
console.log(isMinLength("a", 2));   // false



  const [todos, setTodos] = useState<Todo[]>([]);
  const[userInput, setUserInput]=useState<string>("");

  const addTodo=()=>{
    const newTodo = {
      id: Date.now(),
      task: userInput,
      completed: false,
    }
    setTodos([...todos, newTodo]);
    setUserInput("");
  }

  const deleteTodo=(id :number)=>{
    setTodos(todos.filter(todo=>id !== todo.id));
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
    <div>
      {todos.map(
        (todo)=>(
          <div key={todo.id}>
            <div>{todo.task}</div>
            <button
              onClick={()=>deleteTodo(todo.id)}
            >delete button</button>
          </div>
        )
      )}
    </div>
  </>);
}; 

export default todolist;
