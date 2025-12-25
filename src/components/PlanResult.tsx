import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Repeat, Copy, Check } from 'lucide-react';
import { PlanData } from '@/types/plan';
import { convertPlanToMarkdown } from '@/utils/planToMarkdown';
import TimelineSection from './TimelineSection';
import HotelSection from './HotelSection';
import AdviceSection from './AdviceSection';

// MapSection を動的インポートするよ！
// 地図はブラウザ側でのみ動いてほしいから SSR をオフにするね。
const MapSection = dynamic(() => import('./MapSection'), {
	ssr: false,
	loading: () => (
		<div className="h-100 w-full bg-slate-50 rounded-4xl animate-pulse flex items-center justify-center text-slate-400">
			地図を読み込み中...🗺️
		</div>
	),
});

/**
 * 旅行プランの生成結果を表示するコンポーネント
 * AIが作ってくれた「宝の地図」を綺麗に見せる役割だよ！
 * 実際の表示内容は TimelineSection や HotelSection に任せているんだ。
 */
export default function PlanResult({
	plan,
	onReset,
}: {
	plan: PlanData;
	onReset: () => void;
}) {
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
		<div className="space-y-12 animate-in slide-in-from-bottom-8 duration-1000">
			{/* 
        プランのタイトル & コピー機能
      */}
			<div className="text-center space-y-6">
				<div className="space-y-3">
					<h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight text-balance">
						{plan.title}
					</h2>
					<p className="text-slate-500 font-medium opacity-80">
						こんなプランはいかがですか？✨
					</p>
				</div>

				<div className="flex justify-center">
					<button
						onClick={handleCopy}
						className={`
              flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-lg
              ${
								copied
									? 'bg-emerald-500 text-white scale-105 shadow-emerald-200'
									: 'bg-white/80 backdrop-blur-sm text-sky-500 border border-sky-100 hover:border-sky-300 hover:bg-white hover:scale-[1.02] shadow-sky-100'
							}
            `}
					>
						{copied ? (
							<Check className="w-4 h-4" />
						) : (
							<Copy className="w-4 h-4" />
						)}
						{copied ? 'コピーしたよ！' : '旅のメモをコピー'}
					</button>
				</div>
			</div>

			{/* 旅のマップ 🗺️ */}
			<MapSection plan={plan} />

			{/* 1日ごとのタイムライン（アコーディオン式） */}
			<TimelineSection days={plan.days} />

			{/* 宿泊先提案セクション */}
			<HotelSection hotels={plan.hotels} />

			{/* 持ち物リスト & アドバイス 🎒💡 */}
			<AdviceSection packingList={plan.packingList} advice={plan.advice} />

			{/* リセットボタン */}
			<div className="flex justify-center pt-8 pb-16">
				<button
					onClick={onReset}
					className="flex items-center gap-2 px-10 py-4 rounded-full bg-white/50 backdrop-blur-sm text-slate-400 hover:text-sky-500 hover:bg-white border border-slate-100 hover:border-sky-200 transition-all duration-300 font-bold shadow-sm group"
				>
					<Repeat className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
					条件を変えてもう一度作る
				</button>
			</div>
		</div>
	);
}
