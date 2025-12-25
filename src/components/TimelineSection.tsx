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
						className="glass-card rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-md"
					>
						{/* ヘッダーボタン */}
						<button
							onClick={() => toggleDay(day.day)}
							className="w-full p-6 flex items-center justify-between text-left hover:bg-white/40 transition-colors"
						>
							<h3 className="text-xl font-bold text-slate-700 flex items-center gap-4">
								<span
									className={`
                  w-10 h-10 rounded-2xl flex items-center justify-center text-base font-black shadow-sm transition-all duration-300
                  ${
										isOpen
											? 'bg-sky-400 text-white shadow-sky-200 rotate-12'
											: 'bg-white text-sky-400 ring-1 ring-sky-100'
									}
                `}
								>
									{day.day}
								</span>
								<span className="tracking-tight">Day {day.day}</span>
							</h3>
							<div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-sky-50 text-sky-500' : 'text-slate-300'}`}>
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
								isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
							}`}
						>
							<div className="p-8 pt-0">
								<div className="space-y-10 relative pl-4 border-l-2 border-sky-50 ml-4 pt-4">
									{day.schedule.map((item, i) => (
										<div key={i} className="relative pl-8 group">
											{/* ふわっと光るドット */}
											<div className="absolute -left-[1.85rem] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-sky-300 shadow-sm group-hover:border-sky-400 group-hover:scale-125 transition-all duration-300" />
											
											<div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
												<div className="flex items-center gap-1.5 text-sky-500 font-black text-sm tracking-wider">
													<Clock className="w-4 h-4" />
													{item.time}
												</div>
												<div className="font-bold text-xl text-slate-800 tracking-tight">
													{/* 場所名をクリックするとGoogle検索できるようにしたよ！🔍 */}
													<a
														href={`https://www.google.com/search?q=${encodeURIComponent(
															item.place
														)}`}
														target="_blank"
														rel="noopener noreferrer"
														className="hover:text-sky-500 transition-colors cursor-pointer decoration-sky-200 underline-offset-8 hover:underline decoration-2"
														title="Googleで検索する"
													>
														{item.place}
													</a>
												</div>
											</div>
											<p className="text-slate-500 text-sm leading-relaxed font-medium opacity-80">
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
