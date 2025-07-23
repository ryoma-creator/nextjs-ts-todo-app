'use client'

import { useState } from 'react'
import { useEffect } from 'react'

const FormValidation = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const [name, value] = e.target;
    setFormData({...formData, [name]: value});
  };



  return (
    <div>
      <h1>お問い合わせフォーム</h1>
      <form>
        <input
          type="text"
          value={formData.name}
          name='name'
          onChange={handleChange}
        />
        <input
          type="email"
          value={formData.email}
          name='email'
          onChange={handleChange}
        />
        <input
          type="text"
          value={formData.message}
          name='message'
          onChange={handleChange}
        />
      </form>

    </div>
  )
}

export default FormValidation;