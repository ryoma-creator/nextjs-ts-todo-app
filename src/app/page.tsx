'use client'

import React from 'react'
import { useState } from 'react'

const Todo = () => {


  return (
    <div style={{padding: '20px', maxWidth: '1000px', margin: '0 auto'}}>
      <h1>TO DO LIST</h1>
      <input
       style={{width: '800px'}}
       type="text" 

      />
    </div>
  )
}

export default Todo;