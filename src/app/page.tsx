'use client';

import { useState } from 'react';
import TravelForm from '@/components/TravelForm';
import PlanResult from '@/components/PlanResult';
import { PlanData, TravelFormData } from '@/types/plan';
import { AlertCircle } from 'lucide-react';

/**
 * メインのページコンポーネント (Home)
 * アプリの顔となる部分です。
 * 入力フォームと生成結果の切り替え、APIとの通信をここで管理しています。
 */
export default function Home() {
  // --- ステート（状態）の定義 ---
  
  // AIが作成した旅行プランを保存する場所
  const [plan, setPlan] = useState<PlanData | null>(null);
  
  // エラーメッセージを保存する場所
  const [error, setError] = useState<string | null>(null);

  /**
   * プラン作成ボタンが押された時のメイン処理
   * @param data フォームから送られてきた旅行の条件
   */
  const handleCreatePlan = async (data: TravelFormData) => {
    // エラー状態をリセット
    setError(null);
    
    try {
      // 自作したAPI (/api/plan) にリクエストを送信
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // エラーハンドリング
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'プランの生成に失敗しました。');
      }

      // 成功時、プランデータを受け取る
      const planData: PlanData = await response.json();
      setPlan(planData);
      
      // 画面上部へスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (err: unknown) {
      console.error('Frontend Error:', err);
      
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('予期せぬエラーが発生しました。もう一度お試しください。');
      }
    }
  };

  /**
   * 「もう一度作る」ボタンが押された時の処理
   * 画面をリセットして、最初のフォームに戻ります。
   */
  const handleReset = () => {
    setPlan(null);
    setError(null);
    
    // 画面上部へスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 
        ヘッダーセクション 
      */}
      {!plan && (
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800">
            次は<span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-sky-600">どこ</span>へ行きますか？
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-lg mx-auto leading-relaxed">
            Fuwari が、今のあなたにぴったりの<br className="sm:hidden"/>旅行プランを提案します。
          </p>
        </div>
      )}

      {/* 
        エラーメッセージ表示エリア
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