// ==============================================
// 問題3: UPDATE - 完了/未完了の切り替え
// ==============================================
// toggleTodo関数だけを完成させてください

'use client'
import { useState } from 'react';

const TodoToggle = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "React勉強", completed: false },
    { id: 2, text: "買い物", completed: true },
    { id: 3, text: "掃除", completed: false }
  ]);

  const toggleTodo = (id) => {
    // ここに切り替え機能を書いてください
    // ヒント: map使って、idが一致するもののcompletedを!で反転
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo 
    ));
  };

  return (
    <div>
      <h2>Todo完了切り替え</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input 
              type="checkbox" 
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoToggle;
