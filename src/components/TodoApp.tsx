'use client'

import React from "react"
import { useState } from "react"


const TodoApp = () => {
    const [todos, setTodos] = useState<string[]>([])
    const [input, setInput] = useState<string>('')
    
    return (
        <div>
            <h1>My Todo App</h1>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="new task..."
            />
            <button>追加</button>
            <p>Todo Count {todos.length}</p>
            <p>User Input {input}</p>
        </div>
    )
}

export default TodoApp