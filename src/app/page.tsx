'use client'

// React HTMLテーブル要素 段階的練習問題
// IBM面接対策：table, thead, tbody, tr, th, td を使ったデータ表示をマスター
// APIデータ取得 + テーブル表示の完全習得！

// ==============================================
// 問題1: 基本的なHTMLテーブル構造
// ==============================================
// 静的データを使って基本的なテーブルを作成してください
// 必須要素: table, thead, tbody, tr, th, td

import React from 'react';

const BasicTable = () => {
  return (
    <div>
      <h3>基本テーブル</h3>
      {/* ここにテーブルのHTMLを書いてください */}
      <table>
        <thead>
          <tr>
            <th>
                Name
            </th>
            <th>
                tell
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
                Ryoma
            </td>
            <td>
                777
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;