import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Repeat, Copy, Check, Share2 } from 'lucide-react';
import { PlanData } from '@/types/plan';
import { convertPlanToMarkdown } from '@/utils/planToMarkdown';
import TimelineSection from './TimelineSection';
import HotelSection from './HotelSection';
import AdviceSection from './AdviceSection';

const MapSection = dynamic(() => import('./MapSection'), {
	ssr: false,
	loading: () => (
		<div className="w-full h-80 bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400">
			地図を準備中...🗺️
		</div>
	),
});

export default function PlanResult({
	plan,
	onReset,
}: {
	plan: PlanData;
	onReset: () => void;
}) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		const markdown = convertPlanToMarkdown(plan);
		try {
			await navigator.clipboard.writeText(markdown);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy!', err);
		}
	};

	return (
		<div className="animate-in fade-in zoom-in-95 duration-700 space-y-8 pb-12">
			{/* Header Area */}
			<div className="text-center relative py-6">
				<div className="inline-block p-2 px-4 rounded-full bg-sky-100 text-sky-600 font-medium text-sm mb-4">
					✨ プラン完成！
				</div>
				<h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-6">
					{plan.title}
				</h2>
				
				<div className="flex justify-center gap-3">
					<button
						onClick={handleCopy}
						className={`
                            flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all
                            ${
															copied
																? 'bg-green-50 text-green-600 border border-green-200'
																: 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
														}
                        `}
					>
						{copied ? <Check size={18} /> : <Share2 size={18} />}
						{copied ? 'コピーしました！' : 'プランを共有'}
					</button>
				</div>
			</div>

			{/* Map Section */}
			<section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-1">
				<MapSection plan={plan} />
			</section>

			{/* Timeline Section */}
			<section>
				<TimelineSection days={plan.days} />
			</section>

			{/* Hotel Section */}
			<section>
				<HotelSection hotels={plan.hotels} />
			</section>

			{/* Advice Section */}
			<section>
				<AdviceSection packingList={plan.packingList} advice={plan.advice} />
			</section>

			{/* Reset Button */}
			<div className="pt-8 flex justify-center">
				<button
					onClick={onReset}
					className="group flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-1"
				>
					<Repeat className="group-hover:rotate-180 transition-transform duration-500" />
					もう一度作る
				</button>
			</div>
		</div>
	);
}