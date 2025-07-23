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

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} =  e.target;
    setFormData(prev=>({...prev, [name]: value}));
    console.log(formData);
  }

  return (
    <div>
      <h1>Form App</h1>
      <div>
        <label>Name</label>
        <input 
          type="text" 
          placeholder="enter your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Email</label>
        <input 
          type="email" 
          placeholder="enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />        
      </div>
      <div>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
      </div>
    </div>
  )
}

export default FormApp