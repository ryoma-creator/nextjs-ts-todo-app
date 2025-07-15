'use client'

// React HTMLテーブル要素 段階的練習問題
// IBM面接対策：table, thead, tbody, tr, th, td を使ったデータ表示をマスター
// APIデータ取得 + テーブル表示の完全習得！

// ==============================================
// 💡 IBM面接 正解ルート（超重要）
// ==============================================
/*
✅ IBM面接でのAPI表示戦略：
API fetch → console.log(data) → table要素 → map()

✅ データ種類別の表示方法：
・表形式データ（ユーザー、商品、注文）→ table, thead, tbody, tr, th, td
・単一データ（天気、プロフィール）→ div, card
・リストデータ（メニュー、ナビ）→ ul, li

✅ 必須知識：
・map()使用時はkey={item.id}が絶対必要
・tr = table row（テーブルの行）
・最上位要素（tr）にkeyを書く
*/

// ==============================================
// 💡 CSS効率的な書き方メモ（面接用）
// ==============================================
/*
// 方法1: 共通スタイルをオブジェクト変数にする（面接推奨）
const cellStyle = {
  border: '1px solid #ccc',
  padding: '10px'
};

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%'
};

// 個別スタイル追加方法
const headerStyle = {
  ...cellStyle,                    // 共通スタイル展開
  backgroundColor: '#f5f5f5',      // 個別追加
  fontWeight: 'bold'               // 個別追加
};

// 重要ポイント：
// - borderCollapse: 'collapse' → 境界線を統合
// - width: '100%' → テーブルを画面幅いっぱいに
// - #ccc → 薄いグレー色
// - padding → セル内の余白
// - map()使用時は key={item.id} が必須
*/

// ==============================================
// 共通インターフェース（全問題で使用）
// ==============================================
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

// ==============================================
// 問題1: 基本的なHTMLテーブル構造
// ==============================================
// 目標: 静的データを使って基本的なテーブルを作成
// 必須要素: table, thead, tbody, tr, th, td
// やること: iPhone、iPad の情報を表示するテーブルを作成

import React from 'react';

const BasicTable = () => {
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
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold'
  };
  
  const datas = [
    {id:1, type:"iPhone" , price:100000, amount: 5},
    {id:2, type: "iPad", price: 80000, amount:  3},
    // data.now()でもいいの？idだけど
  ]
  return (
    <div>
      <h3>問題1: 基本テーブル</h3>
      {/* ここにテーブルを作成してください */}
      {/* 
      目標: 以下のデータを表形式で表示
      - iPhone, ¥100,000, 5個
      - iPad, ¥80,000, 3個
      */}
      
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Price
            </th>
            <th>
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
           {datas.map(data=>(
            <tr key={data.id}>
              <td>{data.type}</td>
              <td>{data.price}</td>
              <td>{data.amount}</td>
            </tr>
           ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
