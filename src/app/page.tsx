'use client'

import { useState, useEffect } from "react"

import React from 'react'

interface User {
  name: string;
  id: number;
  email: string;
}

const userSystem = () => {

  const containerStyle = {
    padding: '20px',
    margin: '0, auto',
    maxWidth: '800px'
  }
  

  const header = ["Name", "Email"];

  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const fetchData = async() => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data= await response.json();
      console.log(data);
      setUserData(data);
    }
    catch(error){
      setError(error);
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchData();
  },[]); 

  const filteredData = userData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ); 

if(loading) {
  return <p>now loading...</p>
}

if(error) {
  return <p>error is happening</p>
}
return (
  <div style={containerStyle}>
    <h1>user system</h1>
    <input
      type="text"
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
      placeholder="search users"
    />
    <table>
      <thead>
        <tr>
          {header.map((title,index)=>
              <th key={index}> 
                {title}
              </th>
            )}
        </tr>
      </thead>
      <tbody>
           {filteredData.map((data)=>
            <tr key={data.id}>
              <td>{data.name}</td>
              <td>{data.email}</td>
            </tr>
          )}
      </tbody>
    </table>
  </div>
);


}



export default userSystem;