// ==============================================
// 問題3.5: 三項演算子と条件レンダリング（重要！）
// ==============================================
// 目標: ボタンクリックで表示/非表示を切り替える
// やること: 三項演算子を使った条件レンダリングをマスター

'use client'
import React, { useState } from 'react';

const ConditionalTable = () => {
  // スタイル定義（方法1）
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '10px'
  };
  
  const cellStyle = {
    border: '1px solid black',
    padding: '10px'
  };
  
  const headerStyle = {
    ...cellStyle,
    backgroundColor: 'lightcoral',
    fontWeight: 'bold'
  };

  const [showTable, setShowTable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const products: Product[] = [
    { id: 1, name: "iPhone", price: 100000, stock: 5 },
    { id: 2, name: "iPad", price: 80000, stock: 3 }
  ];

  const toggleTable = () => {
    // ここにコードを書いてください
    // やること: setShowTable(!showTable); と書く
    // !showTable = showTableの反対の値（true↔false切り替え）
    setShowTable(!showTable)
  };

  const simulateLoading = () => {
    // ここにコードを書いてください
    // やること:
    // 1. setIsLoading(true);
    // 2. setTimeout(() => { setIsLoading(false); }, 2000);
    // 3. 2秒後にローディング終了
    setIsLoading(true);
    setTimeout(()=>{
      setIsLoading(false);
    }, 2000)
  };

  return (
    <div>
      <h3>問題3.5: 三項演算子練習</h3>
      
      {/* ボタン */}
      <button onClick={toggleTable}>
        {/* ここに三項演算子を書いてください */}
        {/* showTable ? "テーブルを隠す" : "テーブルを表示" */}
        {showTable ? "テーブルを隠す" : "テーブルを表示"}
        {/* ここよくわからない。trueなのに隠すなの？ */}
      </button>
      
      <button onClick={simulateLoading} style={{ marginLeft: '10px' }} className='bg-blue-300'>
        ローディングテスト
      </button>

      {/* 条件レンダリング練習1: ローディング表示 */}
      {/* ここに三項演算子を書いてください */}
      {/* isLoading ? <p>読み込み中...</p> : null */}
      {isLoading ? <p>読み込み中...</p> : null}
      
      {/* 条件レンダリング練習2: テーブル表示/非表示 */}
      {/* ここに三項演算子を書いてください */}
      {/* showTable ? (テーブル全体) : <p>テーブルは非表示です</p> */}
      {/* 
      やること:
      showTable ? (
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
            {products.map(product => (
              <tr key={product.id}>
                <td style={cellStyle}>{product.id}</td>
                <td style={cellStyle}>{product.name}</td>
                <td style={cellStyle}>{product.price}</td>
                <td style={cellStyle}>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>テーブルは非表示です</p>
      )
      */}
     { showTable ? (
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
            {products.map(product => (
              <tr key={product.id}>
                <td style={cellStyle}>{product.id}</td>
                <td style={cellStyle}>{product.name}</td>
                <td style={cellStyle}>{product.price}</td>
                <td style={cellStyle}>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>テーブルは非表示です</p>
      )}

      
    </div>
  );
};

export default ConditionalTable;

// ==============================================
// 💡 React配列操作メモ（重要）
// ==============================================
/*
❌ Reactでは直接pushは使わない：
products.push(newProduct);  // stateを直接変更するのでNG

✅ Reactではスプレッド演算子を使う：
setProducts([...products, newProduct]);  // 新しい配列を作成

他の方法：
setProducts(prev => [...prev, newProduct]);
setProducts(products.concat(newProduct));

理由：Reactはstateの変更を検知するために新しい配列が必要
*/