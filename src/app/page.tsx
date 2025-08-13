'use client'

import { useState, useEffect } from "react"
import React from 'react'


const ApiDataApp = () => {
  const [fetchData, setFetchData] = useState<any[]>([]);
  const[loading, setLoading] = useState<boolean>(false);


  useEffect(()=>{
    const controller = new AbortController();
    const dataFetch=async():Promise<void>=>{
      setLoading(true);
      try{
        const response = await fetch(('https://jsonplaceholder.typicode.com/users'),{
          signal: controller.signal
        });
        if(!response.ok){
          throw new Error(`HTTP Error Number ${response.status}`); 
        }
        const data = await response.json();
        console.log(data);
        setFetchData(data); 
      }
      catch(){

      }
      finally{

      }
    };

    return ()=> controller.abort();
  },[]);

  if(loading){
    return (<div>Loading...</div>)
  }

  return (
    <div>

    </div>
  )
}

export default ApiDataApp