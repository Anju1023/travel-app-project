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
	LifeBuoy,
	Sun,
	CheckCircle2,
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
		<div className="w-full">
			<form onSubmit={handleSubmit} className="relative">
				{/* Progress Indicators */}
				<div className="flex justify-center gap-3 mb-8">
					{Array.from({ length: TOTAL_STEPS }).map((_, index) => {
						const isCurrent = step === index + 1;
						const isPast = step > index + 1;
						return (
							<div
								key={index}
								className={`
                                    h-2.5 rounded-full transition-all duration-300 ease-out
                                    ${isCurrent ? 'w-10 bg-sky-400 shadow-md shadow-sky-200' : 'w-2.5 bg-slate-200'}
                                    ${isPast ? 'bg-sky-200' : ''}
                                `}
							/>
						);
					})}
				</div>

				<div className="bg-white/90 backdrop-blur-sm border border-white/60 shadow-xl shadow-slate-200/50 rounded-[2rem] p-6 md:p-10 min-h-[420px] flex flex-col justify-between transition-all">
					{/* Step 1: Destination */}
					{step === 1 && (
						<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
							<div className="text-center mb-8">
								<div className="inline-flex p-4 bg-sky-50 text-sky-500 rounded-full mb-4 shadow-sm">
									<MapPin size={32} strokeWidth={2.5} />
								</div>
								<h3 className="text-2xl font-bold text-slate-800">
									どこに行きたい？
								</h3>
								<p className="text-slate-500 mt-2 font-medium">
									行ってみたい国や都市を教えてね
								</p>
							</div>
							<div className="max-w-md mx-auto">
								<input
									type="text"
									value={formData.destination}
									onChange={(e) => handleChange('destination', e.target.value)}
									placeholder="例：京都、フランス、沖縄..."
									className="w-full px-5 py-4 text-lg rounded-2xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all placeholder:text-slate-300 text-center font-bold text-slate-700"
									autoFocus
								/>
							</div>
						</div>
					)}

					{/* Step 2: Duration & Timing */}
					{step === 2 && (
						<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
							<div className="text-center mb-8">
								<div className="inline-flex p-4 bg-sky-50 text-sky-500 rounded-full mb-4 shadow-sm">
									<Calendar size={32} strokeWidth={2.5} />
								</div>
								<h3 className="text-2xl font-bold text-slate-800">
									いつ、どれくらい？
								</h3>
							</div>

							<div className="max-w-md mx-auto space-y-6">
								<div>
									<label className="block text-sm font-bold text-slate-600 mb-2 ml-1">
										何泊する？
									</label>
									<div className="relative">
										<select
											value={formData.duration}
											onChange={(e) => handleChange('duration', e.target.value)}
											className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all appearance-none font-medium text-slate-700"
										>
											<option>日帰り</option>
											<option>1泊2日</option>
											<option>2泊3日</option>
											<option>3泊4日</option>
											<option>4泊5日以上</option>
										</select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <ArrowRight size={16} className="rotate-90" />
                                        </div>
									</div>
								</div>

								<div>
									<label className="block text-sm font-bold text-slate-600 mb-2 ml-1">
										いつ頃行く？
									</label>
									<input
										type="text"
										value={formData.timing}
										onChange={(e) => handleChange('timing', e.target.value)}
										placeholder="例：10月下旬、GW、来年の夏..."
										className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all font-medium text-slate-700 placeholder:text-slate-300"
									/>
								</div>
							</div>
						</div>
					)}

					{/* Step 3: Budget & Companions */}
					{step === 3 && (
						<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
							<div className="text-center mb-6">
								<div className="inline-flex p-4 bg-sky-50 text-sky-500 rounded-full mb-4 shadow-sm">
									<Wallet size={32} strokeWidth={2.5} />
								</div>
								<h3 className="text-2xl font-bold text-slate-800">
									予算とメンバーは？
								</h3>
							</div>

							<div className="max-w-md mx-auto space-y-6">
								<div>
									<label className="block text-sm font-bold text-slate-600 mb-2 ml-1">
										予算感
									</label>
									<div className="relative">
										<select
											value={formData.budget}
											onChange={(e) => handleChange('budget', e.target.value)}
											className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all appearance-none font-medium text-slate-700"
										>
											<option>なるべく安く</option>
											<option>そこそこ（普通）</option>
											<option>ちょっと贅沢</option>
											<option>お金に糸目はつけない</option>
										</select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <ArrowRight size={16} className="rotate-90" />
                                        </div>
									</div>
								</div>

								<div>
									<label className="block text-sm font-bold text-slate-600 mb-2 ml-1">
										誰と行く？
									</label>
									<div className="grid grid-cols-2 gap-4">
										{COMPANION_OPTIONS.map((item) => (
											<div
												key={item.label}
												onClick={() => handleChange('companions', item.label)}
												className={`
                                                    cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 text-center relative overflow-hidden group
                                                    ${
																											formData.companions ===
																											item.label
																												? 'border-sky-400 bg-sky-50 text-sky-700 ring-4 ring-sky-100'
																												: 'border-slate-100 bg-white text-slate-500 hover:border-sky-200 hover:bg-sky-50/50 hover:text-sky-600'
																										}
                                                `}
											>
												<div className={`
                                                    p-2 rounded-full transition-colors
                                                    ${formData.companions === item.label ? 'bg-sky-100 text-sky-500' : 'bg-slate-50 text-slate-400 group-hover:bg-sky-100 group-hover:text-sky-400'}
                                                `}>
                                                    <item.icon size={24} strokeWidth={2.5} />
                                                </div>
												<span className="text-sm font-bold">
													{item.label}
												</span>
												{formData.companions === item.label && (
													<div className="absolute top-2 right-2 text-sky-500 animate-in zoom-in duration-300">
														<CheckCircle2 size={18} fill="currentColor" className="text-white" />
													</div>
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
						<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
							<div className="text-center mb-6">
								<div className="inline-flex p-4 bg-sky-50 text-sky-500 rounded-full mb-4 shadow-sm">
									<Heart size={32} strokeWidth={2.5} />
								</div>
								<h3 className="text-2xl font-bold text-slate-800">
									どんな旅にしたい？
								</h3>
								<p className="text-slate-500 mt-2 text-sm font-medium">
									気になるものをいくつでも選んでね
								</p>
							</div>

							<div className="max-w-lg mx-auto">
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
									{STYLE_OPTIONS.map((item) => {
										const isSelected = formData.style?.includes(item.label);
										return (
											<div
												key={item.label}
												onClick={() => handleStyleChange(item.label)}
												className={`
                                                    cursor-pointer p-3 py-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center select-none group
                                                    ${
																											isSelected
																												? 'border-rose-400 bg-rose-50 text-rose-700 ring-4 ring-rose-100' // ここだけアクセントでRose(ピンク)を使う！
																												: 'border-slate-100 bg-white text-slate-500 hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-600'
																										}
                                                `}
											>
												<item.icon
													size={24}
                                                    strokeWidth={2.5}
													className={
														isSelected ? 'text-rose-500' : 'text-slate-300 group-hover:text-rose-400 transition-colors'
													}
												/>
												<span className="text-sm font-bold">
													{item.label}
												</span>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					)}

					{/* Step 5: Free Text */}
					{step === 5 && (
						<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
							<div className="text-center mb-8">
								<div className="inline-flex p-4 bg-sky-50 text-sky-500 rounded-full mb-4 shadow-sm">
									<Sparkles size={32} strokeWidth={2.5} />
								</div>
								<h3 className="text-2xl font-bold text-slate-800">
									その他のこだわり
								</h3>
								<p className="text-slate-500 mt-2 font-medium">
									わがまま、全部教えて？
								</p>
							</div>
							<div className="max-w-md mx-auto">
								<textarea
									value={formData.freeText}
									onChange={(e) => handleChange('freeText', e.target.value)}
									placeholder="例：海が見えるカフェに行きたい、歴史的な建物を中心に回りたい..."
									className="w-full h-40 px-5 py-4 rounded-2xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400 transition-all placeholder:text-slate-300 resize-none font-medium text-slate-700 leading-relaxed"
									autoFocus
								/>
							</div>
						</div>
					)}

					{/* Navigation Buttons */}
					<div className="mt-8 flex justify-between items-center max-w-md mx-auto w-full pt-6 border-t border-slate-100">
						{step > 1 ? (
							<button
								type="button"
								onClick={prevStep}
								disabled={loading}
								className="px-6 py-3 rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors flex items-center gap-2 font-bold"
							>
								<ArrowLeft size={20} />
								戻る
							</button>
						) : (
							<div /> /* Spacer */
						)}

						{step < TOTAL_STEPS ? (
							<button
								type="button"
								onClick={nextStep}
								disabled={!formData.destination && step === 1}
								className="px-8 py-3.5 rounded-full bg-slate-800 text-white font-bold hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
							>
								次へ
								<ArrowRight size={20} />
							</button>
						) : (
							<button
								type="submit"
								disabled={loading}
								className="px-8 py-3.5 rounded-full bg-linear-to-r from-sky-400 to-sky-500 text-white font-bold shadow-lg shadow-sky-200/50 hover:shadow-xl hover:shadow-sky-300/50 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
							>
								{loading ? (
									<>
										<LifeBuoy className="animate-spin" size={20} />
										<span>{LOADING_MESSAGES[messageIndex]}</span>
									</>
								) : (
									<>
										<Sun size={20} />
										<span>プランを作成</span>
									</>
								)}
							</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
}