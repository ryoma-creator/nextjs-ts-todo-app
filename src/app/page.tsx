'use client'
// ==============================================
// 問題5: 実際のAPI + テーブル表示
// ==============================================
// API構造を理解した後、テーブルで表示
import { useState, useEffect } from "react";

interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

const ApiUserTable = () => {
  // スタイル定義（方法1）
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%'
  };
  
  const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px'
  };
  
  const headerStyle = {
    ...cellStyle,
    backgroundColor: '#f0fff0',
    fontWeight: 'bold'
  };

  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      // ここにコードを書いてください
      // 1. setLoading(true)
      // 2. fetch('https://jsonplaceholder.typicode.com/users')
      // 3. console.log でデータ確認
      // 4. setUsers でデータ設定
      // 5. setLoading(false)
      setLoading(true);
      
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data  = await response.json();
        console.log(data);
        setUsers(data);

      setLoading(false);
    
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h3>API ユーザーテーブル</h3>
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>ID</th>
              <th style={headerStyle}>名前</th>
              <th style={headerStyle}>メール</th>
              <th style={headerStyle}>電話</th>
              <th style={headerStyle}>ウェブサイト</th>
            </tr>
          </thead>
          <tbody>
            {/* ここにusersデータをmap()でレンダリング */}
            {/* 重要: key={user.id} を忘れずに！ */}
            {users.map(user=>(
              <tr key={user.id}>
                <td style={cellStyle}>{user.id}</td>
                <td style={cellStyle}>{user.name}</td>
                <td style={cellStyle}>{user.email}</td>
                <td style={cellStyle}>{user.phone}</td>
                <td style={cellStyle}>{user.website}</td>               
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApiUserTable;