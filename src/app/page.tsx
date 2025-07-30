'use client'

import React from 'react'
import { useEffect, useState } from 'react'

interface User {
  id: number;
  name: string;
  email: string;
  address:{
    city: string;
  };
}

const DataFetch = () => {
  const headers = ['name', 'email', 'id'];

  const[loading, setLoading] = useState<boolean>(false);
  const[data, setData] = useState<User[]>([]);
  
  const fetchData = async(): Promise<void> => {
    setLoading(true);
  
    try{
      const response = await fetch('/api/users')
      const userData: User[] = await response.json();
      console.log(userData);
      setData(userData);
    }
    catch(error: any){
      console.log(error.message)
    }  
    finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);

if(loading){
  return <p>...loading</p>
}

  return (
    <div style={{maxWidth:'800px', padding: '20px', margin: '0 auto'}}>
      <table>
        <thead>
          <tr>
            {headers.map((header:string, index:number)=>(
              <th key={index} style={{padding: '10px'}}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((user:User)=>(
            <tr key={user.id}>
              <td style={{padding: '10px'}}>
                {user.name}
              </td>
              <td style={{padding: '10px'}}>
                {user.email}
              </td>
              <td style={{padding: '10px'}}>
                {user.id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataFetch;