'use client'
import { useState, useEffect } from "react";

// 完成させてください（5分）
const NumberList = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNumbers = async () => {
    setLoading(true);
    // TODO: setTimeout を使って [1,2,3,4,5] をセット
    // TODO: 1秒後にローディングを false に
    setTimeout(()=>{
      setNumbers([1, 2, 3, 4, 5]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // TODO: fetchNumbers を呼ぶ
    fetchNumbers();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {/* TODO: numbers をマップして表示 */}
          {numbers.map((number:number, index:number)=>{
            return (
            <div key={number}>
              <div>{number}</div>
            </div>
            )
          })}
        </ul>
      )}
    </div>
  );
};

export default NumberList;