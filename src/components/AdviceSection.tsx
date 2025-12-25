import { Luggage, Lightbulb, CheckCircle2 } from 'lucide-react';
import { PlanData } from '@/types/plan';

/**
 * 持ち物リストとアドバイスを表示するコンポーネント
 * 旅の準備をサポートする「気が利く」セクションだよ！🎒✨
 */
export default function AdviceSection({ 
  packingList, 
  advice 
}: { 
  packingList: PlanData['packingList']; 
  advice: PlanData['advice']; 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* 持ち物チェックリスト 🎒 */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-secondary/50">
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Luggage className="text-primary" />
          持って行くと便利なもの 🎒
        </h3>
        <div className="space-y-3">
          {packingList.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-accent/10 rounded-2xl hover:bg-accent/20 transition-colors group">
              <div className="w-6 h-6 rounded-full border-2 border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors">
                <CheckCircle2 className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 旅のアドバイス 💡 */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-secondary/50">
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="text-amber-500" />
          旅のアドバイス 💡
        </h3>
        <div className="space-y-4">
          {advice.map((item, i) => (
            <div key={i} className="relative pl-4 border-l-4 border-amber-200">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
