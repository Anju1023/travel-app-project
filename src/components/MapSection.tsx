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
    <div className="bg-white p-4 rounded-3xl shadow-sm border border-secondary/50 overflow-hidden">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <LucideMap className="text-primary" />
        旅のマップ 🗺️
      </h3>
      
      <div className="h-[300 md:h-[400px]] w-full rounded-2xl overflow-hidden border border-secondary z-0">
        <MapContainer 
          center={centerPos} 
          zoom={13} 
          scrollWheelZoom={false} 
          className="h-full w-full"
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {allSpots.map((spot, i) => (
            <Marker key={i} position={[spot.lat, spot.lng]}>
              <Popup>
                <div className="text-center p-1">
                  <div className="font-bold text-sm mb-1">{spot.place}</div>
                  <div className="text-xs text-muted-foreground">
                    {spot.type === 'hotel' ? '🏨 宿泊先' : '📍 スポット'}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        ピンをタップすると場所の名前が見れるよ！📍
      </p>
    </div>
  );
}
