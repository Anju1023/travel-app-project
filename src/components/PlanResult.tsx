import { useState } from 'react';
import { Repeat, Copy, Check } from 'lucide-react';
import { PlanData } from '@/types/plan';
import { convertPlanToMarkdown } from '@/utils/planToMarkdown';
import TimelineSection from './TimelineSection';
import HotelSection from './HotelSection';
import MapSection from './MapSection';

/**
 * 旅行プランの生成結果を表示するコンポーネント
 * AIが作ってくれた「宝の地図」を綺麗に見せる役割だよ！
 * 実際の表示内容は TimelineSection や HotelSection に任せているんだ。
 */
export default function PlanResult({ plan, onReset }: { plan: PlanData; onReset: () => void }) {
  // コピーした時の「できたよ！」状態を管理するよ
  const [copied, setCopied] = useState(false);

  /**
   * Markdown形式でクリップボードにコピーする処理
   */
  const handleCopy = async () => {
    const markdown = convertPlanToMarkdown(plan);
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      // 2秒経ったら元の表示に戻すね
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* 
        プランのタイトル & コピー機能
      */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-primary">{plan.title}</h2>
          <p className="text-muted-foreground font-medium">こんなプランはいかがですか？✨</p>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleCopy}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm
              ${copied 
                ? 'bg-green-500 text-white scale-105' 
                : 'bg-white text-primary border-2 border-primary/20 hover:border-primary hover:bg-primary/5'}
            `}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'コピー完了！' : 'Markdown形式でコピー'}
          </button>
        </div>
      </div>

      {/* 旅のマップ 🗺️ */}
      <MapSection plan={plan} />

      {/* 1日ごとのタイムライン（アコーディオン式） */}
      <TimelineSection days={plan.days} />

      {/* 宿泊先提案セクション */}
      <HotelSection hotels={plan.hotels} />

      {/* リセットボタン */}
      <div className="flex justify-center pt-8 pb-12">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-8 py-4 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all font-bold shadow-sm"
        >
          <Repeat className="w-5 h-5" />
          条件を変えてもう一度作る
        </button>
      </div>

    </div>
  );
}