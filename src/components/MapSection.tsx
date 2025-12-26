'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Map as LucideMap } from 'lucide-react';
import { PlanData } from '@/types/plan';
import 'leaflet/dist/leaflet.css';
import { renderToString } from 'react-dom/server';
import { MapPin, Hotel } from 'lucide-react';

/**
 * 地図を表示するコンポーネント
 * カスタムピン📍を使って、可愛くスポットを表示するよ！
 */
export default function MapSection({ plan }: { plan: PlanData }) {
	// マーカーのアイコン設定 (L.divIcon を使用)
	const createCustomIcon = (type: 'spot' | 'hotel') => {
		if (typeof window === 'undefined') return null;

		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const L = require('leaflet');

		const colorClass = type === 'hotel' ? 'bg-rose-500' : 'bg-sky-500';
		const iconComponent =
			type === 'hotel' ? (
				<Hotel size={16} color="white" strokeWidth={3} />
			) : (
				<MapPin size={16} color="white" strokeWidth={3} />
			);

		const iconHtml = renderToString(
			<div
				className={`
                relative w-8 h-8 rounded-full ${colorClass} border-4 border-white shadow-lg flex items-center justify-center
                transform transition-transform hover:scale-110
            `}
			>
				{iconComponent}
				<div
					className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white`}
				/>
				<div
					className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-${
						type === 'hotel' ? 'rose-500' : 'sky-500'
					}`}
				/>
			</div>
		);

		return L.divIcon({
			html: iconHtml,
			className: 'custom-marker-icon',
			iconSize: [32, 32],
			iconAnchor: [16, 38],
			popupAnchor: [0, -38],
		});
	};

	const allSpots = [
		...plan.days.flatMap((day) =>
			day.schedule.map((s) => ({ ...s, type: 'spot' as const }))
		),
		...plan.hotels.map((h) => ({
			...h,
			place: h.name,
			type: 'hotel' as const,
		})),
	];

	const centerPos: [number, number] =
		allSpots.length > 0
			? [allSpots[0].lat, allSpots[0].lng]
			: [35.6812, 139.7671];

	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
				<h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
					<div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
						<LucideMap size={18} />
					</div>
					旅のマップ
				</h3>
				<span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
					全 {allSpots.length} スポット
				</span>
			</div>

			<div className="h-80 md:h-96 w-full relative z-0 bg-slate-50">
				<MapContainer
					center={centerPos}
					zoom={13}
					scrollWheelZoom={false}
					style={{ height: '100%', width: '100%' }}
					className="z-0"
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					{allSpots.map((spot, i) => {
						const icon = createCustomIcon(spot.type);
						if (!icon) return null;

						return (
							<Marker key={i} position={[spot.lat, spot.lng]} icon={icon}>
								<Popup>
									<div className="text-center p-1 min-w-[150px]">
										<div className="font-bold text-sm mb-1 text-slate-800 font-sans">
											<a
												href={`https://www.google.com/search?q=${encodeURIComponent(
													spot.place
												)}`}
												target="_blank"
												rel="noopener noreferrer"
												className="hover:text-sky-500 hover:underline decoration-sky-300 decoration-2 underline-offset-2"
											>
												{spot.place}
											</a>
										</div>
										<div
											className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full inline-block ${
												spot.type === 'hotel'
													? 'bg-rose-100 text-rose-500'
													: 'bg-sky-100 text-sky-500'
											}`}
										>
											{spot.type === 'hotel' ? '宿泊先' : 'スポット'}
										</div>
									</div>
								</Popup>
							</Marker>
						);
					})}
				</MapContainer>
			</div>
			<div className="p-2 bg-slate-50 text-center border-t border-slate-100">
				<p className="text-xs text-slate-400 font-medium">
					ピンをタップすると詳細が表示されます
				</p>
			</div>
		</div>
	);
}