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
		<div>
			{days.map((day) => {
				const isOpen = openDays.includes(day.day);

				return (
					<div
						key={day.day}
					>
						{/* ヘッダーボタン */}
						<button
							onClick={() => toggleDay(day.day)}
						>
							<h3>
								<span>
									{day.day}
								</span>
								<span>Day {day.day}</span>
							</h3>
							<div>
								<ChevronDown />
							</div>
						</button>

						{/* スケジュール詳細 */}
						{isOpen && (
							<div>
								<div>
									<div>
										{day.schedule.map((item, i) => (
											<div key={i}>
												{/* ドット */}
												<div />

												<div>
													<div>
														<Clock />
														{item.time}
													</div>
													<div>
														<a
															href={`https://www.google.com/search?q=${encodeURIComponent(
																item.place
															)}`}
															target="_blank"
															rel="noopener noreferrer"
															title="Googleで検索する"
														>
															{item.place}
														</a>
													</div>
												</div>
												<p>
													{item.description}
												</p>
											</div>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}