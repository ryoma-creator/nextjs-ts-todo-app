// ==============================================
// 問題2: READ + TypeScript型定義
// ==============================================
// 関数の戻り値の型定義を追加してください

'use client'
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoReadTS = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "React勉強", completed: false },
    { id: 2, text: "買い物", completed: true },
    { id: 3, text: "掃除", completed: false }
  ]);

  // ここに関数の戻り値型を追加してください
  // JSX.Element を返すという意味
  const renderTodo = (todo) => {
    return (
      <li key={todo.id}>
        {todo.text} - {todo.completed ? "完了" : "未完了"}
      </li>
    );
  };

  return (
    <div>
      <h2>READ + TypeScript</h2>
      <ul>
        {todos.map(renderTodo)}
      </ul>
    </div>
  );
};

export default TodoReadTS;