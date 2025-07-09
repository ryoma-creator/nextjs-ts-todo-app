'use client'
import { useState } from "react";


// ==============================================
// 問題3: TodoリストAdd機能
// ==============================================
// 入力フィールドとボタンで、Todoを追加できる機能を作成してください。
// 入力後、リストに追加され、入力フィールドがクリアされる

const TodoAdd = () => {
  // ここにコードを書いてください
  const [userInput, setUserInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {  
    setTodos([...todos, {
      id: Date.now(),
      input: userInput, 
    }]);
    setUserInput("");
  }

  return(
    <div>
      <div>
        <input
         type="text"
         value={userInput}
         onChange={(e)=>setUserInput(e.target.value)} 
         placeholder="please write to do here"
        />
      </div>
      <div>
        <button
          onClick={handleAdd}
          className="bg-green-400 px-4 py-2"
        >
          add
        </button>
      </div>
      <ul>
        your to do 
        {todos.map((todo)=>(
          <li key={todo.id}>
            {todo.input}
          </li>
))}
      </ul>
    </div>
  );
};

export default TodoAdd;