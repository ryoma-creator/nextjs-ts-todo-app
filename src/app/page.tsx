// CRUD TypeScript練習問題 - 型定義に慣れよう
// 普通のReactで作ったCRUD機能に、TypeScriptの型定義を追加する練習です。
// 基礎7問に戻る前に、実践的なTypeScriptに慣れましょう！

// ==============================================
// 問題1: CREATE + TypeScript型定義
// ==============================================
// Todo interface と useState<型> を追加してください

'use client'
import { useState } from 'react';

// ここにTodo interfaceを定義してください
// id: number, text: string, completed: boolean
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}


const TodoCreateTS = () => {
  // ここに型付きのuseStateを書いてください
  // todos: Todo型の配列
  // inputText: 文字列
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputText("");
  };

  return (
    <div>
      <h2>CREATE + TypeScript</h2>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="新しいTodoを入力"
        />
        <button onClick={addTodo}>追加</button>
      </div>
      
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoCreateTS;