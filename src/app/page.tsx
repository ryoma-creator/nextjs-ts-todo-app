'use client'

import { useState } from "react"
import React from 'react'

interface FormData {
  name: string;
  email: string;
}

const FormApp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    const {name, value} =  e.target;
    setFormData(prev=>({...prev, [name]: value}));
    console.log(formData);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(()=>{
      setIsSubmitted(false);
      setFormData({ name: '', email: ''});
    },3000);
  }
  if(isSubmitted){
    return <p>Form submitted successfully!</p>    
  }
  else if(!isSubmitted){
    return (
      <div>
        <h1>Form App</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input 
              type="text" 
              placeholder="enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Email</label>
            <input 
              type="email" 
              placeholder="enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="submit">send</button>   
          </form>     
        </div>
        <div>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
        </div>

      </div>
    )
  }
}

export default FormApp