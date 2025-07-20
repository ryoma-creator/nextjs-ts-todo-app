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
  const [error, setError] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  
  // 🎨 スタイル定義（コピペするだけ）
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1000px',
    margin: '0 auto'
  };

  const titleStyle = {
    color: '#333',
    textAlign: 'center' as const,
    marginBottom: '30px',
    fontSize: '24px'
  };

  const searchBoxStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    marginBottom: '20px',
    outline: 'none',
    transition: 'border-color 0.3s'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const thStyle = {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    textAlign: 'left' as const,
    borderBottom: '2px solid #dee2e6',
    fontWeight: 'bold',
    color: '#495057'
  };

  const tdStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #dee2e6'
  };

  const loadingStyle = {
    textAlign: 'center' as const,
    padding: '50px',
    fontSize: '18px',
    color: '#666'
  };

  const errorStyle = {
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    marginBottom: '20px'
  };

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const userData: User[] = await response.json();
      setData(userData.slice(0, 5));
    } catch(error) {
      setError('データ取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  const filteredData = data.filter((user: User) => 
    user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.email.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={errorStyle}>{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <div style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p>読み込み中...</p>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>📊 User Data Table</h1>
      
      <input 
        type="text"
        value={searchInput} 
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="🔍 Search by name or email..."
        style={searchBoxStyle}
        onFocus={(e) => e.target.style.borderColor = '#007bff'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'}
      />
      
      <p style={{marginBottom: '15px', color: '#666'}}>
        📋 検索結果: {filteredData.length}件
      </p>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={thStyle}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user: User) => (
            <tr 
              key={user.id}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              style={{cursor: 'pointer'}}
            >
              <td style={tdStyle}>{user.id}</td>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;