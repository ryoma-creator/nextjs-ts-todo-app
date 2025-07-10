// ==============================================
// 問題3: UPDATE + TypeScript型定義
// ==============================================
// 関数の引数に型定義を追加してください

'use client'
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoToggleTS = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "React勉強", completed: false },
    { id: 2, text: "買い物", completed: true },
    { id: 3, text: "掃除", completed: false }
  ]);

  // ここに引数の型定義を追加してください
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  };

  return (
    <div>
      <h2>UPDATE + TypeScript</h2>
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

export default TodoToggleTS;
