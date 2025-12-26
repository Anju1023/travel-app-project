'use client';

import { useState } from 'react';
import TravelForm from '@/components/TravelForm';
import PlanResult from '@/components/PlanResult';
import { PlanData, TravelFormData } from '@/types/plan';
import { AlertCircle } from 'lucide-react'; // エラー用のアイコンを追加

/**
 * メインのページコンポーネント (Home)
 * アプリの顔となる部分だよ！
 * 入力フォームと生成結果の切り替え、APIとの通信をここで管理しているよ。
 */
export default function Home() {
  // --- ステート（状態）の定義 ---
  
  // AIが作ってくれた旅行プランを保存する場所だよ
  const [plan, setPlan] = useState<PlanData | null>(null);
  
  // 何かトラブルがあった時に、あんじゅに伝えるメッセージを保存するよ
  const [error, setError] = useState<string | null>(null);

  /**
   * プラン作成ボタンが押された時のメイン処理
   * @param data フォームから送られてきた旅行の条件
   */
  const handleCreatePlan = async (data: TravelFormData) => {
    // 新しく作り直すから、前のエラーは消しておくね！
    setError(null);
    
    try {
      // 自作したAPI (/api/plan) に「こんなプラン作って！」ってお願いするよ
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // もしAPIが「今は無理だよ〜」って言ってきたら（エラー）、その理由を教えてもらうよ
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'プランの生成に失敗しちゃいました...。');
      }

      // 成功！AIが作ってくれたプランを受け取るよ
      const planData: PlanData = await response.json();
      setPlan(planData);
      
      // 画面の一番上までスクロールして、結果を見やすくするよ！✨
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (err: unknown) {
      // 想定外のトラブルが起きた時のためのバックアップ
      console.error('Frontend Error:', err);
      
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('予期せぬエラーが発生しました。もう一度試してみてね！');
      }
    }
  };

  /**
   * 「もう一度作る」ボタンが押された時の処理
   * 画面をリセットして、最初のフォームに戻るよ！
   */
  const handleReset = () => {
    setPlan(null);
    setError(null);
    
    // フォームに戻った時も上までスクロール！
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 
        まだプランがない時（最初の画面）に表示するヘッダーセクション 
        あんじゅをワクワクさせるようなキャッチコピーにしているよ！
      */}
      {!plan && (
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800">
            次は<span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-sky-600">どこ</span>に行く？
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-lg mx-auto leading-relaxed">
            Fuwari が、今のあなたにぴったりの<br className="sm:hidden"/>旅行プランを瞬時に提案します。✨
          </p>
        </div>
      )}

      {/* 
        トラブル発生！エラーメッセージを表示
      */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-600 px-6 py-4 rounded-2xl flex items-start gap-3 animate-in shake">
          <AlertCircle className="shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">エラーが発生しました</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        </div>
      )}

      {/* 
        メインコンテンツエリア
        プランがあれば「結果画面」、なければ「入力フォーム」を出すように切り替えてるよ！
      */}
      <div>
        {plan ? (
          <PlanResult plan={plan} onReset={handleReset} />
        ) : (
          <TravelForm onSubmit={handleCreatePlan} />
        )}
      </div>

    </div>
  );
}