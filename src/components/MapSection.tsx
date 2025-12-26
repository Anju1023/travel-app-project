'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Map as LucideMap } from 'lucide-react';
import { PlanData } from '@/types/plan';
import 'leaflet/dist/leaflet.css';

/**
 * 地図を表示するコンポーネント
 * 提案されたスポットを地図上にピン📍で表示するよ！
 * このコンポーネントは親 (PlanResult) で SSR: false として読み込まれることを想定しているよ。
 */
export default function MapSection({ plan }: { plan: PlanData }) {
	// マーカーのアイコンが崩れる問題を修正するためのマジック！✨
	useEffect(() => {
		const initLeaflet = async () => {
			const L = (await import('leaflet')).default;

			// Leafletのデフォルトアイコンのパスを正しく設定し直すよ
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			delete (L.Icon.Default.prototype as any)._getIconUrl;
			L.Icon.Default.mergeOptions({
				iconRetinaUrl:
					'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
				iconUrl:
					'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
				shadowUrl:
					'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
			});
		};

		initLeaflet();
	}, []);

	// 全てのスポット（タイムラインとホテル）を一つのリストにまとめるよ
	const allSpots = [
		...plan.days.flatMap((day) =>
			day.schedule.map((s) => ({ ...s, type: 'spot' }))
		),
		...plan.hotels.map((h) => ({ ...h, place: h.name, type: 'hotel' })),
	];

	// 地図の初期中心位置を決めるよ。とりあえず最初のスポットにするね！
	const centerPos: [number, number] =
		allSpots.length > 0
			? [allSpots[0].lat, allSpots[0].lng]
			: [35.6812, 139.7671]; // スポットがない時は東京駅付近

	return (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                    <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                        <LucideMap size={18} />
                    </div>
                    旅のマップ
                </h3>
                <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">
                    {allSpots.length} スポット
                </span>
            </div>

			<div className="h-80 md:h-96 w-full relative z-0">
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

					{allSpots.map((spot, i) => (
						<Marker key={i} position={[spot.lat, spot.lng]}>
							<Popup>
								<div className="text-center p-1 min-w-[150px]">
									<div className="font-bold text-sm mb-1 text-slate-800">
										<a
											href={`https://www.google.com/search?q=${encodeURIComponent(
												spot.place
											)}`}
											target="_blank"
											rel="noopener noreferrer"
                                            className="hover:text-sky-500 hover:underline"
										>
											{spot.place}
										</a>
									</div>
									<div className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full inline-block bg-slate-100 text-slate-500">
										{spot.type === 'hotel' ? '🏨 HOTEL' : '📍 SPOT'}
									</div>
								</div>
							</Popup>
						</Marker>
					))}
				</MapContainer>
			</div>
			<div className="p-2 bg-slate-50 text-center border-t border-slate-100">
			    <p className="text-xs text-slate-400">
				    ピンをタップすると場所の名前が見れるよ！📍
			    </p>
            </div>
		</div>
	);
}