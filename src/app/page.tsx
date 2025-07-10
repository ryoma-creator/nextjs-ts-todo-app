// ==============================================
// 問題4: DELETE - 削除機能
// ==============================================
// deleteTodo関数だけを完成させてください（超シンプル！）

'use client'
import { useState } from 'react';

const TodoDelete = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "React勉強", completed: false },
    { id: 2, text: "買い物", completed: true },
    { id: 3, text: "掃除", completed: false }
  ]);

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h2>Todo削除機能</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoDelete;
