'use client';

import React, { useState, useEffect } from 'react';
import { interviewData } from '../data/interviewData';
import type { VocabularyItem } from '../data/interviewData';

type Mode = 'home' | 'vocabulary' | 'vocab-list' | 'answers' | 'mistakes' | 'coping';

const IBMInterviewTraining = () => {
  const [currentMode, setCurrentMode] = useState<Mode>('home');
  const [currentVocabSet, setCurrentVocabSet] = useState(0);
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [currentAnswerKey, setCurrentAnswerKey] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [showJapanese, setShowJapanese] = useState(false);
  const [mistakeWords, setMistakeWords] = useState<VocabularyItem[]>([]);
  const [wordStats, setWordStats] = useState<{[key: string]: {mistakes: number, correct: number}}>({});
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのみ実行
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ローカルストレージから読み込み（クライアントサイドのみ）
  useEffect(() => {
    if (isClient) {
      const savedMistakes = localStorage.getItem('ibm-mistake-words');
      const savedStats = localStorage.getItem('ibm-word-stats');
      if (savedMistakes) setMistakeWords(JSON.parse(savedMistakes));
      if (savedStats) setWordStats(JSON.parse(savedStats));
    }
  }, [isClient]);

  // ローカルストレージに保存（クライアントサイドのみ）
  const saveMistakeWords = (mistakes: VocabularyItem[]) => {
    setMistakeWords(mistakes);
    if (isClient) {
      localStorage.setItem('ibm-mistake-words', JSON.stringify(mistakes));
    }
  };

  const saveWordStats = (stats: {[key: string]: {mistakes: number, correct: number}}) => {
    setWordStats(stats);
    if (isClient) {
      localStorage.setItem('ibm-word-stats', JSON.stringify(stats));
    }
  };

  // 語彙を10単語ずつのセットに分割
  const getVocabularySet = (setIndex: number) => {
    const startIndex = setIndex * 10;
    return interviewData.vocabulary.slice(startIndex, startIndex + 10);
  };

  const totalVocabSets = Math.ceil(interviewData.vocabulary.length / 10);

  // 間違い記録
  const recordMistake = (word: VocabularyItem) => {
    const newStats = { ...wordStats };
    const wordKey = word.en;
    
    if (!newStats[wordKey]) {
      newStats[wordKey] = { mistakes: 0, correct: 0 };
    }
    newStats[wordKey].mistakes += 1;
    
    const existingIndex = mistakeWords.findIndex(w => w.en === word.en);
    let newMistakes;
    if (existingIndex === -1) {
      newMistakes = [...mistakeWords, word];
    } else {
      newMistakes = [...mistakeWords];
    }
    
    newMistakes.sort((a, b) => {
      const aMistakes = newStats[a.en]?.mistakes || 0;
      const bMistakes = newStats[b.en]?.mistakes || 0;
      return bMistakes - aMistakes;
    });

    saveMistakeWords(newMistakes);
    saveWordStats(newStats);
  };

  // 正解記録
  const recordCorrect = (word: VocabularyItem) => {
    const newStats = { ...wordStats };
    const wordKey = word.en;
    
    if (!newStats[wordKey]) {
      newStats[wordKey] = { mistakes: 0, correct: 0 };
    }
    newStats[wordKey].correct += 1;
    
    if (newStats[wordKey].correct >= 5) {
      const newMistakes = mistakeWords.filter(w => w.en !== word.en);
      saveMistakeWords(newMistakes);
    }
    
    saveWordStats(newStats);
  };

  // ホーム画面
  const HomePage = () => (
    <div className="space-y-6">
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
        <h1 className="text-4xl font-bold mb-3">🎯 IBM面接 完全攻略システム</h1>
        <p className="text-blue-100 text-lg">月曜日の面接まで完璧に準備しましょう！</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setCurrentMode('vocabulary')}
          className="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="text-3xl">📚</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">語彙マスター（10単語ずつ）</h3>
              <p className="text-gray-600">IBM面接頻出語彙32語を効率学習</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setCurrentMode('vocab-list')}
          className="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="text-3xl">📖</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">語彙一覧表示</h3>
              <p className="text-gray-600">全32語を一目でチェック</p>
            </div>
          </div>
        </button>

        {mistakeWords.length > 0 && (
          <button
            onClick={() => setCurrentMode('mistakes')}
            className="w-full bg-red-50 border border-red-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🔥</div>
              <div>
                <h3 className="text-xl font-bold text-red-800 mb-1">間違い単語集中訓練</h3>
                <p className="text-red-600">{mistakeWords.length}個の単語が要復習（5回正解で除去）</p>
              </div>
            </div>
          </button>
        )}

        <button
          onClick={() => setCurrentMode('answers')}
          className="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="text-3xl">📋</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">質問別回答集</h3>
              <p className="text-gray-600">全15質問の3文回答 + 完璧回答例</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setCurrentMode('coping')}
          className="w-full bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="text-3xl">🆘</div>
            <div>
              <h3 className="text-xl font-bold text-orange-800 mb-1">面接対処法・緊急フレーズ集</h3>
              <p className="text-orange-600">わからない質問が来た時の切り返し方</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  // 語彙練習画面
  const VocabularyMode = () => {
    const currentSet = getVocabularySet(currentVocabSet);
    const currentItem = currentSet[currentVocabIndex] || {};
    const stats = wordStats[currentItem.en] || { mistakes: 0, correct: 0 };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">📚 語彙マスター セット{currentVocabSet + 1}</h2>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentVocabIndex + 1}</div>
              <div className="text-sm opacity-90">/ {currentSet.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {!showAnswer ? (
            <>
              <h3 className="text-4xl font-bold text-gray-800 mb-4">{currentItem.en}</h3>
              <div className="space-y-2 mb-6">
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {currentItem.category}
                </span>
                {stats.mistakes > 0 && (
                  <div className="text-red-600 font-bold">
                    間違い: {stats.mistakes}回 | 正解: {stats.correct}回
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-8">↓ 日本語で意味を考えてみましょう ↓</p>
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-12 py-4 rounded-xl text-xl font-bold"
              >
                答えを見る
              </button>
            </>
          ) : (
            <>
              <h3 className="text-3xl font-bold text-purple-600 mb-2">{currentItem.en}</h3>
              <p className="text-2xl text-gray-800 mb-4">{currentItem.jp}</p>
              <p className="text-gray-600 mb-6 italic">"{currentItem.usage}"</p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    recordMistake(currentItem);
                    const nextIndex = currentVocabIndex + 1;
                    if (nextIndex < currentSet.length) {
                      setCurrentVocabIndex(nextIndex);
                    } else {
                      setCurrentVocabIndex(0);
                    }
                    setShowAnswer(false);
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl"
                >
                  ❌ 間違えた
                </button>
                <button
                  onClick={() => {
                    recordCorrect(currentItem);
                    const nextIndex = currentVocabIndex + 1;
                    if (nextIndex < currentSet.length) {
                      setCurrentVocabIndex(nextIndex);
                    } else {
                      setCurrentVocabIndex(0);
                    }
                    setShowAnswer(false);
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl"
                >
                  ✅ 正解
                </button>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl p-4">
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {Array.from({ length: totalVocabSets }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentVocabSet(i);
                  setCurrentVocabIndex(0);
                  setShowAnswer(false);
                }}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentVocabSet === i
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                セット{i + 1}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCurrentMode('home')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              🏠 ホーム
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 語彙一覧表示画面
  const VocabListMode = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-3">📖 IBM面接語彙一覧</h2>
          <p className="text-indigo-100">全{interviewData.vocabulary.length}語を一目でチェック</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">IBM面接頻出語彙</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewData.vocabulary.map((word, index) => {
              const stats = wordStats[word.en] || { mistakes: 0, correct: 0 };
              return (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-800">{word.en}</h4>
                      <p className="text-gray-700">{word.jp}</p>
                    </div>
                    {stats.mistakes > 0 && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                        間違い{stats.mistakes}回
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 italic">"{word.usage}"</p>
                  <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs mt-2">
                    {word.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setCurrentMode('home')}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-8 rounded-lg"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    );
  };

  // 間違い単語練習画面
  const MistakesMode = () => {
    if (mistakeWords.length === 0) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">間違い単語はありません！</h2>
          <button
            onClick={() => setCurrentMode('home')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            🏠 ホームに戻る
          </button>
        </div>
      );
    }

    const currentItem = mistakeWords[currentVocabIndex] || {};
    const stats = wordStats[currentItem.en] || { mistakes: 0, correct: 0 };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">🔥 間違い単語集中訓練</h2>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentVocabIndex + 1}</div>
              <div className="text-sm opacity-90">/ {mistakeWords.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {!showAnswer ? (
            <>
              <h3 className="text-4xl font-bold text-gray-800 mb-4">{currentItem.en}</h3>
              <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 font-bold">
                  間違い: {stats.mistakes}回 | 正解: {stats.correct}/5回
                </p>
                <p className="text-red-600 text-sm mt-1">
                  5回正解でクリア！
                </p>
              </div>
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-12 py-4 rounded-xl text-xl font-bold"
              >
                答えを見る
              </button>
            </>
          ) : (
            <>
              <h3 className="text-3xl font-bold text-red-600 mb-2">{currentItem.en}</h3>
              <p className="text-2xl text-gray-800 mb-4">{currentItem.jp}</p>
              <p className="text-gray-600 mb-6 italic">"{currentItem.usage}"</p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    recordMistake(currentItem);
                    const nextIndex = (currentVocabIndex + 1) % mistakeWords.length;
                    setCurrentVocabIndex(nextIndex);
                    setShowAnswer(false);
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl"
                >
                  ❌ また間違えた
                </button>
                <button
                  onClick={() => {
                    recordCorrect(currentItem);
                    if (stats.correct + 1 >= 5) {
                      if (mistakeWords.length > 1) {
                        const nextIndex = currentVocabIndex >= mistakeWords.length - 1 ? 0 : currentVocabIndex;
                        setCurrentVocabIndex(nextIndex);
                      }
                    } else {
                      const nextIndex = (currentVocabIndex + 1) % mistakeWords.length;
                      setCurrentVocabIndex(nextIndex);
                    }
                    setShowAnswer(false);
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl"
                >
                  ✅ 正解！
                </button>
              </div>
            </>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => setCurrentMode('home')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            🏠 ホーム
          </button>
        </div>
      </div>
    );
  };

  // 質問別回答画面
  const AnswersMode = () => {
    if (currentAnswerKey === '') {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-3">📋 質問別回答集</h2>
            <p className="text-purple-100">全15質問の3文回答システム</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(interviewData.questionAnswers).map(([key, data]) => (
              <button
                key={key}
                onClick={() => {
                  setCurrentAnswerKey(key);
                  setShowJapanese(false);
                }}
                className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow text-left h-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {data.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-2 leading-tight">{data.question}</h3>
                {data.questionJP && (
                  <p className="text-xs text-gray-600 mb-2">{data.questionJP}</p>
                )}
                <div className="flex flex-wrap gap-1">
                  {data.keyPoints.slice(0, 2).map((point, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {point}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentMode('home')}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-8 rounded-lg"
            >
              🏠 ホーム
            </button>
          </div>
        </div>
      );
    }

    const answerData = interviewData.questionAnswers[currentAnswerKey];
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-2">{answerData.question}</h2>
          <p className="text-purple-100">{answerData.questionJP}</p>
          <p className="text-purple-200 mt-1">カテゴリ: {answerData.category}</p>
        </div>

        {/* 骨組み */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 回答の骨組み</h3>
          <div className="space-y-2">
            {answerData.skeleton.map((point, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-400">
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3文回答 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ 3文回答（90秒以内）</h3>
          
          <div className="space-y-4">
            {answerData.threeLineAnswer.map((line, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <p className="text-gray-800 leading-relaxed text-lg flex-1">{line}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IBMのコツ */}
        {answerData.ibmTips && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">💡 IBM面接攻略のコツ</h3>
            <div className="space-y-2">
              {answerData.ibmTips.map((tip, index) => (
                <p key={index} className="text-yellow-700">{tip}</p>
              ))}
            </div>
          </div>
        )}

        {/* キーポイント */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-bold text-gray-800 mb-3">🎯 キーポイント</h4>
          <div className="flex flex-wrap gap-2">
            {answerData.keyPoints.map((point, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
                {point}
              </span>
            ))}
          </div>
        </div>

        {/* 操作ボタン */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                setCurrentAnswerKey('');
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg"
            >
              ← 質問一覧に戻る
            </button>
            <button
              onClick={() => setCurrentMode('home')}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg"
            >
              🏠 ホーム
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 面接対処法画面
  const CopingMode = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-3">🆘 IBM面接 緊急対処法</h2>
          <p className="text-orange-100">わからない質問が来た時の切り返し方</p>
        </div>

        {/* 知らない単語対処法 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">❓ 知らない単語が出た時</h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-blue-800 mb-2">🎯 基本戦略: 堂々と聞き返す</h4>
            <div className="space-y-2 text-blue-700">
              <p><strong>1.</strong> "Could you clarify what you mean by [単語]?"</p>
              <p><strong>2.</strong> "Let me make sure I understand correctly..."</p>
              <p><strong>3.</strong> "Could you provide more context about [話題]?"</p>
              <p><strong>4.</strong> "I want to give you the most relevant example..."</p>
            </div>
          </div>
        </div>

        {/* IBM評価基準に基づく対処法 */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">✅ IBM Philippines面接での評価基準</h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-green-700 mb-2">🏆 高評価される対処法</h4>
              <div className="space-y-2 text-green-700 text-sm">
                <p><strong>✓ プロアクティブな質問返し:</strong> "Could you clarify..."は積極性と学習意欲の証明</p>
                <p><strong>✓ コラボレーション重視:</strong> "I want to give you the most relevant example"は協力姿勢を示す</p>
                <p><strong>✓ 冷静さと建設的態度:</strong> パニックにならず、問題解決に向かう姿勢</p>
                <p><strong>✓ オープンコミュニケーション:</strong> 正直に不明点を伝える透明性</p>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="font-bold text-red-700 mb-2">❌ 避けるべき行動</h4>
              <div className="space-y-2 text-red-700 text-sm">
                <p><strong>✗ 推測で答える:</strong> 不正確な回答はマイナス評価</p>
                <p><strong>✗ 黙り込む:</strong> コミュニケーション能力への疑問</p>
                <p><strong>✗ "知らない"だけで終わる:</strong> 学習意欲が見えない</p>
                <p><strong>✗ 話題をそらす:</strong> 問題回避の印象</p>
              </div>
            </div>
          </div>
        </div>

        {/* 緊急フレーズ集 */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-800 mb-4">🚨 緊急時フレーズ集（暗記推奨）</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-red-700 mb-2">時間稼ぎフレーズ</h4>
              <div className="space-y-1 text-sm text-red-600">
                <p>"That's an interesting question..."</p>
                <p>"Let me think about that for a moment..."</p>
                <p>"Could you clarify what you mean by..."</p>
                <p>"I want to make sure I understand correctly..."</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-red-700 mb-2">質問返しフレーズ</h4>
              <div className="space-y-1 text-sm text-red-600">
                <p>"Could you provide more context about..."</p>
                <p>"Are you asking about [A] or [B]?"</p>
                <p>"What specific aspect would you like me to focus on?"</p>
                <p>"Could you help me understand the situation better?"</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setCurrentMode('home')}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-8 rounded-lg"
          >
            🏠 ホームに戻る
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        {currentMode === 'home' && <HomePage />}
        {currentMode === 'vocabulary' && <VocabularyMode />}
        {currentMode === 'vocab-list' && <VocabListMode />}
        {currentMode === 'mistakes' && <MistakesMode />}
        {currentMode === 'answers' && <AnswersMode />}
        {currentMode === 'coping' && <CopingMode />}
      </div>
    </div>
  );
};

export default IBMInterviewTraining;