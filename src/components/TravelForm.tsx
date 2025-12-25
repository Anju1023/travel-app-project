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

// ローディング中に表示する「実況メッセージ」
// スマホでも入りきるように、少し短く整えるね！
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

// 同行者の選択肢データ
const COMPANION_OPTIONS = [
	{ label: '一人旅', icon: User, color: 'bg-blue-50 text-blue-600' },
	{ label: '友達', icon: Users, color: 'bg-green-50 text-green-600' },
	{ label: 'カップル/夫婦', icon: Heart, color: 'bg-pink-50 text-pink-600' },
	{ label: '家族', icon: Baby, color: 'bg-orange-50 text-orange-600' },
];

// 旅のスタイルの選択肢データ
const STYLE_OPTIONS = [
	{ label: 'のんびり', icon: Coffee, color: 'bg-amber-50 text-amber-600' },
	{ label: 'アクティブ', icon: Footprints, color: 'bg-red-50 text-red-600' },
	{ label: 'グルメ', icon: Utensils, color: 'bg-rose-50 text-rose-600' },
	{ label: '観光名所', icon: Landmark, color: 'bg-indigo-50 text-indigo-600' },
	{ label: '穴場スポット', icon: Compass, color: 'bg-teal-50 text-teal-600' },
	{ label: '映え', icon: Camera, color: 'bg-purple-50 text-purple-600' },
];

/**
 * 旅行の条件を入力するためのフォームコンポーネント
 * ステップ形式でサクサク入力できるよ！📱✨
 */
