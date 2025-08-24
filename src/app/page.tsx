'use client';

import React, { useState, useEffect } from 'react';

// 完全なIBM面接データ（君の回答を細分化）
const interviewData = {
  // 全質問の完全な瞬間英作文データ（内容重視・4文STAR構成）
  fullAnswerPractice: {
    q1_about_yourself: [
      { jp: '私の名前は田口龍馬です。大学では法学を学び、論理的な情報分析と説得力のあるコミュニケーションを身につけました', en: 'My name is Ryoma Taguchi. I studied law at university, which trained me to analyze information logically and communicate persuasively' },
      { jp: 'その後、アクセンチュアで国際プロジェクトに携わり、多文化での調整スキルを培いました', en: 'After that, I worked at Accenture on international projects where I developed cross-cultural coordination skills' },
      { jp: 'この1年半は独学でReactやNext.jsを使ったフロントエンド開発を学び、複数のポートフォリオプロジェクトを制作してきました', en: "Over the past year and a half, I've been self-learning frontend development using React and Next.js, building several portfolio projects" },
      { jp: 'エンジニアとしてはまだ発展途上ですが、法学的分析思考、国際経験、継続学習能力という独自の価値を提供できます', en: 'While my engineering career is still developing, I bring unique value through my legal analytical thinking, international experience, and continuous learning ability' }
    ],
    q2_why_ibm: [
      { jp: 'IBMに入りたい理由は、エンタープライズ技術とAIイノベーションのグローバルリーダーだからです', en: "I want to join IBM because it's a global leader in enterprise technology and AI innovation" },
      { jp: '特に従業員の育成と研修における強い評判に魅力を感じています', en: "I'm particularly attracted to IBM's strong reputation for employee development and training" },
      { jp: 'アクセンチュアでの国際経験と、バイリンガルコミュニケーション力、独学でのエンジニアリング学習を組み合わせることで、IBMのグローバルチームに効果的に貢献できます', en: 'My international experience at Accenture, combined with my bilingual communication skills and engineering self-learning, would allow me to contribute effectively to IBM\'s global teams' },
      { jp: 'また、フィリピンでの勤務により、技術スキルと多文化経験の両方を活かせます', en: 'Also, working in the Philippines gives me the opportunity to use both my technical skills and cross-cultural experience' }
    ],
    q3_why_frontend: [
      { jp: 'フロントエンド開発に魅力を感じる理由はいくつかあります。まず、持続的な価値を提供するスキルだからです', en: "I'm drawn to frontend development for several reasons. First, it's a skill that provides lasting value" },
      { jp: '一部の職業が時代遅れになる中、エンジニアリングスキルは成長し続け、継続学習を愛する私にとって魅力的です', en: 'while some jobs become obsolete, engineering skills continue to grow and evolve, which excites someone who loves continuous learning like me' },
      { jp: '次に、子供時代からのものづくりへの情熱とつながっています。Reactコンポーネントは、私が愛したプラモデルやゲーム作成のデジタル版のように感じます', en: 'Second, it connects to my childhood passion for building things - working with React components feels like the digital version of the model kits and game creation I loved as a child' },
      { jp: '第三に、構造的思考における法学的背景と創造的デザインを完璧に組み合わせており、IBMのような国際環境で有意義に貢献できる普遍的なスキルです', en: 'Third, it perfectly combines my legal background in structural thinking with creative design. Finally, it\'s a universal skill that allows me to contribute meaningfully in international environments like IBM' }
    ],
    q4_difficult_situation_star: [
      { jp: '【状況】アクセンチュアで中国からフィリピンへの業務・システム移管に携わっていました', en: '【Situation】The situation was at Accenture, where I was involved in transitioning work and systems from China to the Philippines' },
      { jp: '【課題】マニュアルにない問題が多発し、チームメンバーのほとんどが英語でのコミュニケーションや技術的なトラブルシューティングに対応できず、サブチームリードは完全にお手上げ状態でした', en: '【Task】The problem was that many issues weren\'t covered in the manual, and most team members couldn\'t handle English communication or technical troubleshooting. Our sub-team lead was completely overwhelmed' },
      { jp: '【行動】私は積極的に問題の仮説を立てて一つずつ調査し、中国・フィリピンチームと英語で直接連携を取りました。また、現地の現実的な状況を日本のチームリードに伝えて無理な要求を防ぎ、週末に学んでいたエンジニア知識も活用して問題を解決し、プロセスを文書化しました', en: '【Action】What I did was I proactively took the lead by forming hypotheses about problems, investigating step by step, and coordinating directly with China and Philippines teams in English. I also communicated the realistic on-site situation to the Japan team lead to prevent unrealistic requests. Using engineering knowledge I had been studying on weekends, I solved issues one by one and documented the processes' },
      { jp: '【結果】移管を成功させ、新人研修期間を3ヶ月から1ヶ月に短縮する研修資料も作成しました', en: '【Result】As a result, we successfully completed the transition, and I also created training materials that reduced new employee onboarding from 3 months to 1 month' }
    ],
    q5_creative_problem_star: [
      { jp: '【状況】以前のチームでタスクの配分が不均等に思われ、一部のメンバーが過重労働になっていました', en: '【Situation】The situation was in my previous team where task allocation seemed uneven and some members were overwhelmed' },
      { jp: '【課題】感覚ではなく実際のデータに基づいて公平にタスクを再分配する必要がありました', en: '【Task】The problem was we needed to redistribute tasks fairly based on actual data, not just feelings' },
      { jp: '【行動】クライアントに直接連絡して各タスクタイプの作業量と時間データを要求し、フィリピンのチームメンバーの日本語レベルを可視化してタスクの複雑さとマッチングし、チームリードに再配分計画を提案しました', en: '【Action】What I did was I directly contacted the client to request workload and time data for each type of task, then I visualized each Filipino team member\'s Japanese language level and matched it with task complexity. I proposed a reallocation plan to the team lead' },
      { jp: '【結果】10倍以上の作業量の差があるタスクを発見し、ミスマッチを修正して、よりスムーズな運営を実現しました', en: '【Result】As a result, we discovered tasks that had more than 10 times difference in workload, corrected the mismatches, and achieved smoother operations' }
    ],
    q6_worked_hard_no_success_star: [
      { jp: '【状況】ポートフォリオサイトを作成していた際、理想とするUX基準を達成するために何度も再設計を行っていました', en: '【Situation】The situation was when I was creating my portfolio website and repeatedly redesigning it to achieve the UX standard I envisioned' },
      { jp: '【課題】莫大な努力を投じたにも関わらず、6ヶ月で5回の大幅なレイアウト変更を行ったものの、いくつかのバージョンが期待に届かなかったことです', en: '【Task】The problem was despite putting in enormous effort, I went through 5 major layout changes in 6 months, but several versions still didn\'t meet my expectations' },
      { jp: '【行動】何がうまくいかないのかを分析し続け、トップ開発者の優秀なUI/UXの例を研究し、反復を続けました。また、AIを使って異なるコーディングスタイルやアプローチを組み合わせることも始めました', en: '【Action】What I did was I continued analyzing what wasn\'t working, studied excellent UI/UX examples from top developers, and kept iterating. I also started using AI to mix different coding styles and approaches' },
      { jp: '【結果】いくつかのバージョンは失敗しましたが、この経験からUI/UXデザインの原則とユーザーフィードバックの重要性について貴重な教訓を得ました。この期間に培った継続性と学習習慣は、現在の開発者としての継続的改善に不可欠です', en: '【Result】As a result, while some versions failed, this experience taught me valuable lessons about UI/UX design principles and the importance of user feedback. The persistence and learning habits I developed during this period are now crucial for my continuous improvement as a developer' }
    ],
    q7_learn_new_quickly_star: [
      { jp: '【状況】法学のバックグラウンドから正式な訓練なしにフロントエンド開発への転向を決意したときでした', en: '【Situation】The situation was when I decided to transition from my legal background to frontend development without formal training' },
      { jp: '【課題】合理的な期間内に高い学習効率を保ちながら、React、Next.js、そして現代の開発手法を習得する必要があったことです', en: '【Task】The problem was I needed to master React, Next.js, and modern development practices within a reasonable timeframe while maintaining high learning efficiency' },
      { jp: '【行動】脳科学の原理を使って学習条件を最適化しました。より良い集中のためにジムに行き、認知パフォーマンスのための適切な栄養を維持し、新しい概念を記憶するためのフラッシュカードシステムを作成しました。The Odin Projectなどのリソースからの構造化された学習と、実際のプロジェクトを構築することによる実践的応用を組み合わせました', en: '【Action】What I did was I used brain science principles to optimize my learning conditions - going to the gym for better focus, maintaining proper nutrition for cognitive performance, and creating a flashcard system to retain new concepts. I combined structured learning from resources like The Odin Project with practical application by building actual projects' },
      { jp: '【結果】Eコマースサイト、todoリスト、天気アプリを含むいくつかのポートフォリオプロジェクトを成功裏に構築し、現在も使い続けている持続可能な学習方法論を開発しました', en: '【Result】As a result, I successfully built several portfolio projects including an e-commerce site, todo list, and weather app, and developed a sustainable learning methodology that I continue to use' }
    ],
    q8_difficult_team_member_star: [
      { jp: '【状況】以前の職場でフィリピン人の同僚が日本人の返答や文化的なニュアンスを理解できず、フラストレーションを感じていました', en: '【Situation】The situation was at my previous workplace where a Filipino colleague was frustrated because he couldn\'t understand Japanese responses and cultural nuances' },
      { jp: '【課題】これが彼のパフォーマンスと士気に影響を与えており、最初は助けを求めることをためらっていたことです', en: '【Task】The problem was this was affecting his performance and morale, and he was hesitant to ask for help initially' },
      { jp: '【行動】彼が質問しやすいように信頼関係を築きました。仕事後に時間を割いて、日本のビジネス文化、思考パターン、適切な対応方法を説明しました。よりリラックスして効果的にするために、居酒屋でロールプレイングシナリオを練習することさえしました', en: '【Action】What I did was I built trust with him so he felt comfortable coming to me with questions. I spent time after work explaining Japanese business culture, thinking patterns, and appropriate response methods. We even practiced role-playing scenarios over drinks to make it more relaxed and effective' },
      { jp: '【結果】彼のフラストレーションは消え、自信が向上し、チームの結束が強まりました。これは離職率の低減とより良い長期雇用の維持にも貢献しました', en: '【Result】As a result, his frustration disappeared, his confidence improved, and team cohesion strengthened. This also contributed to reducing turnover and achieving better long-term employment retention' }
    ],
    q9_leadership_style: [
      { jp: '私のリーダーシップスタイルは間接的で協働的です。単純に人々にやるべきことを指示するのは適切ではないと思います', en: 'My leadership style is indirect and collaborative. I don\'t believe in simply telling people what to do' },
      { jp: '研究によると、命令に従うだけでは動機が下がるからです。代わりに、まず相手の視点を理解するために注意深く聞きます', en: 'because research shows that motivation decreases when people just follow orders. Instead, I first listen carefully to understand the other person\'s perspective' },
      { jp: '異なる見解や可能性を提示することで、相手が自然に自分の考えを整理し、目標を何にすべきかに気づくのを助けます', en: 'Then I present different viewpoints and possibilities, which naturally helps them organize their own thoughts and realize what their goals should be' },
      { jp: '結論に自分で到達するため、行動において自律性と自己動機を維持します。指揮するのではなく導くこの間接的アプローチは、サッカーチームのキャプテン、ゼミのリーダー、そして異なる年齢グループの指導経験で効果的でした', en: 'Since they arrive at the conclusion themselves, they maintain autonomy and self-motivation in their actions. This indirect approach of guiding rather than commanding has been effective in my experience as a soccer team captain, seminar leader, and when mentoring different age groups' }
    ],
    q10_handle_disagreements: [
      { jp: '意見の相違が生じたとき、まず相手の要求と視点を理解するために聞きます', en: 'When disagreements occur, I first listen to understand the other person\'s requirements and perspective' },
      { jp: '同時に私たちの状況と制約も明確に説明します', en: 'while also clearly explaining our situation and constraints' },
      { jp: 'それでも理解に至らない場合は、上司などの第三者を交えて適切な決定を行います', en: 'If we still can\'t reach understanding, I involve a third party like a supervisor to make the appropriate decision' },
      { jp: '個人的な問題にするのではなく客観的な解決策を見つけることを信じており、特定のアプローチについて意見が異なっても良好な作業関係を維持します', en: 'I believe in finding objective solutions rather than making it personal, and maintaining good working relationships even when we disagree on specific approaches' }
    ],
    strengths_weaknesses: [
      { jp: '私の主な強みは3つです：可視化と言語化能力、継続的努力、そして行動力です', en: 'My main strengths are three things: visualization and articulation ability, continuous effort, and taking action' },
      { jp: '法学教育により複雑な状況を明確に言語化し可視化する能力を身につけ、チームとのスムーズなコミュニケーションと問題解決を可能にします。継続学習の習慣があり、週末も含めて毎日何かを学習しています', en: 'First, my legal education taught me to articulate thoughts clearly and visualize complex situations, which enables smooth communication and problem-solving with teams. Second, I have a habit of continuous learning - I study something every day, including weekends' },
      { jp: '状況の改善が必要なとき、他の人がためらうような場面でも、クライアントに直接連絡したり現実的な制約をリーダーシップに伝えるなど、恐れずに行動を取ります', en: 'Third, I take action without fear when situations need improvement, such as contacting clients directly or communicating realistic constraints to leadership when others hesitate' },
      { jp: '弱みとしては、法学的背景により結論に達する前に考えすぎることがあり、回答が遅くなることがあります。考えながら行動することを学んで、思慮深い分析と迅速な行動のバランスを取るよう努めています', en: "As for weaknesses, my legal background sometimes makes me overthink before reaching conclusions, which can slow down responses. I'm working on balancing thoughtful analysis with quick action by learning to act while thinking" }
    ]
  },

  // 君がミスした重要単語帳（簡単な日本語で）
  vocabulary: [
    // 実際の練習でミスった単語
    { jp: '調整・連携', en: 'coordination', category: '練習ミス', usage: '複数のチームとの調整' },
    { jp: '携わった・参加した', en: 'was involved in', category: '練習ミス', usage: 'プロジェクトに携わった' },
    { jp: '移管・移行・引き継ぎ', en: 'transitioning', category: '練習ミス', usage: '業務の引き継ぎ' },
    { jp: 'マニュアルに載っていない', en: "weren't covered in the manual", category: '練習ミス', usage: '想定外の問題' },
    { jp: '対応する・扱う・処理する', en: 'handle', category: '練習ミス', usage: '問題に対応する' },
    { jp: '〜と同時に・〜も', en: 'as well as', category: '新ミス', usage: 'AだけでなくBも（andより丁寧）' },
    { jp: '意見の相違が起こる', en: 'disagreements occur', category: '新ミス', usage: '対立が発生する' },
    { jp: '理解するために聞く', en: 'listen to understand', category: '新ミス', usage: 'まず相手を理解する' },
    { jp: '説明しながら・同時に', en: 'while explaining', category: '新ミス', usage: '〜をしながら' },
    { jp: '上司などを巻き込む', en: 'involve a third party', category: '新ミス', usage: '第三者に相談' },
    { jp: '個人攻撃にしない', en: 'not making it personal', category: '新ミス', usage: '感情的にならない' },
    { jp: '私の目標と合う', en: 'aligns with my goal', category: '新ミス', usage: 'align = ピッタリ合う' },
    { jp: '順序立てた・きちんとした', en: 'systematic', category: '新ミス', usage: 'ちゃんとした手順' },
    { jp: '失敗を引き起こした', en: 'caused failures', category: '新ミス', usage: 'cause = 原因になる' },
    { jp: 'URLで呼び出す・指定', en: 'reference via URLs', category: '新ミス', usage: 'ファイルを指定する' },
    { jp: '一つにまとめる', en: 'bundling', category: '新ミス', usage: 'ファイルをパッケージ化' },
    
    // 重要表現
    { jp: '言語化する', en: 'articulate', category: '表現力', usage: '考えを言葉にする' },
    { jp: '可視化する', en: 'visualize', category: '表現力', usage: 'わかりやすく図にする' },
    { jp: 'チーム結束', en: 'team cohesion', category: 'チーム', usage: 'チームのまとまり' },
    { jp: '離職率', en: 'turnover', category: 'チーム', usage: '辞める人の割合' },
    { jp: '人材定着', en: 'retention', category: 'チーム', usage: '人が辞めずに残ること' },
    { jp: '自律性', en: 'autonomy', category: 'リーダー', usage: '自分で判断できる' },
    { jp: '命令する', en: 'commanding', category: 'リーダー', usage: '上から指示する' },
    { jp: '〜ではなく', en: 'rather than', category: 'リーダー', usage: '〜じゃなくて' }
  ],

  // 質問カテゴリ（フルタイトル表示）
  questionCategories: [
    { id: 'q1', title: 'Tell me about yourself（自己紹介）', sentences: 'q1_about_yourself', color: 'blue' },
    { id: 'q2', title: 'Why IBM?（なぜIBMか）', sentences: 'q2_why_ibm', color: 'green' },
    { id: 'q3', title: 'Why this position/Frontend?（なぜこのポジション）', sentences: 'q3_why_frontend', color: 'purple' },
    { id: 'q4', title: 'Tell me about a time you faced a difficult situation（困難に直面した経験・STAR）', sentences: 'q4_difficult_situation_star', color: 'red' },
    { id: 'q5', title: 'Tell me about a time you solved a problem creatively（創意工夫で解決した経験・STAR）', sentences: 'q5_creative_problem_star', color: 'orange' },
    { id: 'q6', title: 'Tell me about a time when you worked hard but didn\'t succeed（努力したが成功しなかった経験・STAR）', sentences: 'q6_worked_hard_no_success_star', color: 'amber' },
    { id: 'q7', title: 'Tell me about a time you had to learn something new quickly（新しいことを素早く学んだ経験・STAR）', sentences: 'q7_learn_new_quickly_star', color: 'indigo' },
    { id: 'q8', title: 'Tell me about a time you had to work with a difficult team member（困難なチームメンバーと働いた経験・STAR）', sentences: 'q8_difficult_team_member_star', color: 'teal' },
    { id: 'q9', title: 'Describe your leadership style（リーダーシップスタイル）', sentences: 'q9_leadership_style', color: 'yellow' },
    { id: 'q10', title: 'How do you handle disagreements with team members?（チームメンバーとの意見の相違への対処）', sentences: 'q10_handle_disagreements', color: 'gray' }
  ]
};

