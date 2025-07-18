"use client"
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

// APIから取得する生データの型
interface ApiUser {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

const UserList = () => {
  // State定義
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 🍎 果物屋さんがAPIから果物を仕入れる感じ
  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    
    try {
      // APIから生データを取得
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const rawData: ApiUser[] = await response.json();
      
      // 🔄 仕入れた果物を店頭用に整理する
      const processedUsers: User[] = rawData.map((apiUser: ApiUser) => ({
        id: apiUser.id,
        name: apiUser.name,
        email: apiUser.email
      }));
      
      setUsers(processedUsers);  // 🛒 果物をかごに入れる
    } catch (error) {
      console.error('データ取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🏠 コンポーネントが家に引っ越してきた時にデータを取得
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ユーザーリスト (TypeScript)</h1>
      
      <button 
        onClick={fetchUsers}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "読み込み中..." : "データ更新"}
      </button>

      {loading ? (
        <p>データを読み込み中...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 🍎 果物リスト（左側） */}
          <div>
            <h2 className="text-lg font-semibold mb-2">ユーザー一覧</h2>
            <div className="space-y-2">
              {users.map(user => (
                <button 
                  key={user.id}
                  onClick={() => setSelectedUser(user)}  // 🤏 果物を手に取る
                  className="w-full text-left p-3 border rounded hover:bg-gray-50"
                >
                  {user.name}
                </button>
              ))}
            </div>
          </div>

          {/* 🔍 選択された果物の詳細（右側） */}
          <div>
            <h2 className="text-lg font-semibold mb-2">ユーザー詳細</h2>
            {selectedUser ? (
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-bold text-xl">{selectedUser.name}</h3>
                <p className="text-gray-600">ID: {selectedUser.id}</p>
                <p className="text-gray-600">Email: {selectedUser.email}</p>
                <button 
                  onClick={() => setSelectedUser(null)}  // 🗑️ 手を空にする
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
                >
                  選択解除
                </button>
              </div>
            ) : (
              <p className="text-gray-500">ユーザーを選択してください</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        総ユーザー数: {users.length}人
      </div>
    </div>
  );
};

export default UserList;