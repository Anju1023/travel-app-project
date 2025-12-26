'use client';

import { useState, useEffect } from 'react';
import {
	MapPin,
	Calendar,
	Wallet,
	Users,
	Heart,
	Sparkles,
	Luggage,
	User,
	Baby,
	Coffee,
	Footprints,
	Utensils,
	Landmark,
	Compass,
	Camera,
	ArrowRight,
	ArrowLeft,
	CheckCircle2,
	LifeBuoy,
	Sun,
} from 'lucide-react';
import { TravelFormData } from '@/types/plan';

const LOADING_MESSAGES = [
	'プランを考え中...💭',
	'カフェを探し中...☕️',
	'スポットを厳選中...📸',
	'ルートを計算中...🗺️',
	'隠れ家を調査中...🤫',
	'宿をピックアップ中...🏨',
	'しおりを執筆中...✍️',
	'ワクワクを詰め込み中...✨',
];

const COMPANION_OPTIONS = [
	{ label: '一人旅', icon: User },
	{ label: '友達', icon: Users },
	{ label: 'カップル/夫婦', icon: Heart },
	{ label: '家族', icon: Baby },
];

const STYLE_OPTIONS = [
	{ label: 'のんびり', icon: Coffee },
	{ label: 'アクティブ', icon: Footprints },
	{ label: 'グルメ', icon: Utensils },
	{ label: '観光名所', icon: Landmark },
	{ label: '穴場スポット', icon: Compass },
	{ label: '映え', icon: Camera },
];

export default function TravelForm({
	onSubmit,
}: {
	onSubmit: (data: TravelFormData) => Promise<void>;
}) {
	const [loading, setLoading] = useState(false);
	const [messageIndex, setMessageIndex] = useState(0);

	const [step, setStep] = useState(1);
	const TOTAL_STEPS = 5;

	const [formData, setFormData] = useState<Partial<TravelFormData>>({
		destination: '',
		duration: '1泊2日',
		timing: '',
		budget: 'そこそこ（普通）',
		companions: '友達',
		style: [],
		freeText: '',
	});

	useEffect(() => {
		if (!loading) return;

		const timer = setInterval(() => {
			setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
		}, 2500);

		return () => clearInterval(timer);
	}, [loading]);

	const handleChange = <K extends keyof TravelFormData>(
		name: K,
		value: TravelFormData[K]
	) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleStyleChange = (styleLabel: string) => {
		const currentStyles = formData.style || [];
		const newStyles = currentStyles.includes(styleLabel)
			? currentStyles.filter((s) => s !== styleLabel)
			: [...currentStyles, styleLabel];
		handleChange('style', newStyles);
	};

	const nextStep = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
	const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (step < TOTAL_STEPS) return;

		setLoading(true);
		await onSubmit(formData as TravelFormData);
		setLoading(false);
		setMessageIndex(0);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				{/* Progress */}
				<div>
					{Array.from({ length: TOTAL_STEPS }).map((_, index) => {
						const isCurrent = step === index + 1;
						const isPast = step > index + 1;
						return (
							<div
								key={index}
							/>
						);
					})}
				</div>

				{/* Step 1: Destination */}
				{step === 1 && (
					<div>
						<div>
							<div>
								<MapPin />
							</div>
							<h3>
								どこに行きたい？
							</h3>
						</div>
						<div>
							<input
								type="text"
								value={formData.destination}
								onChange={(e) => handleChange('destination', e.target.value)}
								placeholder="例：京都、フランス、沖縄..."
								autoFocus
							/>
						</div>
					</div>
				)}

				{/* Step 2: Duration & Timing */}
				{step === 2 && (
					<div>
						<div>
							<div>
								<Calendar />
							</div>
							<h3>
								いつ、どれくらい？
							</h3>
						</div>

						<div>
							<div>
								<label>
									何泊する？
								</label>
								<select
									value={formData.duration}
									onChange={(e) => handleChange('duration', e.target.value)}
								>
									<option>日帰り</option>
									<option>1泊2日</option>
									<option>2泊3日</option>
									<option>3泊4日</option>
									<option>4泊5日以上</option>
								</select>
							</div>

							<div>
								<label>
									いつ頃行く？
								</label>
								<input
									type="text"
									value={formData.timing}
									onChange={(e) => handleChange('timing', e.target.value)}
									placeholder="例：10月下旬、GW、来年の夏..."
								/>
							</div>
						</div>
					</div>
				)}

				{/* Step 3: Budget & Companions */}
				{step === 3 && (
					<div>
						<div>
							<div>
								<Wallet />
							</div>
							<h3>
								予算とメンバーは？
							</h3>
						</div>

						<div>
							<div>
								<label>
									予算感
								</label>
								<select
									value={formData.budget}
									onChange={(e) => handleChange('budget', e.target.value)}
								>
									<option>なるべく安く</option>
									<option>そこそこ（普通）</option>
									<option>ちょっと贅沢</option>
									<option>お金に糸目はつけない</option>
								</select>
							</div>

							<div>
								<label>
									誰と行く？
								</label>
								<div>
									{COMPANION_OPTIONS.map((item) => (
										<div
											key={item.label}
											onClick={() => handleChange('companions', item.label)}
										>
											<item.icon />
											<span>
												{item.label}
											</span>
											{formData.companions === item.label && (
												<CheckCircle2 />
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Step 4: Style */}
				{step === 4 && (
					<div>
						<div>
							<div>
								<Heart />
							</div>
							<h3>
								どんな旅にしたい？
							</h3>
							<p>複数選択可</p>
						</div>

						<div>
							{STYLE_OPTIONS.map((item) => {
								const isSelected = formData.style?.includes(item.label);
								return (
									<div
										key={item.label}
										onClick={() => handleStyleChange(item.label)}
									>
										<item.icon />
										<span>
											{item.label}
										</span>
									</div>
								);
							})}
						</div>
					</div>
				)}

				{/* Step 5: Free Text */}
				{step === 5 && (
					<div>
						<div>
							<div>
								<Sparkles />
							</div>
							<h3>
								その他のこだわり
							</h3>
						</div>
						<div>
							<textarea
								value={formData.freeText}
								onChange={(e) => handleChange('freeText', e.target.value)}
								placeholder="例：海が見えるカフェに行きたい、歴史的な建物を中心に回りたい..."
								autoFocus
							/>
						</div>
					</div>
				)}

				{/* Navigation */}
				<div>
					{step > 1 && (
						<button
							type="button"
							onClick={prevStep}
							disabled={loading}
						>
							<ArrowLeft />
							戻る
						</button>
					)}

					{step < TOTAL_STEPS ? (
						<button
							type="button"
							onClick={nextStep}
							disabled={!formData.destination && step === 1}
						>
							次へ
							<ArrowRight />
						</button>
					) : (
						<button
							type="submit"
							disabled={loading}
						>
							{loading ? (
								<>
									<LifeBuoy />
									<span>{LOADING_MESSAGES[messageIndex]}</span>
								</>
							) : (
								<>
									<Sun />
									<span>プランを作成</span>
								</>
							)}
						</button>
					)}
				</div>
			</form>
		</div>
	);
}