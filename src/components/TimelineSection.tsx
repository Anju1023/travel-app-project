import { useState } from 'react';
import { Clock, ChevronDown, MapPin, Search } from 'lucide-react';
import { PlanData } from '@/types/plan';

/**
 * 1日ごとのタイムラインを表示するコンポーネント
 * 縦のラインで「時間の流れ」を表現するデザインにするよ！
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
		<div className="space-y-6">
			{days.map((day) => {
				const isOpen = openDays.includes(day.day);

				return (
					<div
						key={day.day}
						className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
					>
						{/* ヘッダーボタン */}
						<button
							onClick={() => toggleDay(day.day)}
							className="w-full px-6 py-5 flex items-center justify-between bg-white/50 hover:bg-white/80 transition-colors"
						>
							<div className="flex items-center gap-4">
								<div className="flex flex-col items-center justify-center w-12 h-12 bg-sky-100 rounded-2xl text-sky-600 font-bold leading-none shadow-sm">
									<span className="text-xs uppercase tracking-wider opacity-70">
										Day
									</span>
									<span className="text-xl">{day.day}</span>
								</div>
								<h3 className="text-lg font-bold text-slate-700">
									{day.day}日目のスケジュール
								</h3>
							</div>
							<div
								className={`
                                    p-2 rounded-full bg-slate-100 text-slate-400 transition-transform duration-300
                                    ${isOpen ? 'rotate-180 bg-sky-50 text-sky-500' : ''}
                                `}
							>
								<ChevronDown size={20} />
							</div>
						</button>

						{/* スケジュール詳細 */}
						<div
							className={`
                                overflow-hidden transition-all duration-300 ease-in-out
                                ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                            `}
						>
							<div className="p-6 pt-2 pb-8">
								<div className="relative pl-4 ml-4 border-l-2 border-slate-100 space-y-8">
									{day.schedule.map((item, i) => (
										<div key={i} className="relative group">
											{/* ドット */}
											<div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-4 border-sky-200 group-hover:border-sky-400 transition-colors shadow-sm" />

											<div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 mb-2">
												<div className="flex items-center gap-1.5 text-sm font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md self-start shrink-0">
													<Clock size={14} />
													{item.time}
												</div>
												<div className="font-bold text-slate-800 text-lg leading-tight group-hover:text-sky-600 transition-colors">
													<a
														href={`https://www.google.com/search?q=${encodeURIComponent(
															item.place
														)}`}
														target="_blank"
														rel="noopener noreferrer"
														title="Googleで検索する"
														className="flex items-center gap-1 hover:underline decoration-sky-300 underline-offset-4"
													>
														{item.place}
														<Search
															size={14}
															className="opacity-0 group-hover:opacity-100 transition-opacity text-sky-400"
														/>
													</a>
												</div>
											</div>
											<p className="text-slate-600 leading-relaxed text-sm bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
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