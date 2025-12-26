import { Luggage, Lightbulb, CheckCircle2 } from 'lucide-react';
import { PlanData } from '@/types/plan';

/**
 * 持ち物リストとアドバイスを表示するコンポーネント
 * 旅の準備をサポートする「気が利く」セクションだよ！🎒✨
 */
export default function AdviceSection({
	packingList,
	advice,
}: {
	packingList: PlanData['packingList'];
	advice: PlanData['advice'];
}) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			{/* 持ち物チェックリスト 🎒 */}
			<div className="glass-panel p-6 md:p-8 rounded-xl shadow-sm">
				<h3 className="text-xl font-bold text-[var(--color-deep-ocean)] mb-6 flex items-center gap-3">
					<div className="p-2 bg-white/50 rounded-lg text-[var(--color-ocean-blue)] shadow-sm">
						<Luggage className="w-6 h-6" />
					</div>
					持って行くと便利なもの
				</h3>
				<div className="space-y-4">
					{packingList.map((item, i) => (
						<div
							key={i}
							className="flex items-start gap-4 p-4 bg-white/40 rounded-lg hover:bg-white/60 transition-all group border border-white/40 hover:border-white/80"
						>
							{/* shrink-0 をつけて、丸が潰れないように固定するよ！ */}
							<div className="w-6 h-6 rounded-full border-2 border-[var(--color-ocean-blue)]/30 flex items-center justify-center group-hover:border-[var(--color-ocean-blue)] transition-colors shrink-0 mt-0.5 bg-white shadow-sm">
								<CheckCircle2 className="w-4 h-4 text-[var(--color-ocean-blue)] opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
							<span className="text-sm font-medium text-[var(--color-deep-ocean)]/90 leading-relaxed">
								{item}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* 旅のアドバイス 💡 */}
			<div className="glass-panel p-6 md:p-8 rounded-xl shadow-sm">
				<h3 className="text-xl font-bold text-[var(--color-deep-ocean)] mb-6 flex items-center gap-3">
					<div className="p-2 bg-white/50 rounded-lg text-[var(--color-lemon-yellow)] shadow-sm">
						<Lightbulb className="w-6 h-6" />
					</div>
					旅のアドバイス
				</h3>
				<div className="space-y-5">
					{advice.map((item, i) => (
						<div key={i} className="relative pl-6 group">
							{/* 装飾用のライン */}
							<div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-lemon-yellow)] to-[var(--color-sunset-orange)] rounded-full transition-all duration-300" />
							<p className="text-sm leading-relaxed text-[var(--color-deep-ocean)]/80 font-medium italic">
								“ {item} ”
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
