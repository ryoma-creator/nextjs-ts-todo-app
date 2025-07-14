'use client'

// ==============================================
// 問題3: useStateとテーブルの組み合わせ
// ==============================================
// useStateでデータを管理し、ボタンで商品を追加できるテーブル

import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}


const StatefulTable = () => {

  
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "iPhone", price: 100000, stock: 5 }
  ]);

  const addProduct = () => {
    const newProduct: Product = {
      id: products.length + 1,
      name: "新商品",
      price: 50000,
      stock: 1
    };
    // ここにコードを書いてください
    // setProducts を使って新しい商品を追加
    setProducts(
      [...products, newProduct]
    );
  };

  return (
    <div>
      <h3>動的テーブル</h3>
      <button onClick={addProduct}>商品追加</button>
      
      <table style={{ border: '1px solid #ccc', borderCollapse: 'collapse', width: '100%', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>商品名</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>価格</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>在庫数</th>
          </tr>
        </thead>
        <tbody>
          {/* ここにproductsをmapでレンダリング */}
          {products.map(product=>(
            <tr 
            key={product.id}
            >
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatefulTable;