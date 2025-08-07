'use client'

import React from 'react'
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

const DatafetchApp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<User[]>([]);

  const dataFetch = async(): Promise<void> => {
    setLoading(true);
    try { 
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      console.log(data);
      setData(data);
    } 
    catch (e){
      console.log('エラー:', e);
    }
    finally{
      setLoading(false);
    }

  }

  useEffect(()=>{
    dataFetch();
  },[]);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map((user:User) => (
            <div key={user.id}>
              <div>{user.name}</div>
            </div>
          ))}
        </div> 
      )}
    </div>
  )
}

export default DatafetchApp