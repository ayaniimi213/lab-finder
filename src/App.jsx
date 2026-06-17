import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, RotateCcw, Award, CheckCircle, Info, GraduationCap } from 'lucide-react';

// --- 全46研究室の完全データセット ---
const FULL_LAB_DATA = [
  { id: 1, prof: "石尾 隆", keywords: ["ソフトウェア工学", "自動デバッグ", "生成系AI(GPT/LLM)", "GitHub分析", "コード可視化"] },
  { id: 2, prof: "石榑 康雄 / 佐藤 生馬", keywords: ["ヘルスケアICT", "Well-being", "ARグラス", "認知症予防", "スポーツテック", "AI画像診断"] },
  { id: 3, prof: "石田 繁巳", keywords: ["無線通信", "IoTセンシング", "スマートホーム", "Wi-Fi位置推定", "高度交通システム(ITS)"] },
  { id: 4, prof: "伊藤 恵", keywords: ["プログラミング教育", "生成AI活用", "地域ICT支援", "観光DX", "防災教育"] },
  { id: 5, prof: "稲村 浩", keywords: ["ネットワークセキュリティ", "サイバー攻撃対策", "自律分散システム", "モバイルネットワーク", "省電力技術"] },
  { id: 6, prof: "奥野 拓", keywords: ["観光アプリ開発", "情報推薦システム", "デジタルアーカイブ", "自然言語処理", "UXデザイン"] },
  { id: 7, prof: "佐藤 生馬", keywords: ["医療AI", "手術支援ロボット", "遠隔医療", "熟練医の技法継承", "5G通信基盤"] },
  { id: 8, prof: "佐藤 仁樹", keywords: ["情報社会学", "データサイエンス", "趣味の統計分析", "リベラルアーツ", "意思決定モデル"] },
  { id: 9, prof: "姜 暁鴻", keywords: ["ネットワーク保護", "無線セキュリティ", "物理層認証", "隠蔽通信", "大規模障害対策"] },
  { id: 10, prof: "白石 陽", keywords: ["ユビキタスコンピューティング", "自動運転", "スマートシティ", "歩行者ナビ", "参加型センシング"] },
  { id: 11, prof: "白勢 政明", keywords: ["暗号理論", "耐量子計算機暗号", "AIセキュリティ", "QRコード悪用検知", "ダークパターン"] },
  { id: 12, prof: "塚田 浩二", keywords: ["日用品UI", "電子手芸(e-Textile)", "プロトタイピング", "3Dプリント", "一芸研究"] },
  { id: 13, prof: "寺沢 憲吾", keywords: ["画像処理", "ディープラーニング", "文書解析", "くずし字認識", "高速検索アルゴリズム"] },
  { id: 14, prof: "中小路 久美代", keywords: ["創造性支援", "経験デザイン", "MR(複合現実)", "HCI(人との対話)", "視覚的思考"] },
  { id: 15, prof: "長崎 健", keywords: ["コンピュータビジョン", "海洋画像処理", "3次元計測", "組込みOS", "省電力IoT"] },
  { id: 16, prof: "新美 礼彦", keywords: ["データマイニング", "機械学習の公平性", "プライバシー保護", "不正利用検知", "生成AI教育"] },
  { id: 17, prof: "松原 克弥", keywords: ["仮想化技術", "クラウド基盤", "OS自作", "システムソフトウェア", "自動暗号化"] },
  { id: 18, prof: "和田 雅昭", keywords: ["マリンIT", "スマート水産業", "カーボンニュートラル", "地方創生", "水産GX"] },
  { id: 19, prof: "ジョンソン・アンドリュー", keywords: ["国際交流(VE)", "異文化交流", "AIフィードバック", "スマート農業"] },
  { id: 20, prof: "バゲンダ・ドミニク", keywords: ["アフリカの公衆衛生", "途上国支援ICT", "健康教育アプリ", "リテラシー向上"] },
  { id: 21, prof: "山内 翔", keywords: ["ロボット自動設計", "3Dプリンタ製骨格", "キャラクターロボット", "変形ロボット", "身体拡張"] },
  { id: 22, prof: "イドネ・ビンセンゾウ", keywords: ["都市ゲーミフィケーション", "遊びのデザイン", "スマートシティ", "ゲームベース学習", "レトロゲーム"] },
  { id: 23, prof: "西沢 俊広", keywords: ["ドローン制御", "ソーシャルロボット", "災害対応", "UI/UXデザイン", "デジタル建築"] },
  { id: 24, prof: "平野 智紀", keywords: ["学習環境デザイン", "インフォーマル学習", "キャリア教育支援", "シビックプライド"] },
  { id: 25, prof: "村井 源", keywords: ["物語論", "AI創作", "コンテンツ分析", "自然言語処理", "文学・小説"] },
  { id: 26, prof: "スミス・アダム", "keywords": ["e-Learning", "英語教育ICT", "国際交流支援", "学習ログ可視化"] },
  { id: 27, prof: "川越 敏司", "keywords": ["ゲーム理論", "行動経済学", "ナッジ(行動変容)", "マーケットデザイン", "人工社会"] },
  { id: 28, prof: "伊藤 精英", "keywords": ["五感心理学", "香りの評価アプリ", "音楽療法ICT", "超音波の生体影響"] },
  { id: 29, prof: "安井 重哉", "keywords": ["UX/UIデザイン", "知覚特性", "アクセシビリティ", "プロダクトデザイン", "未来のスイッチ"] },
  { id: 30, prof: "寺井 あすか", "keywords": ["創造的思考", "比喩の認知科学", "ユーモア", "LLM分析", "概念の結合"] },
  { id: 31, prof: "香取 勇一", "keywords": ["脳型AI", "神経回路シミュレーション", "非線形", "自律移動ロボット"] },
  { id: 32, prof: "長田 純一", "keywords": ["コミュニケーションロボット", "音声合成", "ヘルスケアデザイン", "サービスデザイン"] },
  { id: 33, prof: "角 薫", "keywords": ["感情コンピューティング", "メタバース", "バーチャルエージェント", "シリアスゲーム", "VR/AR"] },
  { id: 34, prof: "山田 恭史", "keywords": ["生物模倣(コウモリ/魚)", "超音波センサ", "自律飛行ドローン", "バイオ知能"] },
  { id: 35, prof: "三上 貞芳", "keywords": ["ロボット機構", "バイオロボティクス", "リハビリ支援", "教育工学", "折り紙工学"] },
  { id: 36, prof: "フランク・イアン", "keywords": ["ウェイファインディング", "マインクラフト", "ゲームの教育利用", "デジタルツイン"] },
  { id: 37, prof: "佐藤 直行", "keywords": ["脳波計測", "VR認知実験", "空間記憶", "Python時系列解析"] },
  { id: 38, prof: "櫻沢 繁", "keywords": ["化学知能ロボット", "筋電義手", "生体信号制御", "マン・マシン対話"] },
  { id: 39, prof: "島影 圭佑", "keywords": ["障害福祉デザイン", "Fab(ものづくり)", "3Dプリンタ活用", "読み上げメガネ"] },
  { id: 40, prof: "竹川 佳成", "keywords": ["HCI(人との対話)", "スポーツIT", "モバイルアプリ", "UXリサーチ", "カーリングIT"] },
  { id: 41, prof: "島内 宏和", "keywords": ["機械学習理論", "統計的学習", "LLMアルゴリズム", "定理証明支援"] },
  { id: 42, prof: "山田 浩", "keywords": ["プロジェクト学習(PBL)", "コンピテンシー", "学術引用の認識", "教育システム"] },
  { id: 43, prof: "鈴木 昭二", "keywords": ["サービスロボット", "遠隔操作", "観光AR", "夜景の数値化"] },
  { id: 44, prof: "姜 南圭", "keywords": ["感性デザイン", "UIデザイン評価", "視覚・認知プロセス", "キャッシュレスUI"] },
  { id: 45, prof: "角 康之", "keywords": ["コミュニケーション分析", "ライフログ", "メディア拡張", "サイバーフィジカル"] },
  { id: 46, prof: "リヴァーズ・ダミアン", "keywords": ["メタラーニング", "スマート運動(Zwift)", "実行機能と先延ばし", "心理学"] }
];

