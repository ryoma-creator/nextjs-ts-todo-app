'use client'

import React, { useState, useEffect } from 'react'

interface User {
  id: number;
  name: string;
  email: string;
}

const DataFetchApp = () => {
  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "20px"
  };

  const cellStyle = {
    border: "1px solid #ddd",
    padding: "8px"
  };

  const headers = ["Name", "Email"];

  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: User[] = await response.json();
      console.log('取得データ:', data);
      
      // データ加工
      const processedData = data.slice(0, 5).map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
      
      setUserData(processedData);
    } catch (error) {
      console.error('エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 検索フィルター
  const filteredData = userData.filter((user) =>
    user.name.toLowerCase().includes(userInput.toLowerCase()) ||
    user.email.toLowerCase().includes(userInput.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1>DataFetchApp</h1>
      <input 
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Search users..."
        style={{padding: '8px', marginBottom: '20px', width: '300px'}}
      />
      
      <table style={tableStyle}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={{...cellStyle, backgroundColor: '#f8f9fa'}}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td style={cellStyle}>{user.name}</td>
              <td style={cellStyle}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <p style={{marginTop: '10px', color: '#666'}}>
        検索結果: {filteredData.length}件
      </p>
    </div>
  );
};

export default DataFetchApp;