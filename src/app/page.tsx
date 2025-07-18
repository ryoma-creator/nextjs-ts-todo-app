"use client"
import { useState, useEffect } from "react";

// 🎯 問題1: User の型定義を完成させてください
interface User {
  id: /* ここに型 */;
  name: /* ここに型 */;
  email: /* ここに型 */;
}

const IBMTestApp = () => {
  // 🎯 問題2: useState に適切な型を追加してください
  const [users, setUsers] = useState/* ここに型 */([]);
  const [selectedUser, setSelectedUser] = useState/* ここに型 */(null);
  const [loading, setLoading] = useState/* ここに型 */(false);
  const [searchTerm, setSearchTerm] = useState/* ここに型 */("");

  // 🎯 問題3: この関数の戻り値の型を追加してください
  const fetchUsers = async (/* ここに戻り値の型 */) => {
    setLoading(true);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const userData = await response.json();
      
      // 簡単なデータ加工
      const simpleUsers = userData.slice(0, 5).map(user => ({
        id: user.id,
        name: user.name,
        email: user.email
      }));
      
      setUsers(simpleUsers);
    } catch (error) {
      console.error('エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 検索フィルタ
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎯 IBM面接練習</h1>
      
      <input
        type="text"
        placeholder="ユーザー検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button 
        onClick={fetchUsers}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? "読み込み中..." : "データ更新"}
      </button>

      <div className="space-y-2">
        {filteredUsers.map(user => (
          <div key={user.id} className="p-3 border rounded">
            <button 
              onClick={() => setSelectedUser(user)}
              className="w-full text-left hover:bg-gray-50"
            >
              <div className="font-bold">{user.name}</div>
              <div className="text-gray-600">{user.email}</div>
            </button>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-bold">選択中：{selectedUser.name}</h3>
          <p>ID: {selectedUser.id}</p>
          <p>Email: {selectedUser.email}</p>
          <button 
            onClick={() => setSelectedUser(null)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
          >
            選択解除
          </button>
        </div>
      )}
    </div>
  );
};

export default IBMTestApp;