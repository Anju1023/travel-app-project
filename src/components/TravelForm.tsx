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
		<div className="w-full simple-card">
			<form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
				{/* Progress */}
				<div className="flex justify-center gap-2 mb-8">
					{Array.from({ length: TOTAL_STEPS }).map((_, index) => {
						const isCurrent = step === index + 1;
						const isPast = step > index + 1;
						return (
							<div
								key={index}
								className={`
									h-1.5 rounded-full transition-all duration-300
									${isCurrent ? 'w-8 bg-[var(--color-text-main)]' : 'w-2 bg-gray-200'}
									${isPast ? 'bg-gray-400' : ''}
								`}
							/>
						);
					})}
				</div>

				{/* Step 1: Destination */}
				{step === 1 && (
					<div className="space-y-6">
						<div className="text-center space-y-3">
							<div className="inline-flex p-3 bg-gray-100 rounded-lg text-[var(--color-text-main)] mb-1">
								<MapPin className="w-6 h-6" />
							</div>
							<h3 className="text-2xl font-bold text-[var(--color-text-main)]">
								どこに行きたい？
							</h3>
						</div>
						<div className="relative max-w-md mx-auto">
							<input
								type="text"
								value={formData.destination}
								onChange={(e) => handleChange('destination', e.target.value)}
								placeholder="例：京都、フランス、沖縄..."
								className="w-full p-4 bg-gray-50 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-lg text-center text-[var(--color-text-main)] placeholder-gray-400 transition-all"
								autoFocus
							/>
						</div>
					</div>
				)}

				{/* Step 2: Duration & Timing */}
				{step === 2 && (
					<div className="space-y-6 max-w-md mx-auto">
						<div className="text-center space-y-3">
							<div className="inline-flex p-3 bg-gray-100 rounded-lg text-[var(--color-text-main)] mb-1">
								<Calendar className="w-6 h-6" />
							</div>
							<h3 className="text-2xl font-bold text-[var(--color-text-main)]">
								いつ、どれくらい？
							</h3>
						</div>

						<div className="space-y-5">
							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-[var(--color-text-sub)]">
									何泊する？
								</label>
								<select
									value={formData.duration}
									onChange={(e) => handleChange('duration', e.target.value)}
									className="w-full p-3 bg-gray-50 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-[var(--color-text-main)] appearance-none"
								>
									<option>日帰り</option>
									<option>1泊2日</option>
									<option>2泊3日</option>
									<option>3泊4日</option>
									<option>4泊5日以上</option>
								</select>
							</div>

							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-[var(--color-text-sub)]">
									いつ頃行く？
								</label>
								<input
									type="text"
									value={formData.timing}
									onChange={(e) => handleChange('timing', e.target.value)}
									placeholder="例：10月下旬、GW、来年の夏..."
									className="w-full p-3 bg-gray-50 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-[var(--color-text-main)] placeholder-gray-400"
								/>
							</div>
						</div>
					</div>
				)}

				{/* Step 3: Budget & Companions */}
				{step === 3 && (
					<div className="space-y-6 max-w-md mx-auto">
						<div className="text-center space-y-3">
							<div className="inline-flex p-3 bg-gray-100 rounded-lg text-[var(--color-text-main)] mb-1">
								<Wallet className="w-6 h-6" />
							</div>
							<h3 className="text-2xl font-bold text-[var(--color-text-main)]">
								予算とメンバーは？
							</h3>
						</div>

						<div className="space-y-6">
							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-[var(--color-text-sub)]">
									予算感
								</label>
								<select
									value={formData.budget}
									onChange={(e) => handleChange('budget', e.target.value)}
									className="w-full p-3 bg-gray-50 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-[var(--color-text-main)] appearance-none"
								>
									<option>なるべく安く</option>
									<option>そこそこ（普通）</option>
									<option>ちょっと贅沢</option>
									<option>お金に糸目はつけない</option>
								</select>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-semibold text-[var(--color-text-sub)]">
									誰と行く？
								</label>
								<div className="grid grid-cols-2 gap-3">
									{COMPANION_OPTIONS.map((item) => (
										<div
											key={item.label}
											onClick={() => handleChange('companions', item.label)}
											className={`
												cursor-pointer flex items-center gap-3 p-3 rounded-lg border transition-all duration-200
												${
													formData.companions === item.label
														? 'bg-gray-900 text-white border-gray-900 shadow-sm'
														: 'bg-white border-[var(--color-border)] hover:bg-gray-50 text-[var(--color-text-main)]'
												}
											`}
										>
											<item.icon className={`w-5 h-5 ${formData.companions === item.label ? 'text-white' : 'text-gray-400'}`} />
											<span className="font-medium text-sm">
												{item.label}
											</span>
											{formData.companions === item.label && (
												<CheckCircle2 className="w-4 h-4 text-white ml-auto" />
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
					<div className="space-y-6">
						<div className="text-center space-y-3">
							<div className="inline-flex p-3 bg-gray-100 rounded-lg text-[var(--color-text-main)] mb-1">
								<Heart className="w-6 h-6" />
							</div>
							<h3 className="text-2xl font-bold text-[var(--color-text-main)]">
								どんな旅にしたい？
							</h3>
							<p className="text-[var(--color-text-sub)] text-sm">複数選択可</p>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
							{STYLE_OPTIONS.map((item) => {
								const isSelected = formData.style?.includes(item.label);
								return (
									<div
										key={item.label}
										onClick={() => handleStyleChange(item.label)}
										className={`
											cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg border transition-all gap-2 h-32
											${
												isSelected
													? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-[1.02]'
													: 'bg-white border-[var(--color-border)] hover:bg-gray-50 text-[var(--color-text-main)]'
											}
										`}
									>
										<item.icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
										<span className="font-medium text-sm">
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
					<div className="space-y-6">
						<div className="text-center space-y-3">
							<div className="inline-flex p-3 bg-gray-100 rounded-lg text-[var(--color-text-main)] mb-1">
								<Sparkles className="w-6 h-6" />
							</div>
							<h3 className="text-2xl font-bold text-[var(--color-text-main)]">
								その他のこだわり
							</h3>
						</div>
						<div className="max-w-xl mx-auto w-full">
							<textarea
								value={formData.freeText}
								onChange={(e) => handleChange('freeText', e.target.value)}
								placeholder="例：海が見えるカフェに行きたい、歴史的な建物を中心に回りたい..."
								className="w-full p-4 bg-gray-50 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none min-h-40 text-[var(--color-text-main)] placeholder-gray-400"
								autoFocus
							/>
						</div>
					</div>
				)}

				{/* Navigation */}
				<div className="flex gap-4 pt-6 border-t border-[var(--color-border)]">
					{step > 1 && (
						<button
							type="button"
							onClick={prevStep}
							disabled={loading}
							className="flex-1 btn-secondary py-3 px-4 flex items-center justify-center gap-2"
						>
							<ArrowLeft className="w-4 h-4" />
							戻る
						</button>
					)}

					{step < TOTAL_STEPS ? (
						<button
							type="button"
							onClick={nextStep}
							disabled={!formData.destination && step === 1}
							className="flex-2 btn-primary py-3 px-4 flex items-center justify-center gap-2 disabled:opacity-50"
						>
							次へ
							<ArrowRight className="w-4 h-4" />
						</button>
					) : (
						<button
							type="submit"
							disabled={loading}
							className="flex-2 btn-primary py-3 px-4 flex items-center justify-center gap-2 disabled:opacity-70"
						>
							{loading ? (
								<>
									<LifeBuoy className="w-4 h-4 animate-spin" />
									<span>{LOADING_MESSAGES[messageIndex]}</span>
								</>
							) : (
								<>
									<Sun className="w-4 h-4" />
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