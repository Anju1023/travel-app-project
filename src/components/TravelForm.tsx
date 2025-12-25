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

// ローディング中に表示する「実況メッセージ」のリストだよ！
const LOADING_MESSAGES = [
	'最高のプランを考え中...',
	'現地の美味しいカフェを探しています...☕️',
	'映えスポットを厳選中...📸',
	'移動ルートを計算しています...🗺️',
	'地元の隠れ家スポットを調査中...🤫',
	'おすすめの宿泊先をピックアップ中...🏨',
	'旅のしおりを執筆中...✍️',
	'ワクワクする体験を詰め込み中...✨',
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
		let timer: NodeJS.Timeout;
		if (loading) {
			timer = setInterval(() => {
				setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
			}, 2500);
		} else {
			setMessageIndex(0);
		}
		return () => clearInterval(timer);
	}, [loading]);

	// 入力値が変わった時の処理
	const handleChange = (name: keyof TravelFormData, value: any) => {
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
	};

	// 進捗バーの幅を計算
	const progressWidth = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

	return (
		<div className="w-full bg-white rounded-3xl shadow-lg border border-secondary/50 overflow-hidden">
			{/* プログレスバー */}
			<div className="w-full h-2 bg-secondary/30">
				<div 
					className="h-full bg-primary transition-all duration-500 ease-out"
					style={{ width: `${progressWidth}%` }}
				/>
			</div>

			<form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
				
				{/* ステップ1: 行き先 */}
				{step === 1 && (
					<div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
						<div className="text-center space-y-2">
							<span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 1</span>
							<h3 className="text-2xl font-bold flex items-center justify-center gap-2">
								<MapPin className="text-primary w-8 h-8" />
								どこに行きたい？
							</h3>
						</div>
						<input
							type="text"
							value={formData.destination}
							onChange={(e) => handleChange('destination', e.target.value)}
							placeholder="例：京都、フランス、沖縄..."
							className="w-full p-6 bg-accent/30 rounded-2xl border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none text-xl text-center placeholder:text-muted-foreground/50"
							autoFocus
						/>
					</div>
				)}

				{/* ステップ2: 日程・時期 */}
				{step === 2 && (
					<div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
						<div className="text-center space-y-2">
							<span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 2</span>
							<h3 className="text-2xl font-bold flex items-center justify-center gap-2">
								<Calendar className="text-primary w-8 h-8" />
								いつ、どれくらい？
							</h3>
						</div>
						
						<div className="space-y-4">
							<div className="space-y-2">
								<label className="font-bold text-muted-foreground ml-2">何泊する？</label>
								<div className="relative">
									<select
										value={formData.duration}
										onChange={(e) => handleChange('duration', e.target.value)}
										className="w-full p-4 bg-accent/30 rounded-2xl border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none appearance-none cursor-pointer text-lg"
									>
										<option>日帰り</option>
										<option>1泊2日</option>
										<option>2泊3日</option>
										<option>3泊4日</option>
										<option>4泊5日以上</option>
									</select>
									<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▼</div>
								</div>
							</div>

							<div className="space-y-2">
								<label className="font-bold text-muted-foreground ml-2">いつ頃行く？</label>
								<input
									type="text"
									value={formData.timing}
									onChange={(e) => handleChange('timing', e.target.value)}
									placeholder="例：10月下旬、GW、来年の夏..."
									className="w-full p-4 bg-accent/30 rounded-2xl border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none text-lg"
								/>
							</div>
						</div>
					</div>
				)}

				{/* ステップ3: 予算・同行者 */}
				{step === 3 && (
					<div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
						<div className="text-center space-y-2">
							<span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 3</span>
							<h3 className="text-2xl font-bold flex items-center justify-center gap-2">
								<Wallet className="text-primary w-8 h-8" />
								予算とメンバーは？
							</h3>
						</div>

						<div className="space-y-6">
							<div className="space-y-2">
								<label className="font-bold text-muted-foreground ml-2">予算感</label>
								<div className="relative">
									<select
										value={formData.budget}
										onChange={(e) => handleChange('budget', e.target.value)}
										className="w-full p-4 bg-accent/30 rounded-2xl border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none appearance-none cursor-pointer text-lg"
									>
										<option>なるべく安く</option>
										<option>そこそこ（普通）</option>
										<option>ちょっと贅沢</option>
										<option>お金に糸目はつけない</option>
									</select>
									<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">▼</div>
								</div>
							</div>

							<div className="space-y-2">
								<label className="font-bold text-muted-foreground ml-2">誰と行く？</label>
								<div className="grid grid-cols-2 gap-3">
									{COMPANION_OPTIONS.map((item) => (
										<div 
											key={item.label}
											onClick={() => handleChange('companions', item.label)}
											className={`
												cursor-pointer flex items-center gap-3 p-4 rounded-2xl border-2 transition-all
												${formData.companions === item.label 
													? 'bg-primary/10 border-primary shadow-sm' 
													: 'bg-accent/10 border-transparent hover:bg-accent/20'}
											`}
										>
											<div className={`p-2 rounded-xl ${item.color}`}>
												<item.icon className="w-5 h-5" />
											</div>
											<span className="font-bold text-sm">{item.label}</span>
											{formData.companions === item.label && <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* ステップ4: 旅のスタイル */}
				{step === 4 && (
					<div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
						<div className="text-center space-y-2">
							<span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 4</span>
							<h3 className="text-2xl font-bold flex items-center justify-center gap-2">
								<Heart className="text-primary w-8 h-8" />
								どんな旅にしたい？
							</h3>
							<p className="text-muted-foreground text-sm">複数選んでね！</p>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
							{STYLE_OPTIONS.map((item) => {
								const isSelected = formData.style?.includes(item.label);
								return (
									<div 
										key={item.label}
										onClick={() => handleStyleChange(item.label)}
										className={`
											cursor-pointer flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 text-center h-32
											${isSelected
												? 'bg-secondary/30 border-primary/50 shadow-sm' 
												: 'bg-accent/10 border-transparent hover:bg-accent/20'}
										`}
									>
										<div className={`p-3 rounded-full ${item.color} ${isSelected ? 'scale-110' : ''} transition-transform`}>
											<item.icon className="w-6 h-6" />
										</div>
										<span className="font-bold text-sm">{item.label}</span>
									</div>
								);
							})}
						</div>
					</div>
				)}

				{/* ステップ5: こだわり条件 */}
				{step === 5 && (
					<div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
						<div className="text-center space-y-2">
							<span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">STEP 5</span>
							<h3 className="text-2xl font-bold flex items-center justify-center gap-2">
								<Sparkles className="text-primary w-8 h-8" />
								最後にこだわりを教えて！
							</h3>
						</div>
						<textarea
							value={formData.freeText}
							onChange={(e) => handleChange('freeText', e.target.value)}
							placeholder="例：海が見えるカフェに行きたい、歴史的な建物を中心に回りたい..."
							className="w-full p-6 bg-accent/30 rounded-2xl border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none min-h-40 resize-none text-lg"
							autoFocus
						/>
					</div>
				)}

				{/* ナビゲーションボタン */}
				<div className="flex gap-4 pt-4">
					{step > 1 && (
						<button
							type="button"
							onClick={prevStep}
							disabled={loading}
							className="flex-1 py-4 rounded-2xl bg-muted text-muted-foreground font-bold hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
						>
							<ArrowLeft className="w-5 h-5" />
							戻る
						</button>
					)}
					
					{step < TOTAL_STEPS ? (
						<button
							type="button"
							onClick={nextStep}
							disabled={!formData.destination && step === 1} // 行き先未入力なら進めない
							className="flex-[2] py-4 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							次へ
							<ArrowRight className="w-5 h-5" />
						</button>
					) : (
						<button
							type="submit"
							disabled={loading}
							className="flex-[2] py-4 rounded-2xl bg-linear-to-r from-primary to-cyan-400 text-white font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
						>
							{loading ? (
								<>
									<Luggage className="animate-bounce" />
									<span className="animate-pulse">{LOADING_MESSAGES[messageIndex]}</span>
								</>
							) : (
								<>
									<Sparkles className="animate-pulse" />
									プランを作成！
								</>
							)}
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
