'use client'
import React, { useState } from 'react';

// ==============================================
// 1. To-Do List（IBM面接の定番）
// ==============================================
const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React学習', completed: false },
    { id: 2, text: '面接準備', completed: true }
  ]);
  const [inputText, setInputText] = useState('');

  // 新しいToDo追加
  const addTodo = () => {
    if (inputText.trim()) {
      setTodos([...todos, {
        id: todos.length + 1,
        text: inputText,
        completed: false
      }]);
      setInputText('');
    }
  };

  // 完了状態の切り替え
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 削除
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px', border: '2px solid blue', margin: '10px' }}>
      <h3>📝 To-Do List</h3>
      
      {/* 入力エリア */}
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="新しいタスクを入力..."
          style={{ padding: '8px', width: '200px', marginRight: '10px' }}
        />
        <button onClick={addTodo} style={{ padding: '8px 15px' }}>
          追加
        </button>
      </div>

      {/* ToDoリスト表示 */}
      <div>
        {todos.map(todo => (
          <div key={todo.id} style={{
            padding: '10px',
            margin: '5px 0',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: todo.completed ? '#f0f0f0' : 'white'
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: '10px' }}
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              flex: 1
            }}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ padding: '5px 10px', backgroundColor: '#ff6b6b', color: 'white' }}
            >
              削除
            </button>
          </div>
        ))}
      </div>
      
      <p style={{ color: 'gray', fontSize: '12px' }}>
        完了: {todos.filter(t => t.completed).length} / 全体: {todos.length}
      </p>
    </div>
  );
};

export default TodoList;