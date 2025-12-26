import { useState } from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import { PlanData } from '@/types/plan';

/**
 * 1日ごとのタイムラインを表示するコンポーネント
 * アコーディオン機能もここに閉じ込めているよ！
 */
export default function TimelineSection({ days }: { days: PlanData['days'] }) {
	// アコーディオンの開閉状態（最初は1日目だけ開く）
	const [openDays, setOpenDays] = useState<number[]>([1]);

	const toggleDay = (day: number) => {
		setOpenDays((prev) =>
			prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
		);
	};

	return (
		<div className="space-y-4">
			{days.map((day) => {
				const isOpen = openDays.includes(day.day);

				return (
					<div
						key={day.day}
						className="glass-panel overflow-hidden transition-all duration-500 hover:scale-[1.01]"
					>
						{/* ヘッダーボタン */}
						<button
							onClick={() => toggleDay(day.day)}
							className="w-full p-6 flex items-center justify-between text-left hover:bg-white/40 transition-colors group"
						>
							<h3 className="text-xl font-bold text-[var(--color-deep-ocean)] flex items-center gap-4">
								<span
									className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-base font-black shadow-sm transition-all duration-300
                  ${
										isOpen
											? 'bg-gradient-to-br from-[var(--color-lemon-yellow)] to-[var(--color-sunset-orange)] text-white rotate-12'
											: 'bg-white/80 text-[var(--color-ocean-blue)]'
									}
                `}
								>
									{day.day}
								</span>
								<span className="tracking-tight group-hover:translate-x-1 transition-transform">Day {day.day}</span>
							</h3>
							<div
								className={`p-2 rounded-full transition-all duration-300 ${
									isOpen ? 'bg-white/50 text-[var(--color-ocean-blue)]' : 'text-[var(--color-ocean-blue)]/50'
								}`}
							>
								<ChevronDown
									className={`w-6 h-6 transition-transform duration-500 ${
										isOpen ? 'rotate-180' : ''
									}`}
								/>
							</div>
						</button>

						{/* スケジュール詳細 */}
						<div
							className={`transition-all duration-500 ease-in-out ${
								isOpen
									? 'max-h-[800px] opacity-100'
									: 'max-h-0 opacity-0 overflow-hidden'
							}`}
						>
							<div className="p-8 pt-0">
								<div className="space-y-10 relative pl-4 border-l-2 border-white/40 ml-4 pt-4">
									{day.schedule.map((item, i) => (
										<div key={i} className="relative pl-8 group">
											{/* ふわっと光るドット */}
											<div className="absolute -left-[1.85rem] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-[var(--color-ocean-blue)]/50 shadow-sm group-hover:border-[var(--color-ocean-blue)] group-hover:scale-125 transition-all duration-300" />

											<div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
												<div className="flex items-center gap-1.5 text-[var(--color-ocean-blue)] font-black text-sm tracking-wider">
													<Clock className="w-4 h-4" />
													{item.time}
												</div>
												<div className="font-bold text-xl text-[var(--color-deep-ocean)] tracking-tight">
													{/* 場所名をクリックするとGoogle検索できるようにしたよ！🔍 */}
													<a
														href={`https://www.google.com/search?q=${encodeURIComponent(
															item.place
														)}`}
														target="_blank"
														rel="noopener noreferrer"
														className="hover:text-[var(--color-sunset-orange)] transition-colors cursor-pointer decoration-[var(--color-ocean-blue)]/30 underline-offset-8 hover:underline decoration-2"
														title="Googleで検索する"
													>
														{item.place}
													</a>
												</div>
											</div>
											<p className="text-[var(--color-deep-ocean)]/80 text-sm leading-relaxed font-medium">
												{item.description}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
