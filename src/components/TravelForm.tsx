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
} from 'lucide-react';
import { TravelFormData } from '@/types/plan';

const LOADING_MESSAGES = [
	'プランを考え中...',
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
		<div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
			<form onSubmit={handleSubmit} className="p-6 space-y-8">
				{/* Progress */}
				<div className="flex justify-center gap-2 mb-4">
					{Array.from({ length: TOTAL_STEPS }).map((_, index) => {
						const isCurrent = step === index + 1;
						const isPast = step > index + 1;
						return (
							<div
								key={index}
								className={`
									h-2 rounded-full transition-all
									${isCurrent ? 'w-8 bg-gray-800' : 'w-2 bg-gray-200'}
									${isPast ? 'bg-gray-400' : ''}
								`}
							/>
						);
					})}
				</div>

				{/* Step 1: Destination */}
				{step === 1 && (
					<div className="space-y-6">
						<div className="text-center space-y-2">
							<div className="inline-flex p-3 bg-gray-100 rounded-full text-gray-700 mb-2">
								<MapPin className="w-6 h-6" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900">
								どこに行きたい？
							</h3>
						</div>
						<div className="relative">
							<input
								type="text"
								value={formData.destination}
								onChange={(e) => handleChange('destination', e.target.value)}
								placeholder="例：京都、フランス、沖縄..."
								className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none text-lg text-center"
								autoFocus
							/>
						</div>
					</div>
				)}

				{/* Step 2: Duration & Timing */}
				{step === 2 && (
					<div className="space-y-6">
						<div className="text-center space-y-2">
							<div className="inline-flex p-3 bg-gray-100 rounded-full text-gray-700 mb-2">
								<Calendar className="w-6 h-6" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900">
								いつ、どれくらい？
							</h3>
						</div>

						<div className="space-y-4">
							<div className="space-y-1">
								<label className="text-sm font-semibold text-gray-700">
									何泊する？
								</label>
								<select
									value={formData.duration}
									onChange={(e) => handleChange('duration', e.target.value)}
									className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
								>
									<option>日帰り</option>
									<option>1泊2日</option>
									<option>2泊3日</option>
									<option>3泊4日</option>
									<option>4泊5日以上</option>
								</select>
							</div>

							<div className="space-y-1">
								<label className="text-sm font-semibold text-gray-700">
									いつ頃行く？
								</label>
								<input
									type="text"
									value={formData.timing}
									onChange={(e) => handleChange('timing', e.target.value)}
									placeholder="例：10月下旬、GW、来年の夏..."
									className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
								/>
							</div>
						</div>
					</div>
				)}

				{/* Step 3: Budget & Companions */}
				{step === 3 && (
					<div className="space-y-6">
						<div className="text-center space-y-2">
							<div className="inline-flex p-3 bg-gray-100 rounded-full text-gray-700 mb-2">
								<Wallet className="w-6 h-6" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900">
								予算とメンバーは？
							</h3>
						</div>

						<div className="space-y-6">
							<div className="space-y-1">
								<label className="text-sm font-semibold text-gray-700">
									予算感
								</label>
								<select
									value={formData.budget}
									onChange={(e) => handleChange('budget', e.target.value)}
									className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
								>
									<option>なるべく安く</option>
									<option>そこそこ（普通）</option>
									<option>ちょっと贅沢</option>
									<option>お金に糸目はつけない</option>
								</select>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-semibold text-gray-700">
									誰と行く？
								</label>
								<div className="grid grid-cols-2 gap-3">
									{COMPANION_OPTIONS.map((item) => (
										<div
											key={item.label}
											onClick={() => handleChange('companions', item.label)}
											className={`
												cursor-pointer flex items-center gap-3 p-3 rounded-lg border transition-colors
												${
													formData.companions === item.label
														? 'bg-gray-100 border-gray-400 ring-1 ring-gray-400'
														: 'bg-white border-gray-200 hover:bg-gray-50'
												}
											`}
										>
											<item.icon className="w-5 h-5 text-gray-600" />
											<span className="font-medium text-sm text-gray-800">
												{item.label}
											</span>
											{formData.companions === item.label && (
												<CheckCircle2 className="w-4 h-4 text-gray-700 ml-auto" />
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
						<div className="text-center space-y-2">
							<div className="inline-flex p-3 bg-gray-100 rounded-full text-gray-700 mb-2">
								<Heart className="w-6 h-6" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900">
								どんな旅にしたい？
							</h3>
							<p className="text-gray-500 text-sm">複数選択可</p>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
							{STYLE_OPTIONS.map((item) => {
								const isSelected = formData.style?.includes(item.label);
								return (
									<div
										key={item.label}
										onClick={() => handleStyleChange(item.label)}
										className={`
											cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg border transition-colors gap-2 h-32
											${
												isSelected
													? 'bg-gray-100 border-gray-400 ring-1 ring-gray-400'
													: 'bg-white border-gray-200 hover:bg-gray-50'
											}
										`}
									>
										<item.icon className={`w-6 h-6 ${isSelected ? 'text-gray-900' : 'text-gray-500'}`} />
										<span
											className={`font-medium text-sm ${
												isSelected ? 'text-gray-900' : 'text-gray-600'
											}`}
										>
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
						<div className="text-center space-y-2">
							<div className="inline-flex p-3 bg-gray-100 rounded-full text-gray-700 mb-2">
								<Sparkles className="w-6 h-6" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900">
								その他のこだわり
							</h3>
						</div>
						<div>
							<textarea
								value={formData.freeText}
								onChange={(e) => handleChange('freeText', e.target.value)}
								placeholder="例：海が見えるカフェに行きたい、歴史的な建物を中心に回りたい..."
								className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 outline-none min-h-40 text-gray-800"
								autoFocus
							/>
						</div>
					</div>
				)}

				{/* Navigation */}
				<div className="flex gap-4 pt-4 border-t border-gray-100">
					{step > 1 && (
						<button
							type="button"
							onClick={prevStep}
							disabled={loading}
							className="flex-1 py-3 px-4 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
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
							className="flex-2 py-3 px-4 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							次へ
							<ArrowRight className="w-4 h-4" />
						</button>
					) : (
						<button
							type="submit"
							disabled={loading}
							className="flex-2 py-3 px-4 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 disabled:opacity-70 flex items-center justify-center gap-2"
						>
							{loading ? (
								<>
									<Luggage className="w-4 h-4 animate-bounce" />
									<span>{LOADING_MESSAGES[messageIndex]}</span>
								</>
							) : (
								<>
									<Sparkles className="w-4 h-4" />
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