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
			<div className="simple-card p-6 md:p-8">
				<h3 className="text-xl font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3">
					<div className="p-2 bg-gray-100 rounded-lg text-[var(--color-text-main)]">
						<Luggage className="w-6 h-6" />
					</div>
					持って行くと便利なもの
				</h3>
				<div className="space-y-4">
					{packingList.map((item, i) => (
						<div
							key={i}
							className="flex items-start gap-4 p-4 bg-white border border-[var(--color-border)] rounded-lg hover:bg-gray-50 transition-all group"
						>
							<div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-[var(--color-primary)] transition-colors shrink-0 mt-0.5 bg-white">
								<CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
							<span className="text-sm font-medium text-[var(--color-text-main)] leading-relaxed">
								{item}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* 旅のアドバイス 💡 */}
			<div className="simple-card p-6 md:p-8">
				<h3 className="text-xl font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3">
					<div className="p-2 bg-gray-100 rounded-lg text-[var(--color-text-main)]">
						<Lightbulb className="w-6 h-6" />
					</div>
					旅のアドバイス
				</h3>
				<div className="space-y-5">
					{advice.map((item, i) => (
						<div key={i} className="relative pl-6 group">
							<div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 rounded-full group-hover:bg-[var(--color-primary)] transition-colors duration-300" />
							<p className="text-sm leading-relaxed text-[var(--color-text-sub)] font-medium italic">
								“ {item} ”
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
