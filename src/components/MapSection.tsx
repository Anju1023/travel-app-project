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
		<div className="simple-card p-4 md:p-6 overflow-hidden">
			<h3 className="text-xl font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-3">
				<div className="p-2 bg-gray-100 rounded-lg text-[var(--color-text-main)]">
					<LucideMap className="w-6 h-6" />
				</div>
				旅のマップ
			</h3>

			<div className="h-87.5 md:h-112.5 w-full rounded-lg overflow-hidden border border-[var(--color-border)] z-0 bg-gray-50">
				<MapContainer
					center={centerPos}
					zoom={13}
					scrollWheelZoom={false}
					className="h-full w-full"
					style={{ height: '100%', width: '100%' }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					{allSpots.map((spot, i) => (
						<Marker key={i} position={[spot.lat, spot.lng]}>
							<Popup>
								<div className="text-center p-1 font-sans">
									<div className="font-bold text-sm mb-1">
										<a
											href={`https://www.google.com/search?q=${encodeURIComponent(
												spot.place
											)}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] hover:underline transition-all"
										>
											{spot.place}
										</a>
									</div>
									<div className="text-[10px] font-bold text-gray-400 tracking-wider">
										{spot.type === 'hotel' ? '🏨 HOTEL' : '📍 SPOT'}
									</div>
								</div>
							</Popup>
						</Marker>
					))}
				</MapContainer>
			</div>
			<p className="text-xs font-medium text-[var(--color-text-sub)] mt-4 text-center italic opacity-80">
				ピンをタップすると場所の名前が見れるよ！📍
			</p>
		</div>
	);
}
