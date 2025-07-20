'use client'

import { useState, useEffect } from "react"

import React from 'react'

const userSystem = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
  
  const fetchData = async() => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
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


if(loading) {
  return <p>now loading...</p>
}
return (
  <>
    <h1>user system</h1>
    
  </>
);


}



export default userSystem;