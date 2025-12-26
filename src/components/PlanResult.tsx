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
		<div>
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
		<div>
			{/* Title & Copy */}
			<div>
				<h2>
					{plan.title}
				</h2>
				<button
					onClick={handleCopy}
				>
					{copied ? <Check /> : <Copy />}
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
			<div>
				<button
					onClick={onReset}
				>
					<Repeat />
					もう一度作る
				</button>
			</div>
		</div>
	);
}