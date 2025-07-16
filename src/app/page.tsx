// 検索機能 基礎練習問題
// IBM面接対策：filter, includes, toLowerCase の完全習得
// useStateとfilterを使った検索の基本パターン

'use client'
import React, { useState } from 'react';

// ==============================================
// 問題1: 基本的な配列検索
// ==============================================
// 目標: 静的データの検索機能をマスター
// やること: useState + filter + includes

const BasicArraySearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const fruits = [
    'apple', 'banana', 'orange', 'grape', 'strawberry', 
    'pineapple', 'mango', 'kiwi'
  ];

  // 検索フィルタリング
  const filteredFruits = fruits.filter(fruit =>
    fruit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', border: '2px solid black', margin: '10px' }}>
      <h3>問題1: 基本配列検索</h3>
      
      <input
        type="text"
        placeholder="フルーツを検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', width: '200px', marginBottom: '10px' }}
      />
      
      <p>検索結果: {filteredFruits.length}件</p>
      
      <ul>
        {filteredFruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

export default BasicArraySearch;

