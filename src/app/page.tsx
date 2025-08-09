'use client'

import { useState } from "react"

import React from 'react'

const FormValidation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // const name = e.target.name
    // const value = e.target.value
    
    setFormData(prev => ({...prev, [name]: value}));

    // 方法2: 直接書く（長い）
    // setFormData(prev => ({...prev, [e.target.name]: e.target.value}));

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    
    if(!formData.name.trim()){
      newErrors.name = '名前が未入力です';
    }

    if(!formData.email.includes('@')){
      newErrors.email = 'メールが無効です';
    }

    const ageNum = Number(formData.age);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 100) {
      newErrors.age = '年齢が無効です';
    }
    console.log('newErrors:', newErrors); // ← 追加！
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Object.keys(obj) は、オブジェクトの「キー（プロパティ名）」を配列として返す関数。
      setIsSubmitted(true);
      setTimeout(()=> setIsSubmitted(false),3000);
    } 
  };

  return (
    <div>
      {isSubmitted ? (<div style={{color: 'green'}}>Success to submit!</div>
      ) : (
      <>
      <h1>FormValidation</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="enter your name"
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="enter your email"
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="enter your age"
            />
            {errors.age && <p>{errors.age}</p>}
          </div>
          <div>
            <button
             type="submit"
            >
              SUBMIT
            </button>
          </div>
        </form>
        </>
)}
    </div>
  )
}

export default FormValidation