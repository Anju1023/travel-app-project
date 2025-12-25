'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Map as LucideMap } from 'lucide-react';
import { PlanData } from '@/types/plan';
import 'leaflet/dist/leaflet.css';

// Leaflet のコンポーネントをサーバーサイドレンダリング (SSR) しないように動的インポートするよ！
// 地図はブラウザの 'window' オブジェクトが必要だからね。
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

/**
 * 地図を表示するコンポーネント
 * 提案されたスポットを地図上にピン📍で表示するよ！
 */
export default function MapSection({ plan }: { plan: PlanData }) {
  const [isClient, setIsClient] = useState(false);

  // マーカーのアイコンが崩れる問題を修正するためのマジック！✨
  // Next.js で Leaflet を使う時の定番のおまじないだよ。
  useEffect(() => {
    setIsClient(true);
    
    // クライアントサイドでのみ実行
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  if (!isClient) return null;

  // 全てのスポット（タイムラインとホテル）を一つのリストにまとめるよ
  const allSpots = [
    ...plan.days.flatMap(day => day.schedule.map(s => ({ ...s, type: 'spot' }))),
    ...plan.hotels.map(h => ({ ...h, place: h.name, type: 'hotel' }))
  ];

  // 地図の初期中心位置を決めるよ。とりあえず最初のスポットにするね！
  const centerPos: [number, number] = allSpots.length > 0 
    ? [allSpots[0].lat, allSpots[0].lng] 
    : [35.6812, 139.7671]; // スポットがない時は東京駅付近

  return (
    <div className="glass-card p-4 md:p-6 rounded-[2rem] shadow-sm overflow-hidden">
      <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-3">
        <div className="p-2 bg-sky-50 rounded-xl text-sky-400">
          <LucideMap className="w-6 h-6" />
        </div>
        旅のマップ
      </h3>
      
      <div className="h-[350px] md:h-[450px] w-full rounded-[1.5rem] overflow-hidden border border-sky-50 z-0 shadow-inner">
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
                    {/* ポップアップの中の文字もリンクにしたよ！🔗 */}
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(spot.place)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-500 hover:text-sky-600 hover:underline transition-all"
                    >
                      {spot.place}
                    </a>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider">
                    {spot.type === 'hotel' ? '🏨 HOTEL' : '📍 SPOT'}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <p className="text-xs font-medium text-slate-400 mt-4 text-center italic opacity-80">
        ピンをタップすると場所の名前が見れるよ！📍
      </p>
    </div>
  );
}
