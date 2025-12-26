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
		<div className="h-96 w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
			地図を読み込み中...
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
		<div className="space-y-12 py-8">
			{/* Title & Copy */}
			<div className="text-center space-y-4">
				<h2 className="text-3xl font-bold text-gray-900">
					{plan.title}
				</h2>
				<button
					onClick={handleCopy}
					className={`
						inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium border transition-colors
						${
							copied
								? 'bg-emerald-100 text-emerald-700 border-emerald-200'
								: 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
						}
					`}
				>
					{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
					{copied ? 'コピーしました' : 'プランをコピー'}
				</button>
			</div>

			{/* Map */}
			<div className="rounded-lg overflow-hidden border border-gray-200">
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
					className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
				>
					<Repeat className="w-4 h-4" />
					もう一度作る
				</button>
			</div>
		</div>
	);
}