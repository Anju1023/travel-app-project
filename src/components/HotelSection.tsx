import { MapPin, Hotel } from 'lucide-react';
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
		<div className="glass-panel p-6 md:p-8 rounded-xl shadow-sm">
			<h3 className="text-xl font-bold text-[var(--color-deep-ocean)] mb-8 flex items-center gap-3">
				<div className="p-2 bg-white/50 rounded-lg text-[var(--color-ocean-blue)] shadow-sm">
					<Hotel className="w-6 h-6" />
				</div>
				おすすめの宿泊先
			</h3>
			<div className="grid grid-cols-1 gap-6">
				{hotels.map((hotel, i) => (
					<div
						key={i}
						className="p-5 md:p-6 bg-white/40 rounded-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:bg-white/70 transition-all duration-300 border border-white/40 hover:border-white/80 hover:scale-[1.01] group"
					>
						<div className="space-y-4 flex-1">
							<div>
								<h4 className="font-bold text-xl text-[var(--color-deep-ocean)] tracking-tight">
									<a
										href={`https://www.google.com/search?q=${encodeURIComponent(
											hotel.name
										)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-[var(--color-sunset-orange)] transition-colors cursor-pointer decoration-[var(--color-ocean-blue)]/30 underline-offset-8 hover:underline decoration-2"
										title="Googleで詳細を見る"
									>
										{hotel.name}
									</a>
								</h4>
								<div className="text-sm text-[var(--color-deep-ocean)]/70 flex items-center gap-2 mt-2 font-medium">
									<MapPin className="w-4 h-4 text-[var(--color-ocean-blue)]" />
									{hotel.area}
								</div>
							</div>

							<div className="flex flex-wrap gap-2">
								{hotel.features.map((f) => (
									<span
										key={f}
										className="text-[10px] md:text-xs px-3 py-1 bg-white/60 text-[var(--color-deep-ocean)] rounded-full border border-white/50 font-bold tracking-wider uppercase shadow-sm"
									>
										{f}
									</span>
								))}
							</div>
						</div>

						<div className="text-right w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/30 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-1">
							<div className="text-[10px] font-black text-[var(--color-deep-ocean)]/40 tracking-[0.2em] uppercase">
								宿泊目安
							</div>
							<div className="font-black text-2xl text-[var(--color-sunset-orange)] tracking-tight drop-shadow-sm">
								{hotel.price}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
