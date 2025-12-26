import { MapPin, Hotel, Tag } from 'lucide-react';
import { PlanData } from '@/types/plan';

/**
 * おすすめの宿泊先を表示するコンポーネント
 */
export default function HotelSection({
	hotels,
}: {
	hotels: PlanData['hotels'];
}) {
	return (
		<div className="space-y-4">
			<h3 className="flex items-center gap-2 text-xl font-bold text-slate-800 px-2">
				<div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
					<Hotel size={20} />
				</div>
				おすすめの宿泊先
			</h3>
			
			<div className="grid gap-4 sm:grid-cols-2">
				{hotels.map((hotel, i) => (
					<div
						key={i}
						className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col justify-between group h-full"
					>
						<div>
							<div className="mb-3">
								<h4 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors">
									<a
										href={`https://www.google.com/search?q=${encodeURIComponent(
											hotel.name
										)}`}
										target="_blank"
										rel="noopener noreferrer"
										title="Googleで詳細を見る"
										className="hover:underline decoration-indigo-300 underline-offset-4"
									>
										{hotel.name}
									</a>
								</h4>
								<div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
									<MapPin size={14} />
									{hotel.area}
								</div>
							</div>

							<div className="flex flex-wrap gap-2 mb-4">
								{hotel.features.map((f) => (
									<span
										key={f}
										className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 text-xs font-medium border border-slate-100"
									>
                                        <Tag size={10} className="opacity-50" />
										{f}
									</span>
								))}
							</div>
						</div>

						<div className="pt-4 border-t border-slate-50 flex justify-between items-end">
							<div className="text-xs text-slate-400 font-medium">
								宿泊目安
							</div>
							<div className="font-bold text-indigo-600 text-lg">
								{hotel.price}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}