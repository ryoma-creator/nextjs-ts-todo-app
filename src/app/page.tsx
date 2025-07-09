// ==============================================
// 問題5: 関数の引数と戻り値に型定義
// ==============================================
// 🎯 使うTypeScript: (引数: 型) => 戻り値型
// ヒント: function 関数名(引数: 型): 戻り値型 { }

'use client'

// まずTodo interfaceが必要です
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// ここに型付きの関数を書いてください
// addTodo関数: 文字列を受け取って、Todo型を返す
  const addTodo=(text: string):Todo=>{
    return {
      id: Date.now(),
      text: text,
      completed: false
    };
  };

// テスト
console.log("Added Todo:", addTodo("TypeScript勉強する"));

export default addTodo;
