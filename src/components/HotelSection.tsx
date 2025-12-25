import { MapPin, Hotel } from 'lucide-react';
import { PlanData } from '@/types/plan';

/**
 * おすすめの宿泊先を表示するコンポーネント
 */
export default function HotelSection({ hotels }: { hotels: PlanData['hotels'] }) {
  return (
    <div className="glass-card p-6 md:p-8 rounded-4xl shadow-sm">
      <h3 className="text-xl font-bold text-slate-700 mb-8 flex items-center gap-3">
        <div className="p-2 bg-indigo-50 rounded-xl text-indigo-400">
          <Hotel className="w-6 h-6" />
        </div>
        おすすめの宿泊先
      </h3>
      <div className="grid grid-cols-1 gap-6">
        {hotels.map((hotel, i) => (
          <div key={i} className="p-5 md:p-6 bg-white/40 rounded-3xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:bg-white/80 transition-all duration-300 border border-transparent hover:border-indigo-100 hover:shadow-md group">
            <div className="space-y-4 flex-1">
              <div>
                <h4 className="font-bold text-xl text-slate-800 tracking-tight">
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(hotel.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-500 transition-colors cursor-pointer decoration-indigo-100 underline-offset-8 hover:underline decoration-2"
                    title="Googleで詳細を見る"
                  >
                    {hotel.name}
                  </a>
                </h4>
                <div className="text-sm text-slate-400 flex items-center gap-2 mt-2 font-medium">
                  <MapPin className="w-4 h-4 text-indigo-300" />
                  {hotel.area}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {hotel.features.map(f => (
                  <span key={f} className="text-[10px] md:text-xs px-3 py-1 bg-white/60 text-indigo-500 rounded-full border border-indigo-50 font-bold tracking-wider uppercase shadow-sm">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-1">
              <div className="text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase">宿泊目安</div>
              <div className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-400 tracking-tight">
                {hotel.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