const IBMTrainingApp = () => {
  const [currentMode, setCurrentMode] = useState('home');
  const [currentQuestion, setCurrentQuestion] = useState('q1_about_yourself');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [mistakeCards, setMistakeCards] = useState([]);
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState('sentences');

  // 音声読み上げ
  const speakText = (text, lang = 'en-US') => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // 質問の骨組み（キーワード）取得
  const getQuestionSkeleton = (questionId) => {
    const skeletons = {
      'q1': [
        '📝 名前 → 法学で論理的思考',
        '🌍 アクセンチュア国際経験',
        '💻 1年半独学フロントエンド',
        '🎯 法学的思考×国際×継続学習'
      ],
      'q2': [
        '🏢 グローバルリーダー×AI技術',
        '📚 従業員育成の評判',
        '🌏 国際経験×バイリンガル×独学',
        '🇵🇭 フィリピンで技術×多文化経験'
      ],
      'q3': [
        '💎 持続的価値×成長投資スキル',
        '🎮 子供時代：プラモデル×ゲーム×情熱',
        '⚖️ 法学構造思考×創造デザイン',
        '🌍 普遍的スキル×IBM貢献価値'
      ],
      'q4': [
        '【S】中国→フィリピン移管',
        '【T】マニュアル外問題×英語対応不可×リード限界',
        '【A】英語連携×仮説分析×現実報告×IT知識活用',
        '【R】移管成功×研修短縮（3→1ヶ月）'
      ],
      'q5': [
        '【S】タスク配分不均等×過重労働',
        '【T】データベース公平再配分',
        '【A】客先データ要求×日本語レベル可視化×再配分提案',
        '【R】10倍差発見×ミスマッチ修正×スムーズ運営'
      ],
      'q6': [
        '【S】ポートフォリオ理想UX追求',
        '【T】6ヶ月5回変更も期待未達',
        '【A】分析継続×優秀例研究×AI活用×反復',
        '【R】失敗も教訓×継続習慣×改善力獲得'
      ],
      'q7': [
        '【S】法学→開発転向（訓練なし）',
        '【T】React×Next.js×現代開発を効率習得',
        '【A】脳科学×ジム×栄養×フラッシュカード×実践',
        '【R】複数プロジェクト×持続学習方法論'
      ],
      'q8': [
        '【S】フィリピン同僚×日本文化理解困難',
        '【T】パフォーマンス低下×助け求めず',
        '【A】信頼構築×文化説明×居酒屋ロープレ',
        '【R】不満解消×自信向上×離職率低減'
      ],
      'q9': [
        '🤝 間接的×協働的スタイル',
        '👂 相手視点理解×命令でなく傾聴',
        '💡 見解提示→自然な思考整理',
        '⚽ 自律性維持×サッカー×ゼミ×指導経験'
      ],
      'q10': [
        '👂 相手要求理解×状況説明',
        '🤝 制約も明確に伝達',
        '👥 第三者（上司）巻き込み決定',
        '🎯 客観的解決×良好関係維持'
      ]
    };
    
    const skeleton = skeletons[questionId];
    return skeleton ? skeleton.map((item, index) => (
      <div key={index} className="flex items-start space-x-2">
        <span className="text-xs text-gray-500 mt-1">•</span>
        <span>{item}</span>
      </div>
    )) : <div>骨組み準備中...</div>;
  };

  // 現在の練習データ取得
  const getCurrentPracticeData = () => {
    if (practiceMode === 'sentences') {
      return interviewData.fullAnswerPractice[currentQuestion] || [];
    } else if (practiceMode === 'vocabulary') {
      return interviewData.vocabulary;
    } else if (practiceMode === 'mistakes') {
      return mistakeCards;
    }
    return [];
  };

  const practiceData = getCurrentPracticeData();
  const currentIndex = practiceMode === 'sentences' ? currentSentenceIndex : currentVocabIndex;
  const currentItem = practiceData[currentIndex] || {};

  // 次のカードへ進む
  const goToNext = () => {
    if (practiceMode === 'sentences') {
      if (currentSentenceIndex < practiceData.length - 1) {
        setCurrentSentenceIndex(prev => prev + 1);
      } else {
        // 質問終了、次の質問へ
        const currentQuestionIndex = interviewData.questionCategories.findIndex(q => q.sentences === currentQuestion);
        if (currentQuestionIndex < interviewData.questionCategories.length - 1) {
          const nextQuestion = interviewData.questionCategories[currentQuestionIndex + 1].sentences;
          setCurrentQuestion(nextQuestion);
          setCurrentSentenceIndex(0);
        } else {
          setCurrentSentenceIndex(0); // 最初から
        }
      }
    } else {
      if (currentVocabIndex < practiceData.length - 1) {
        setCurrentVocabIndex(prev => prev + 1);
      } else {
        setCurrentVocabIndex(0);
      }
    }
    setShowAnswer(false);
  };

  // 回答処理
  const handleAnswer = (isCorrect) => {
    const newStats = {
      correct: stats.correct + (isCorrect ? 1 : 0),
      incorrect: stats.incorrect + (isCorrect ? 0 : 1),
      total: stats.total + 1
    };
    setStats(newStats);

    // 間違いの記録
    if (!isCorrect) {
      const mistakeItem = {
        ...currentItem,
        question: currentQuestion,
        mistakeCount: (currentItem.mistakeCount || 0) + 1,
        timestamp: new Date().toISOString()
      };
      setMistakeCards(prev => {
        const existingIndex = prev.findIndex(item => 
          item.jp === currentItem.jp && item.question === currentQuestion
        );
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = mistakeItem;
          return updated;
        }
        return [...prev, mistakeItem];
      });
    }

    // 次のカードへ
    setTimeout(goToNext, 800);
  };

  // ホーム画面
  const HomePage = () => (
    <div className="space-y-6">
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
        <h1 className="text-4xl font-bold mb-3">🎯 IBM面接 完全攻略システム</h1>
        <p className="text-blue-100 text-lg">火曜日の面接まで完璧に準備しましょう！</p>
        <div className="mt-4 flex justify-center space-x-8 text-sm">
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <div className="font-bold text-xl">{Object.keys(interviewData.fullAnswerPractice).length}</div>
            <div>質問完備</div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <div className="font-bold text-xl">{interviewData.vocabulary.length}</div>
            <div>重要語彙</div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <div className="font-bold text-xl">STAR</div>
            <div>完全対応</div>
          </div>
        </div>
      </div>

      {/* 統計表示 */}
      {stats.total > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📊 今日の学習統計</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.correct}</div>
              <div className="text-green-700">正解</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.incorrect}</div>
              <div className="text-red-700">間違い</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((stats.correct / stats.total) * 100)}%
              </div>
              <div className="text-blue-700">正答率</div>
            </div>
          </div>
        </div>
      )}

      {/* 間違い分析 */}
      {mistakeCards.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-800 mb-4">❌ 弱点分析 ({mistakeCards.length}個)</h3>
          
          <div className="bg-white rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
            <h4 className="font-bold text-red-700 mb-3">📋 間違い一覧</h4>
            {mistakeCards.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 px-3 hover:bg-gray-50 rounded">
                <div className="flex-1">
                  <div className="text-sm text-gray-600">{item.jp}</div>
                  <div className="font-bold text-red-700">{item.en}</div>
                </div>
                <div className="text-right">
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                    ×{item.mistakeCount || 1}
                  </span>
                  <button
                    onClick={() => speakText(item.en)}
                    className="ml-2 text-red-600 hover:bg-red-100 p-1 rounded"
                  >
                    🔊
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setPracticeMode('mistakes');
                setCurrentMode('practice');
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🔄 間違いのみ復習する
            </button>
            <button
              onClick={() => setMistakeCards([])}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              🗑️ リセット
            </button>
          </div>
        </div>
      )}

      {/* 質問別練習 */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ 質問別瞬間英作文</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interviewData.questionCategories.map(q => (
            <div key={q.id} className="border border-gray-200 rounded-lg p-4">
              <button
                onClick={() => {
                  setCurrentQuestion(q.sentences);
                  setPracticeMode('sentences');
                  setCurrentSentenceIndex(0);
                  setShowAnswer(false);
                  setCurrentMode('practice');
                }}
                className={`w-full text-left bg-${q.color}-50 hover:bg-${q.color}-100 p-4 rounded-lg transition-colors border border-${q.color}-200 mb-3`}
              >
                <div className={`font-bold text-${q.color}-800 mb-1`}>{q.title}</div>
                <div className={`text-sm text-${q.color}-600`}>
                  {interviewData.fullAnswerPractice[q.sentences]?.length || 0}文で完全マスター
                </div>
              </button>
              
              {/* 質問の骨組み表示 */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-700 mb-2">🎯 話題の骨組み</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  {getQuestionSkeleton(q.id)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 語彙練習 */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📚 重要語彙マスター</h3>
        <p className="text-gray-600 mb-4">IBM面接必須の{interviewData.vocabulary.length}語彙を完全習得</p>
        <button
          onClick={() => {
            setPracticeMode('vocabulary');
            setCurrentVocabIndex(0);
            setShowAnswer(false);
            setCurrentMode('practice');
          }}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          語彙練習を開始
        </button>
      </div>
    </div>
  );

  // 練習画面
  const PracticeMode = () => {
    if (practiceData.length === 0) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">練習データがありません</h2>
          <button
            onClick={() => setCurrentMode('home')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            ← ホームに戻る
          </button>
        </div>
      );
    }

    const progress = Math.round(((currentIndex + 1) / practiceData.length) * 100);
    const questionInfo = interviewData.questionCategories.find(q => q.sentences === currentQuestion);

    return (
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                {practiceMode === 'sentences' && '⚡ 瞬間英作文'}
                {practiceMode === 'vocabulary' && '📚 語彙練習'}
                {practiceMode === 'mistakes' && '🔄 間違い復習'}
              </h2>
              <p className="text-green-100">
                {practiceMode === 'sentences' && questionInfo?.title}
                {practiceMode === 'vocabulary' && `カテゴリー: ${currentItem.category || 'All'}`}
                {practiceMode === 'mistakes' && '弱点克服トレーニング'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentIndex + 1}</div>
              <div className="text-sm opacity-90">/ {practiceData.length}</div>
            </div>
          </div>
          
          {/* プログレスバー */}
          <div className="bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* 統計 */}
          <div className="flex justify-center space-x-6 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded">✓ {stats.correct}</span>
            <span className="bg-white/20 px-3 py-1 rounded">✗ {stats.incorrect}</span>
            <span className="bg-white/20 px-3 py-1 rounded">
              正答率: {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
            </span>
          </div>
        </div>

        {/* メインカード */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            {!showAnswer ? (
              <>
                <div className="mb-6">
                  <h3 className="text-4xl font-bold text-gray-800 mb-4">
                    {currentItem.jp}
                  </h3>
                  {practiceMode === 'vocabulary' && (
                    <div className="space-y-2">
                      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {currentItem.category}
                      </span>
                      <p className="text-gray-600 text-sm">{currentItem.usage}</p>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-8 text-lg">↓ 英語で瞬間的に言ってみましょう ↓</p>
                <button
                  onClick={() => setShowAnswer(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 rounded-xl text-xl font-bold transition-colors transform hover:scale-105"
                >
                  答えを見る
                </button>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600 mb-3">{currentItem.jp}</p>
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <h3 className="text-3xl font-bold text-blue-600">
                      {currentItem.en}
                    </h3>
                    <button
                      onClick={() => speakText(currentItem.en)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-3 rounded-full transition-colors"
                    >
                      🔊
                    </button>
                  </div>
                  {practiceMode === 'vocabulary' && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">使い方: </span>
                        {currentItem.usage}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAnswer(false)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 px-8 rounded-xl text-lg font-bold transition-colors"
                  >
                    ❌ 間違えた
                  </button>
                  <button
                    onClick={() => handleAnswer(true)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-xl text-lg font-bold transition-colors"
                  >
                    ✅ 正解！
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* コントロールパネル */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setCurrentMode('home')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              🏠 ホーム
            </button>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              🔄 {showAnswer ? '質問に戻る' : '答えを見る'}
            </button>
            <button
              onClick={goToNext}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ⏭️ 次のカード
            </button>
            {practiceMode === 'sentences' && (
              <button
                onClick={() => {
                  setPracticeMode('vocabulary');
                  setCurrentVocabIndex(0);
                  setShowAnswer(false);
                }}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📚 語彙練習へ
              </button>
            )}
            {practiceMode === 'vocabulary' && (
              <button
                onClick={() => {
                  setPracticeMode('sentences');
                  setCurrentSentenceIndex(0);
                  setShowAnswer(false);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ⚡ 文章練習へ
              </button>
            )}
          </div>
        </div>

        {/* 質問選択パネル（文章練習時のみ） */}
        {practiceMode === 'sentences' && (
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h4 className="font-bold text-gray-800 mb-3">📝 質問を選択</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {interviewData.questionCategories.map(q => (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQuestion(q.sentences);
                    setCurrentSentenceIndex(0);
                    setShowAnswer(false);
                  }}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    currentQuestion === q.sentences
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="font-bold">{q.title}</div>
                  <div className="text-xs opacity-75">
                    {interviewData.fullAnswerPractice[q.sentences]?.length || 0}文
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* ナビゲーション */}
        {currentMode !== 'home' && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCurrentMode('home')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentMode === 'home'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                🏠 ホーム
              </button>
              <button
                onClick={() => setCurrentMode('practice')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentMode === 'practice'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                ⚡ 練習中
              </button>
              <div className="flex-1"></div>
              {practiceMode === 'sentences' && currentMode === 'practice' && (
                <div className="text-sm text-gray-600 px-3 py-2">
                  現在: {interviewData.questionCategories.find(q => q.sentences === currentQuestion)?.title || '質問'}
                  （{currentSentenceIndex + 1}/{practiceData.length}）
                </div>
              )}
            </div>
          </div>
        )}

        {/* メインコンテンツ */}
        {currentMode === 'home' && <HomePage />}
        {currentMode === 'practice' && <PracticeMode />}

        {/* フッター */}
        <div className="mt-8 bg-white rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-800 mb-2">
            🔥 火曜日の面接まであと少し！
          </div>
          <p className="text-gray-600">
            完璧な準備で自信を持って臨みましょう 💪
          </p>
          <div className="mt-4 text-sm text-gray-500">
            🎯 全質問対応 • 📚 豊富な語彙 • ⚡ 瞬間英作文 • 🔄 弱点克服
          </div>
        </div>
      </div>
    </div>
  );
};

export default IBMTrainingApp;