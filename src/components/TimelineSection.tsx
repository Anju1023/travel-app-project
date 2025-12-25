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
						className="bg-white rounded-3xl shadow-sm border border-secondary/50 overflow-hidden transition-all duration-300"
					>
						{/* ヘッダーボタン */}
						<button
							onClick={() => toggleDay(day.day)}
							className="w-full p-6 flex items-center justify-between text-left hover:bg-secondary/10 transition-colors"
						>
							<h3 className="text-xl font-bold text-foreground flex items-center gap-3">
								<span
									className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-inner transition-colors
                  ${
										isOpen
											? 'bg-primary text-white'
											: 'bg-secondary text-secondary-foreground'
									}
                `}
								>
									{day.day}
								</span>
								日目
							</h3>
							<ChevronDown
								className={`w-6 h-6 text-muted-foreground transition-transform duration-300 ${
									isOpen ? 'rotate-180' : ''
								}`}
							/>
						</button>

						{/* スケジュール詳細 */}
						<div
							className={`transition-all duration-300 ease-in-out ${
								isOpen ? 'max-h-500 opacity-100' : 'max-h-0 opacity-0'
							}`}
						>
							<div className="p-6 pt-0">
								<div className="space-y-6 relative pl-4 border-l-2 border-dashed border-secondary/50 ml-3 pt-2">
									{day.schedule.map((item, i) => (
										<div key={i} className="relative pl-6 group">
											<div className="absolute -left-[1.4rem] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-white group-hover:scale-125 transition-transform" />
											<div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
												<div className="flex items-center gap-1 text-primary font-bold min-w-18">
													<Clock className="w-4 h-4" />
													{item.time}
												</div>
												<div className="font-bold text-lg text-foreground">
													{/* 場所名をクリックするとGoogle検索できるようにしたよ！🔍 */}
													<a
														href={`https://www.google.com/search?q=${encodeURIComponent(
															item.place
														)}`}
														target="_blank"
														rel="noopener noreferrer"
														className="hover:underline decoration-primary decoration-2 underline-offset-4 hover:text-primary transition-colors cursor-pointer"
														title="Googleで検索する"
													>
														{item.place}
													</a>
												</div>
											</div>
											<p className="text-muted-foreground text-sm leading-relaxed">
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