export default function TravelForm({
	onSubmit,
}: {
	onSubmit: (data: TravelFormData) => Promise<void>;
}) {
	const [loading, setLoading] = useState(false);
	const [messageIndex, setMessageIndex] = useState(0);

	// ステップ管理用のステート (1〜5)
	const [step, setStep] = useState(1);
	const TOTAL_STEPS = 5;

	// フォームの入力値を管理するステート
	// ステップをまたいで値を保持するために必要だよ！
	const [formData, setFormData] = useState<Partial<TravelFormData>>({
		destination: '',
		duration: '1泊2日',
		timing: '',
		budget: 'そこそこ（普通）',
		companions: '友達',
		style: [],
		freeText: '',
	});

	// ローディングアニメーション
	useEffect(() => {
		if (!loading) return;

		const timer = setInterval(() => {
			setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
		}, 2500);

		return () => clearInterval(timer);
	}, [loading]);

	// 入力値が変わった時の処理
	const handleChange = <K extends keyof TravelFormData>(name: K, value: TravelFormData[K]) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// スタイルのチェックボックス用
	const handleStyleChange = (styleLabel: string) => {
		const currentStyles = formData.style || [];
		const newStyles = currentStyles.includes(styleLabel)
			? currentStyles.filter((s) => s !== styleLabel)
			: [...currentStyles, styleLabel];
		handleChange('style', newStyles);
	};

	// 次のステップへ
	const nextStep = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
	// 前のステップへ
	const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

	// 最後の送信処理
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// 最後のステップじゃなかったら送信しない！
		// これでEnterキー連打による誤送信を防ぐよ🛡️
		if (step < TOTAL_STEPS) return;

		setLoading(true);
		await onSubmit(formData as TravelFormData);
		setLoading(false);
		setMessageIndex(0);
	};

	return (
		<div className="w-full glass-card rounded-5xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative">
			
			<form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8 relative z-10">
				
				{/* ステップインジケーター (ドット) */}
				<div className="flex justify-center gap-3 mb-2">
					{Array.from({ length: TOTAL_STEPS }).map((_, index) => {
						const isCurrent = step === index + 1;
						const isPast = step > index + 1;
						
						return (
							<div
								key={index}
								className={`
									h-2.5 rounded-full transition-all duration-500 ease-out
									${isCurrent ? 'w-8 bg-sky-400 shadow-md shadow-sky-200' : 'w-2.5 bg-slate-200'}
									${isPast ? 'bg-sky-200' : ''}
								`}
							/>
						);
					})}
				</div>

				{/* ステップ1: 行き先 */}
				{step === 1 && (
					<div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
						<div className="text-center space-y-3 px-2">
							<h3 className="text-2xl md:text-3xl font-bold text-slate-700 flex flex-col items-center gap-4 text-balance leading-tight">
								<span className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-sm text-sky-400 ring-1 ring-slate-50">
									<MapPin className="w-10 h-10" />
								</span>
								どこに行きたい？
							</h3>
						</div>
						<div className="relative group">
							<input
								type="text"
								value={formData.destination}
								onChange={(e) => handleChange('destination', e.target.value)}
								placeholder="例：京都、フランス、沖縄..."
								className="w-full p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all outline-none text-xl text-center placeholder:text-slate-400 group-hover:bg-white/80"
								autoFocus
							/>
							<div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-200 to-cyan-200 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
						</div>
					</div>
				)}

				{/* ステップ2: 日程・時期 */}
				{step === 2 && (
					<div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
						<div className="text-center space-y-3">
							<h3 className="text-3xl font-bold text-slate-700 flex flex-col items-center gap-4">
								<span className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-sm text-sky-400 ring-1 ring-slate-50">
									<Calendar className="w-10 h-10" />
								</span>
								いつ、どれくらい？
							</h3>
						</div>

						<div className="space-y-6">
							<div className="space-y-2">
								<label className="text-sm font-bold text-slate-500 ml-1">
									何泊する？
								</label>
								<div className="relative group">
									<select
										value={formData.duration}
										onChange={(e) => handleChange('duration', e.target.value)}
										className="w-full p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all outline-none appearance-none cursor-pointer text-lg text-slate-700 group-hover:bg-white/80"
									>
										<option>日帰り</option>
										<option>1泊2日</option>
										<option>2泊3日</option>
										<option>3泊4日</option>
										<option>4泊5日以上</option>
									</select>
									<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
										▼
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-bold text-slate-500 ml-1">
									いつ頃行く？
								</label>
								<input
									type="text"
									value={formData.timing}
									onChange={(e) => handleChange('timing', e.target.value)}
									placeholder="例：10月下旬、GW、来年の夏..."
									className="w-full p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all outline-none text-lg text-slate-700 placeholder:text-slate-400"
								/>
							</div>
						</div>
					</div>
				)}

				{/* ステップ3: 予算・同行者 */}
				{step === 3 && (
					<div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
						<div className="text-center space-y-3">
							<h3 className="text-3xl font-bold text-slate-700 flex flex-col items-center gap-4">
								<span className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-sm text-sky-400 ring-1 ring-slate-50">
									<Wallet className="w-10 h-10" />
								</span>
								予算とメンバーは？
							</h3>
						</div>

						<div className="space-y-8">
							<div className="space-y-2">
								<label className="text-sm font-bold text-slate-500 ml-1">
									予算感
								</label>
								<div className="relative">
									<select
										value={formData.budget}
										onChange={(e) => handleChange('budget', e.target.value)}
										className="w-full p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all outline-none appearance-none cursor-pointer text-lg text-slate-700"
									>
										<option>なるべく安く</option>
										<option>そこそこ（普通）</option>
										<option>ちょっと贅沢</option>
										<option>お金に糸目はつけない</option>
									</select>
									<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
										▼
									</div>
								</div>
							</div>

							<div className="space-y-3">
								<label className="text-sm font-bold text-slate-500 ml-1">
									誰と行く？
								</label>
								<div className="grid grid-cols-2 gap-4">
									{COMPANION_OPTIONS.map((item) => (
										<div
											key={item.label}
											onClick={() => handleChange('companions', item.label)}
											className={`
												cursor-pointer flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group
												${
													formData.companions === item.label
														? 'bg-sky-50 border-sky-200 shadow-md scale-[1.02]'
														: 'bg-white/40 border-slate-100 hover:bg-white/60 hover:border-slate-200 hover:shadow-sm'
												}
											`}
										>
											<div className={`p-2.5 rounded-xl ${item.color} bg-opacity-10 shadow-sm`}>
												<item.icon className="w-5 h-5" />
											</div>
											<span className="font-bold text-sm text-slate-700">{item.label}</span>
											{formData.companions === item.label && (
												<div className="absolute right-3 top-1/2 -translate-y-1/2 bg-sky-400 text-white rounded-full p-1 shadow-lg shadow-sky-200">
													<CheckCircle2 className="w-3 h-3" />
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* ステップ4: 旅のスタイル */}
				{step === 4 && (
					<div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
						<div className="text-center space-y-3">
							<h3 className="text-3xl font-bold text-slate-700 flex flex-col items-center gap-4">
								<span className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-sm text-sky-400 ring-1 ring-slate-50">
									<Heart className="w-10 h-10" />
								</span>
								どんな旅にしたい？
							</h3>
							<p className="text-slate-400 text-sm">複数選んでね！</p>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							{STYLE_OPTIONS.map((item) => {
								const isSelected = formData.style?.includes(item.label);
								return (
									<div
										key={item.label}
										onClick={() => handleStyleChange(item.label)}
										className={`
											cursor-pointer flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 gap-3 text-center h-36 relative
											${
												isSelected
													? 'bg-gradient-to-br from-sky-50 to-white border-sky-200 shadow-md scale-[1.03]'
													: 'bg-white/40 border-slate-100 hover:bg-white/80 hover:shadow-lg hover:-translate-y-1'
											}
										`}
									>
										<div
											className={`p-3 rounded-full ${item.color} bg-opacity-10 ${
												isSelected ? 'scale-110 shadow-sm' : ''
											} transition-transform duration-300`}
										>
											<item.icon className="w-6 h-6" />
										</div>
										<span className={`font-bold text-sm ${isSelected ? 'text-sky-900' : 'text-slate-600'}`}>
											{item.label}
										</span>
										{isSelected && (
											<div className="absolute top-3 right-3 w-2 h-2 bg-sky-400 rounded-full shadow-lg shadow-sky-200" />
										)}
									</div>
								);
							})}
						</div>
					</div>
				)}

				{/* ステップ5: こだわり条件 */}
				{step === 5 && (
					<div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
						<div className="text-center space-y-3">
							<h3 className="text-3xl font-bold text-slate-700 flex flex-col items-center gap-4">
								<span className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-sm text-sky-400 ring-1 ring-slate-50">
									<Sparkles className="w-10 h-10" />
								</span>
								最後にこだわりを教えて！
							</h3>
						</div>
						<div className="relative group">
							<textarea
								value={formData.freeText}
								onChange={(e) => handleChange('freeText', e.target.value)}
								placeholder="例：海が見えるカフェに行きたい、歴史的な建物を中心に回りたい..."
								className="w-full p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all outline-none min-h-48 resize-none text-lg text-slate-700 placeholder:text-slate-400 leading-relaxed group-hover:bg-white/80"
								autoFocus
							/>
						</div>
					</div>
				)}

				{/* ナビゲーションボタン */}
				<div className="flex gap-4 pt-6">
					{step > 1 && (
						<button
							key="btn-prev"
							type="button"
							onClick={prevStep}
							disabled={loading}
							className="flex-1 py-4 rounded-2xl bg-white/50 hover:bg-white text-slate-500 font-bold border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-center gap-2 group"
						>
							<ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
							戻る
						</button>
					)}

					{step < TOTAL_STEPS ? (
						<button
							key="btn-next"
							type="button"
							onClick={nextStep}
							disabled={!formData.destination && step === 1}
							className="flex-2 py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 text-white font-bold shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none group"
						>
							次へ
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</button>
					) : (
						<button
							key="btn-submit"
							type="submit"
							disabled={loading}
							className="flex-2 py-4 px-4 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-[length:200%_200%] animate-gradient text-white font-bold shadow-lg shadow-sky-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden relative min-w-0"
						>
							{loading ? (
								<>
									<div className="absolute inset-0 bg-white/20 animate-pulse" />
									<Luggage className="w-5 h-5 animate-bounce relative z-10 shrink-0" />
									<span className="relative z-10 font-medium text-sm md:text-base truncate">
										{LOADING_MESSAGES[messageIndex]}
									</span>
								</>
							) : (
								<>
									<Sparkles className="w-5 h-5 animate-pulse shrink-0" />
									<span className="whitespace-nowrap">プランを作成！</span>
								</>
							)}
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
