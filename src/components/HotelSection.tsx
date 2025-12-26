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
		<div>
			<h3>
				<div>
					<Hotel />
				</div>
				おすすめの宿泊先
			</h3>
			<div>
				{hotels.map((hotel, i) => (
					<div
						key={i}
					>
						<div>
							<div>
								<h4>
									<a
										href={`https://www.google.com/search?q=${encodeURIComponent(
											hotel.name
										)}`}
										target="_blank"
										rel="noopener noreferrer"
										title="Googleで詳細を見る"
									>
										{hotel.name}
									</a>
								</h4>
								<div>
									<MapPin />
									{hotel.area}
								</div>
							</div>

							<div>
								{hotel.features.map((f) => (
									<span
										key={f}
									>
										{f}
									</span>
								))}
							</div>
						</div>

						<div>
							<div>
								宿泊目安
							</div>
							<div>
								{hotel.price}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}