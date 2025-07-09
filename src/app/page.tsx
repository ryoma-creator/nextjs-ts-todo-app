// TypeScript 段階的練習問題 - To-doリストで学ぶ基礎
// JavaScriptレベルと同じ難易度で、TypeScriptを段階的に学びましょう。
// 実務で頻出するTypeScriptの型を、To-doリスト作成を通じて習得します。

// ==============================================
// 問題1: 基本の型定義 - 変数に型をつける
// ==============================================
// 🎯 使うTypeScript: string, number, boolean
// ヒント: 変数名: 型名 = 値;

"use client"

function createBasicVariables() {
  // ここに型付きの変数を作成してください
  // todoText (文字列型)
  // todoId (数値型)  
  // isCompleted (真偽値型)
  
  const todoText: string = "to do textでーす"
  const todoId: number = 710;
  const isCompleted: boolean = true;

  console.log("todoText:", todoText);
  console.log("todoId:", todoId);
  console.log("isCompleted:", isCompleted);
}

// テスト
createBasicVariables();

export default createBasicVariables;
