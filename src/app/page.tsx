// ==============================================
// 問題4: API構造確認練習
// ==============================================
// 目標: APIデータをconsole.logで確認して構造を理解
// やること: console.log(data) でデータ構造を確認

'use client'
import React, { useState, useEffect } from 'react';

const ApiStructureCheck = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      // ここにconsole.logを書いてください
      // やること:
      // 1. const response = await fetch('https://jsonplaceholder.typicode.com/users');
      // 2. const data = await response.json();
      // 3. console.log('データ全体:', data);
      // 4. console.log('最初のユーザー:', data[0]);
      // 5. setUsers(data);
      // 6. F12でコンソールを開いてデータ構造を確認
      
       const response = await fetch('https://jsonplaceholder.typicode.com/users');
       const data = await response.json();
       console.log(data);

    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h3>問題4: API構造確認</h3>
      <p>ブラウザのコンソール（F12）を開いて、データ構造を確認してください</p>
      <p>取得したユーザー数: {users.length}</p>
      {/* 
      確認後、簡単なテーブルを作成してみてください
      やること:
      1. users.map(user => (
      2. <tr key={user.id}>
      3. user.name, user.emailを表示
      */}
    </div>
  );
};

export default ApiStructureCheck;
