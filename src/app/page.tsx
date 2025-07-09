// TypeScript 段階的練習問題 - To-doリストで学ぶ基礎
// JavaScriptレベルと同じ難易度で、TypeScriptを段階的に学びましょう。
// 実務で頻出するTypeScriptの型を、To-doリスト作成を通じて習得します。

// ==============================================
// 問題1: 基本の型定義 - 変数に型をつける
// ==============================================
// 🎯 使うTypeScript: string, number, boolean
// ヒント: 変数名: 型名 = 値;

"use client"

// ==============================================
// 問題3: オブジェクトの型定義 - To-do1個の形
// ==============================================
// 🎯 使うTypeScript: {プロパティ: 型, プロパティ: 型}
// ヒント: {id: number, text: string, completed: boolean}

function createSingleTodo() {
  // ここにオブジェクトの型定義を書いてください
  // todo という名前で、id, text, completedを持つオブジェクト
  const todo: { id: number; text: string; completed: boolean} = {
    id: 1,
    text: "Ts 復習中でーす",
    completed: false
  } 
  
  
  console.log("Single Todo:", todo);
  return todo;
}

// テスト
createSingleTodo();



export default createSingleTodo;
