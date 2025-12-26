import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Repeat, Copy, Check } from 'lucide-react';
import { PlanData } from '@/types/plan';
import { convertPlanToMarkdown } from '@/utils/planToMarkdown';
import TimelineSection from './TimelineSection';
import HotelSection from './HotelSection';
import AdviceSection from './AdviceSection';

const MapSection = dynamic(() => import('./MapSection'), {
	ssr: false,
	loading: () => (
		<div className="h-96 w-full bg-white/30 rounded-lg flex items-center justify-center text-[var(--color-ocean-blue)] animate-pulse">
			地図を読み込み中...🗺️
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
		<div className="space-y-12 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
			{/* Title & Copy */}
			<div className="text-center space-y-4">
				<h2 className="text-3xl font-bold text-[var(--color-deep-ocean)] drop-shadow-sm">
					{plan.title}
				</h2>
				<button
					onClick={handleCopy}
					className={`
						inline-flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium border transition-all shadow-sm
						${
							copied
								? 'bg-[var(--color-lemon-yellow)] text-[var(--color-deep-ocean)] border-[var(--color-ocean-blue)]'
								: 'bg-white/70 text-[var(--color-ocean-blue)] border-white/60 hover:bg-white hover:scale-105'
						}
					`}
				>
					{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
					{copied ? 'コピーしました！' : 'プランをコピー'}
				</button>
			</div>

			{/* Map */}
			<div>
				<MapSection plan={plan} />
			</div>

			{/* Timeline */}
			<TimelineSection days={plan.days} />

			{/* Hotels */}
			<HotelSection hotels={plan.hotels} />

			{/* Advice */}
			<AdviceSection packingList={plan.packingList} advice={plan.advice} />

			{/* Reset Button */}
			<div className="flex justify-center pt-8">
				<button
					onClick={onReset}
					className="btn-ripple flex items-center gap-2 px-8 py-3 rounded-lg bg-white/40 text-[var(--color-deep-ocean)] font-bold border border-white/60 hover:bg-white/70 transition-colors shadow-lg"
				>
					<Repeat className="w-4 h-4" />
					もう一度作る
				</button>
			</div>
		</div>
	);
}