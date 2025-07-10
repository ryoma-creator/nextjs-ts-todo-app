// React Props段階的復習問題 - サクッとマスター
// TypeScript問題5に進む前に、Propsの基本を思い出しましょう
// 各問題2-3分で完了、合計10分でProps完全復習！

// ==============================================
// 問題1: 文字列Props - 超基本
// ==============================================
// 名前を表示するコンポーネントにPropsで名前を渡してください

'use client'
import { useState } from 'react';

// 子コンポーネント（名前を受け取って表示）
const NameDisplay = (props:{name: string}): React.ReactNode=> {
  return (
    <div>
      {/* ここにprops.nameを表示してください */}
      {props.name}
    </div>
  );
};

// 親コンポーネント
const PropsTest1 = () => {
  return (
    <div>
      <h2>Props問題1: 文字列渡し</h2>
      {/* ここにNameDisplayコンポーネントを使って、name="太郎"を渡してください */}
      <NameDisplay name="cross"/>
    </div>
  );
};

export default PropsTest1;