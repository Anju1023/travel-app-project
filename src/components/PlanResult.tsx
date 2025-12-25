import { useState } from 'react';
import { MapPin, Clock, Hotel, Repeat, Copy, Check, ChevronDown } from 'lucide-react';
import { PlanData } from '@/types/plan';
import { convertPlanToMarkdown } from '@/utils/planToMarkdown';

/**
 * 旅行プランの生成結果を表示するコンポーネント
 * AIが作ってくれた「宝の地図」を綺麗に見せる役割だよ！
 */
export default function PlanResult({ plan, onReset }: { plan: PlanData; onReset: () => void }) {
  // コピーした時の「できたよ！」状態を管理するよ
  const [copied, setCopied] = useState(false);

  // アコーディオンの開閉状態を管理するよ。最初は「1日目」だけ開いておくね！
  const [openDays, setOpenDays] = useState<number[]>([1]);

  /**
   * 日付をクリックした時の開閉処理
   * 開いてたら閉じる、閉じてたら開く！
   */
  const toggleDay = (day: number) => {
    setOpenDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) // 閉じる
        : [...prev, day] // 開く
    );
  };

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
        プランのタイトル 
        AIが考えてくれた魅力的なタイトルをドーンと表示！
      */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-primary">{plan.title}</h2>
          <p className="text-muted-foreground font-medium">こんなプランはいかがですか？✨</p>
        </div>
        
        {/* Markdownコピーボタン：目立ちすぎず、でも使いやすい場所に！ */}
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

      {/* 
        1日ごとのタイムライン (アコーディオン式)
        タップで見たい日だけパカッと開くよ！📱✨
      */}
      <div className="space-y-4">
        {plan.days.map((day) => {
          const isOpen = openDays.includes(day.day);
          
          return (
            <div key={day.day} className="bg-white rounded-3xl shadow-sm border border-secondary/50 overflow-hidden transition-all duration-300">
              {/* クリックできるヘッダー部分 */}
              <button 
                onClick={() => toggleDay(day.day)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-secondary/10 transition-colors"
              >
                <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                  <span className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-inner transition-colors
                    ${isOpen ? 'bg-primary text-white' : 'bg-secondary text-secondary-foreground'}
                  `}>
                    {day.day}
                  </span>
                  日目
                </h3>
                {/* 矢印アイコン：開いてる時はくるっと回るよ！ */}
                <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* 中身（スケジュール） */}
              <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0">
                  {/* タイムラインの縦線（点線でおしゃれに！） */}
                  <div className="space-y-6 relative pl-4 border-l-2 border-dashed border-secondary/50 ml-3 pt-2">
                    {day.schedule.map((item, i) => (
                      <div key={i} className="relative pl-6 group">
                        {/* 時間の横にある青いポッチ */}
                        <div className="absolute -left-[1.4rem] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-white group-hover:scale-125 transition-transform" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                          {/* 時間：太字の青で目立たせるよ */}
                          <div className="flex items-center gap-1 text-primary font-bold min-w-[4.5rem]">
                            <Clock className="w-4 h-4" />
                            {item.time}
                          </div>
                          {/* 場所名 */}
                          <div className="font-bold text-lg text-foreground">{item.place}</div>
                        </div>
                        {/* AIからの説明：読みやすいように行間を広めにしているよ */}
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 
        宿泊先提案セクション 
        泊まる場所は旅の重要ポイントだから、特別なカードにしているよ。
      */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-secondary/50">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Hotel className="text-primary" />
          おすすめの宿泊先 🏨
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {plan.hotels.map((hotel, i) => (
            <div key={i} className="p-4 bg-accent/20 rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:bg-accent/30 transition-colors">
              <div>
                <h4 className="font-bold text-lg">{hotel.name}</h4>
                <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4" />
                  {hotel.area}
                </div>
                {/* ホテルの特徴（タグ形式で可愛く！） */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {hotel.features.map(f => (
                    <span key={f} className="text-xs px-2 py-1 bg-white rounded-full border border-secondary text-secondary-foreground shadow-sm">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              {/* 価格目安：青色の太字で分かりやすく！ */}
              <div className="text-right w-full md:w-auto mt-2 md:mt-0 border-t md:border-t-0 border-secondary/30 pt-2 md:pt-0">
                <div className="text-xs text-muted-foreground">宿泊の目安</div>
                <div className="font-bold text-xl text-primary">{hotel.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        リセットボタン 
        もう一度プランを作りたい時のための出口だよ。
      */}
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
