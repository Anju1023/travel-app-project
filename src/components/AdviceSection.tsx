import { Luggage, Lightbulb, CheckCircle2 } from 'lucide-react';
import { PlanData } from '@/types/plan';

/**
 * 持ち物リストとアドバイスを表示するコンポーネント
 * 旅の準備をサポートする「気が利く」セクションだよ！🎒✨
 */
export default function AdviceSection({
	packingList,
	advice,
}: {
	packingList: PlanData['packingList'];
	advice: PlanData['advice'];
}) {
	return (
		<div>
			{/* 持ち物チェックリスト 🎒 */}
			<div>
				<h3>
					<div>
						<Luggage />
					</div>
					持って行くと便利なもの
				</h3>
				<div>
					{packingList.map((item, i) => (
						<div
							key={i}
						>
							<div>
								<CheckCircle2 />
							</div>
							<span>
								{item}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* 旅のアドバイス 💡 */}
			<div>
				<h3>
					<div>
						<Lightbulb />
					</div>
					旅のアドバイス
				</h3>
				<div>
					{advice.map((item, i) => (
						<div key={i}>
							<div />
							<p>
								“ {item} ”
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}