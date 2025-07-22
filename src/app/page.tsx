'use client'

import React, { useEffect, useState } from 'react'

const DataFetchApp = () => {
  const containerStyle = {
    width: "800px",
    margin: "0 auto",
    padding: "20px"
  }
  const tableStyle = {
    borderCollapse: "collapse",
    backgroundColor: 'white',
    width: "100%"
  }

  const cellStyle = {
    border: '1px solid black',
    padding: "10px"
  }

  const flexStyle = {
    display: 'flex',
    gap: "10px",
    marginBottom: '20px',
    alignItems: "center"
  }

  const headers = ["Name", "Email"];

  const[userData, setUserData] = useState([]);
  const[loading, setLoading] = useState(false);
  const[userInput, setUserInput] = useState("");
  
  const dataFetch = async() => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      console.log(data);
      const fetchData = data.slice(0, 5).map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }))
      setUserData(fetchData);
    }
    catch (error){
      console.log(error.message);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
      dataFetch();
    }, []);

  const searchData = userData.filter((user)=>{
    return　user.name.toLowerCase().includes(userInput.toLowerCase());
    });
  

  if (loading) {
    return(
    <div>...loading</div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1>DataFetchApp</h1>
      <input 
        type="text" 
        value={userInput}
        onChange={(e)=>setUserInput(e.target.value)}
      />
      <table style={tableStyle}>
        <thead>
          <tr>
            {headers.map((header,index)=>(
              <th key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {searchData.map((data)=>(
            <tr key={data.id}>
              <td>{data.name}</td>
              <td>{data.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default DataFetchApp;