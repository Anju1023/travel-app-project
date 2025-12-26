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
						className="simple-card overflow-hidden"
					>
						{/* ヘッダーボタン */}
						<button
							onClick={() => toggleDay(day.day)}
							className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
						>
							<h3 className="text-xl font-bold text-[var(--color-text-main)] flex items-center gap-4">
								<span
									className={`
                  w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold transition-all duration-300
                  ${
										isOpen
											? 'bg-[var(--color-text-main)] text-white shadow-sm'
											: 'bg-gray-100 text-[var(--color-text-sub)]'
									}
                `}
								>
									{day.day}
								</span>
								<span className="tracking-tight group-hover:translate-x-1 transition-transform">Day {day.day}</span>
							</h3>
							<div
								className={`p-2 rounded-lg transition-all duration-300 ${
									isOpen ? 'bg-gray-100 text-[var(--color-text-main)]' : 'text-gray-400'
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
								<div className="space-y-10 relative pl-4 border-l-2 border-gray-100 ml-4 pt-4">
									{day.schedule.map((item, i) => (
										<div key={i} className="relative pl-8 group">
											{/* ドット */}
											<div className="absolute -left-[1.85rem] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-[var(--color-primary)] shadow-sm group-hover:scale-110 transition-all duration-300" />

											<div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
												<div className="flex items-center gap-1.5 text-[var(--color-primary)] font-bold text-sm tracking-wider">
													<Clock className="w-4 h-4" />
													{item.time}
												</div>
												<div className="font-bold text-xl text-[var(--color-text-main)] tracking-tight">
													<a
														href={`https://www.google.com/search?q=${encodeURIComponent(
															item.place
														)}`}
														target="_blank"
														rel="noopener noreferrer"
														className="hover:text-[var(--color-primary-dark)] transition-colors cursor-pointer underline-offset-4 hover:underline decoration-2 decoration-gray-200"
														title="Googleで検索する"
													>
														{item.place}
													</a>
												</div>
											</div>
											<p className="text-[var(--color-text-main)]/80 text-sm leading-relaxed font-medium">
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
