import { Luggage, Lightbulb, CheckCircle2, Star } from 'lucide-react';
import { PlanData } from '@/types/plan';

/**
 * 持ち物リストとアドバイスを表示するコンポーネント
 */
export default function AdviceSection({
	packingList,
	advice,
}: {
	packingList: PlanData['packingList'];
	advice: PlanData['advice'];
}) {
	return (
		<div className="grid gap-6 md:grid-cols-2">
			{/* 持ち物チェックリスト 🎒 */}
			<div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Luggage size={120} />
                </div>
				<h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4 relative z-10">
					<div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
						<Luggage size={18} />
					</div>
					推奨する持ち物
				</h3>
				<div className="space-y-3 relative z-10">
					{packingList.map((item, i) => (
						<div
							key={i}
							className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/50"
						>
							<div className="mt-0.5 text-emerald-500 shrink-0">
								<CheckCircle2 size={18} />
							</div>
							<span className="text-sm text-slate-700 font-medium leading-relaxed">
								{item}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* 旅のアドバイス 💡 */}
			<div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Lightbulb size={120} />
                </div>
				<h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4 relative z-10">
					<div className="p-2 bg-amber-100 text-amber-500 rounded-lg">
						<Lightbulb size={18} />
					</div>
					旅行へのアドバイス
				</h3>
				<div className="space-y-4 relative z-10">
					{advice.map((item, i) => (
						<div key={i} className="flex gap-4">
							<div className="flex flex-col items-center">
                                <div className="w-0.5 h-full bg-amber-100 absolute left-[39px] -z-10" />
                                <div className="p-1 bg-white rounded-full border-2 border-amber-200 text-amber-400">
                                    <Star size={12} fill="currentColor" />
                                </div>
                            </div>
							<p className="text-sm text-slate-600 leading-relaxed bg-amber-50/30 p-3 rounded-lg border border-amber-100 w-full italic">
								“ {item} ”
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}