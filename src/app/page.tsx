"use client"
import { useState } from "react";

// TODO: Userの型定義
interface User {
  ??: ??;
  ??: ??;
  ??: ??;
}

const SimpleApp = () => {
  // TODO: 型を追加
  const [users, setUsers] = useState(/* ここ */[]);
  const [loading, setLoading] = useState(/* ここ */false);
  
  // TODO: 戻り値の型
  const fetchUsers = async (/* ここ */) => {
    setLoading(true);
    // API処理
    setLoading(false);
  };

  return <div>Simple App</div>;
};
export default SimpleApp;