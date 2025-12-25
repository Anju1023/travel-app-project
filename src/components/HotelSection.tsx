import { MapPin, Hotel } from 'lucide-react';
import { PlanData } from '@/types/plan';

/**
 * おすすめの宿泊先を表示するコンポーネント
 */
export default function HotelSection({ hotels }: { hotels: PlanData['hotels'] }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-secondary/50">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Hotel className="text-primary" />
        おすすめの宿泊先 🏨
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {hotels.map((hotel, i) => (
          <div key={i} className="p-4 bg-accent/20 rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:bg-accent/30 transition-colors">
            <div>
              <h4 className="font-bold text-lg">{hotel.name}</h4>
              <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4" />
                {hotel.area}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {hotel.features.map(f => (
                  <span key={f} className="text-xs px-2 py-1 bg-white rounded-full border border-secondary text-secondary-foreground shadow-sm">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right w-full md:w-auto mt-2 md:mt-0 border-t md:border-t-0 border-secondary/30 pt-2 md:pt-0">
              <div className="text-xs text-muted-foreground">宿泊の目安</div>
              <div className="font-bold text-xl text-primary">{hotel.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
