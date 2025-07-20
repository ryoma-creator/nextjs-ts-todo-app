'use client'

import React, { useEffect, useState } from 'react'

interface User {
  id: number;
  name: string;
  email: string;
}

const page = () => {
  const headers = ["ID", "Name", "Email"];

  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  
  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users'); // 実際のAPI
      const data:User = await response.json();
      console.log(data);
      setData(data.slice(0,5));
    } catch(error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      fetchData();
    }, 2000);

  }, []); // 依存配列追加

  const filteredData = () => {
    return data.filter((user) => 
      user.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()) ||
      user.email.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
    );
  }

if (loading) {
  return <div>now loading...</div>;
}

  return (
    <div>
      <h1>data fetch table</h1>
      <label htmlFor="" ></label>
      <input 
        type="text"
        value={searchInput} 
        onChange={(e)=>setSearchInput(e.target.value)}
        placeholder="name or email please type to search for..."
      />
      <table>
        <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
        </thead>
        <tbody>
          {filteredData().map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page