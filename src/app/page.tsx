// ==============================================
// 問題3: useStateとテーブルの組み合わせ
// ==============================================
// 目標: ボタンクリックで商品を追加できる動的テーブル
// やること: 
// 1. addProduct関数を完成させる（setProducts使用）
// 2. テーブルでproductsを表示（map使用）

'use client'

import React, { useState } from 'react';

const StatefulTable = () => {
  // スタイル定義（方法1）
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '10px'
  };
  
  const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px'
  };
  
  const headerStyle = {
    ...cellStyle,
    backgroundColor: '#fff8dc',
    fontWeight: 'bold'
  };

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "iPhone", price: 100000, stock: 5 }
  ]);

  const addProduct = () => {
    const newProduct: Product = {
      id: products.length + 1,  // 配列の長さ + 1 = 新しいID
      name: "新商品",
      price: 50000,
      stock: 1
    };
    
    // ここにコードを書いてください
    // setProducts([...products, newProduct]); のように書く
    setProducts([...products, newProduct])
  };

  return (
    <div>
      <h3>問題3: 動的テーブル</h3>
      <button onClick={addProduct}>商品追加</button>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>ID</th>
            <th style={headerStyle}>商品名</th>
            <th style={headerStyle}>価格</th>
            <th style={headerStyle}>在庫数</th>
          </tr>
        </thead>
        <tbody>
          {/* ここにproductsをmap()でレンダリング */}
          {/* 
          やること:
          1. products.map(product => ...)
          2. <tr key={product.id}>
          3. 各tdでproduct.id, product.name等を表示
          */}
          
        </tbody>
      </table>
    </div>
  );
};

export default StatefulTable;
