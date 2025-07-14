'use client'

// ==============================================
// 問題4: API構造確認練習
// ==============================================
// まずAPIのデータ構造をconsole.logで確認する練習

import React, { useState, useEffect } from 'react';

const ApiStructureCheck = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        // 🔍 重要: まずデータ構造を確認！
        console.log('取得したデータ全体:', data);
        console.log('最初のユーザー:', data[0]);
        console.log('利用可能なプロパティ:', Object.keys(data[0]));
        
        setUsers(data);
      } catch (error) {
        console.error('エラー:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h3>API構造確認</h3>
      <p>ブラウザのコンソール（F12）を開いて、データ構造を確認してください</p>
      <p>取得したユーザー数: {users.length}</p>
      {/* console.logで確認後、テーブルを作成してください */}
      <table>
        <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Email
              </th>
            </tr>
        </thead>
        <tbody>
        {users.map(user=>(
            <tr key={user.id}>
              <td>
                {user.name}
              </td>
              <td>
                {user.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiStructureCheck;