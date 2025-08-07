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

  const handleSubmit = () => {
    const newErrors = {};
    
    if(!formData.name.trim()){
      newErrors.name = '名前が未入力です';
    }

    if(!formData.email.includes('@')){
      newErrors.email = 'メールが無効です';
    }

    if(age < 0 || age > 100 || NaN(formData.age)){
      newErrors.age = '年齢が無効です';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('成功');
    } 
  };

  return (
    <div>FormValidation</div>
  )
}

export default FormValidation