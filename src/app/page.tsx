// React Todo CRUD段階的練習問題 - CREATE から始める
// TypeScriptなしで、サクッと自信をつけるための練習問題です。
// CRUD順序：Create → Read → Update → Delete で学びましょう。

// ==============================================
// 問題1: CREATE - Todo追加機能
// ==============================================
// 入力フィールドとボタンでTodoを追加する機能を作成してください

'use client'
import { useState } from 'react';

const TodoCreate = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [state, setState] = useState("");

  const addTodo = () => {
    // ここに追加機能を書いてください
    // 新しいオブジェクトを作成して配列に追加
    const newTodo = {
      id: Date.now(),
      text: state,
      completed: false,
    }
    setTodos([...todos, newTodo]);
    setInputText(""); 
  };

  return (
    <div>
      <h2>Todo追加機能</h2>
      {/* ここに入力フィールドと追加ボタンを書いてください */}
      <div>
        <input
         type="text"
         value={state}
         onChange={(e)=>setState(e.target.value)}
         />
        <button
          onClick={addTodo}
        >
          add button
        </button>
      </div>
      
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoCreate;