// ==============================================
// 問題4: setInterval の基本 🎲
// ==============================================
// ボタンを押すと1秒ごとに数字が増えるカウンターを作成してください。
// 🎯 期待する動作: "Start" ボタン → 1秒ごとに数字が増加
// ⚠️ まだstop機能は不要です
"use client"
import { useState } from "react";
const BasicInterval = () => {
  const[count, setCount] = useState(0);
  const[timerId, setTimerId] = useState(null);
  // ここにコードを書いてください
  // ヒント: setIntervalを使います

  const handleClick = () => {
  const id = setInterval(()=>{
      setCount((prev)=>{return prev+1});
  },1000);
  setTimerId(id);
  }
  const handleStopClick = () => {
   clearInterval(timerId);
   setTimerId(null); 
  }

  return (
    <div>
      <p>Count: {/* カウンター表示 */}</p>
      <button
        className="bg-amber-300 px-4 py-2"
        onClick={handleClick}
      >Start Counting</button>
      {count}
      <button
        className="bg-red-600 px-4 py-2"
        onClick={handleStopClick}
      >stop button</button>
    </div>
  );
};

export default BasicInterval;