const QUESTION_LIMIT = 30; // 30問に増量

const LabFinderApp = () => {
  const [keywordQueue, setKeywordQueue] = useState([]);
  const [scores, setScores] = useState({});
  const [likedKeywords, setLikedKeywords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const allPairs = [];
    FULL_LAB_DATA.forEach(lab => {
      lab.keywords.forEach(kw => {
        allPairs.push({ text: kw, labId: lab.id });
      });
    });
    const shuffled = allPairs.sort(() => Math.random() - 0.5);
    setKeywordQueue(shuffled.slice(0, QUESTION_LIMIT));
  }, []);

  const handleSwipe = (liked) => {
    const current = keywordQueue[currentIndex];
    if (liked) {
      setScores(prev => ({
        ...prev,
        [current.labId]: (prev[current.labId] || 0) + 10
      }));
      setLikedKeywords(prev => [...prev, current.text]);
    }

    if (currentIndex < keywordQueue.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const recommendations = useMemo(() => {
    return FULL_LAB_DATA
      .map(lab => ({
        ...lab,
        totalScore: scores[lab.id] || 0,
        matchKeywords: lab.keywords.filter(kw => likedKeywords.includes(kw))
      }))
      .filter(lab => lab.totalScore > 0)
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 5);
  }, [isFinished, scores, likedKeywords]);

  if (!isFinished && keywordQueue.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 font-sans text-slate-800 selection:bg-none">
        <header className="fixed top-0 w-full p-6 text-center z-10">
          <h1 className="text-xl font-black text-slate-300 uppercase tracking-tighter">Lab Finder v1.0</h1>
          <div className="mt-4 w-full max-w-xs mx-auto bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              className="bg-blue-600 h-full" 
              animate={{ width: `${(currentIndex / keywordQueue.length) * 100}%` }}
            />
          </div>
        </header>

        <div className="relative w-full max-w-sm h-[420px] perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 100, opacity: 0, rotate: 10 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -100, opacity: 0, rotate: -10 }}
              className="absolute inset-0 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center p-10 border border-slate-100"
            >
              <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl mb-6">
                <Info size={24} />
              </div>
              <span className="text-slate-400 font-bold mb-2 text-xs uppercase tracking-widest">Interested in?</span>
              <h2 className="text-4xl font-black text-center leading-[1.1] text-slate-900 break-words w-full">
                {keywordQueue[currentIndex].text}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-8 mt-12">
          <button 
            onClick={() => handleSwipe(false)}
            className="w-20 h-20 rounded-full bg-white shadow-xl text-slate-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
          >
            <X size={40} strokeWidth={3} />
          </button>
          <button 
            onClick={() => handleSwipe(true)}
            className="w-20 h-20 rounded-full bg-white shadow-xl text-slate-300 flex items-center justify-center hover:bg-green-50 hover:text-green-500 transition-all active:scale-90"
          >
            <Heart size={40} fill="currentColor" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center pb-20 font-sans">
      <div className="max-w-md w-full">
        <div className="text-center mt-8 mb-12">
          <div className="inline-block p-4 bg-yellow-400 rounded-3xl mb-4 shadow-lg shadow-yellow-200">
            <Award size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-900">Your Matches</h2>
          <p className="text-slate-500 mt-2">あなたに興味に近い研究室TOP5</p>
        </div>

        {recommendations.length > 0 ? (
          recommendations.map((lab, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={lab.id}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-5 relative overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />
              <div className="flex justify-between items-center mb-4">
                <span className="flex items-center gap-1 text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
                  <GraduationCap size={14} /> Rank {index + 1}
                </span>
                <span className="text-[10px] text-slate-300 font-mono">ID: {String(lab.id).padStart(2, '0')}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{lab.prof} <span className="text-sm font-normal text-slate-400">Lab.</span></h3>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {lab.keywords.map(kw => (
                  <span key={kw} className={`text-[11px] px-3 py-1 rounded-xl font-bold border transition-colors ${lab.matchKeywords.includes(kw) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-100 text-slate-300'}`}>
                    #{kw}
                  </span>
                ))}
              </div>

              {lab.matchKeywords.length > 0 && (
                <div className="mt-5 p-3 bg-slate-50 rounded-2xl flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500 shrink-0" />
                  <p className="text-[11px] text-slate-600 leading-tight font-medium">
                    あなたの「{lab.matchKeywords.join('」「')}」への興味とマッチしました！
                  </p>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <p className="text-slate-400 italic font-medium">マッチする研究室が見つかりませんでした。</p>
          </div>
        )}

        <button 
          onClick={() => window.location.reload()}
          className="w-full mt-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
        >
          <RotateCcw size={24} /> Try Again
        </button>
      </div>
    </div>
  );
};

export default LabFinderApp;