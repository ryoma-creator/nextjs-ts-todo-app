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

  function validateUserForm(userData: UserData): FormErrors {
    // userData = { name: "  田中  ", email: "  test@  ", password: "  123  " }
    // 戻り値: { name?: string, email?: string, password?: string }
    
    const errors: FormErrors = {};
    if(userData.name.trim().length < 2){
      errors.name = "名前は2文字以上で入力してください";
    }
    
    if(!userData.email.trim().includes("@")){
      errors.email = "メールアドレスに@が必要です";
    }
    
    if(userData.password.trim().length < 6) {
      errors.password = "パスワードは6文字以上で入力してください";
    }
    
    return errors;
  }
  // テスト
  const result = validateUserForm({
    name: "  田中  ",
    email: "  test@gmail.com  ", 
    password: "  123  "
  });
  console.log(result);


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
