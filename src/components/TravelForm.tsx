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
 * ここで集めたデータをAPIに送って、プランを作ってもらうんだよ！
 */
export default function TravelForm({
	onSubmit,
}: {
	onSubmit: (data: TravelFormData) => Promise<void>;
}) {
	// 通信中（プラン考え中）かどうかを管理するステートだよ
	const [loading, setLoading] = useState(false);
	// ローディング中に表示するメッセージのインデックス
	const [messageIndex, setMessageIndex] = useState(0);

	// ローディング中にメッセージをパラパラ切り替えるためのタイマー設定！
	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (loading) {
			timer = setInterval(() => {
				setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
			}, 2500); // 2.5秒ごとに切り替えるよ
		} else {
			setMessageIndex(0); // 終わったら最初に戻しておくね
		}
		return () => clearInterval(timer);
	}, [loading]);

	/**
	 * フォームの「プランを作る」ボタンが押された時の処理
	 */
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // ページがリロードされないようにストップ！
		setLoading(true); // ローディング開始！

		// フォームに入力された値をまるっと取得するよ
		const formData = new FormData(e.currentTarget);
		const data: TravelFormData = {
			destination: formData.get('destination') as string,
			duration: formData.get('duration') as string,
			timing: formData.get('timing') as string, // 時期の情報もゲット！
			budget: formData.get('budget') as string,
			companions: formData.get('companions') as string,
			style: formData.getAll('style') as string[],
			freeText: formData.get('freeText') as string, // あんじゅのこだわり条件もしっかりキャッチ！
		};

		// 親コンポーネント（Home）にデータを渡して、APIを叩いてもらうよ
		await onSubmit(data);
		setLoading(false); // 終わったらローディング解除！
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full space-y-8 bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-secondary/50"
		>
			{/* 行き先入力：どこに行きたいか自由に書いてもらうよ */}
			<div className="space-y-3">
				<label className="flex items-center gap-2 text-lg font-bold text-foreground">
					<MapPin className="text-primary" />
					どこに行きたい？
				</label>
				<input
					type="text"
					name="destination"
					placeholder="例：京都、フランス、沖縄..."
					className="w-full p-4 bg-accent/30 rounded-2xl border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none text-lg"
					required
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* 日数選択：プルダウンで選べるようにして入力を楽に！ */}
				<div className="space-y-3">
					<label className="flex items-center gap-2 text-lg font-bold text-foreground">
						<Calendar className="text-primary" />
						何泊する？
					</label>
					<div className="relative">
						<select
							name="duration"
							className="w-full p-4 bg-accent/30 rounded-2xl border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
						>
							<option>日帰り</option>
							<option>1泊2日</option>
							<option>2泊3日</option>
							<option>3泊4日</option>
							<option>4泊5日以上</option>
						</select>
						<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
							▼
						</div>
					</div>
				</div>

				{/* 時期入力：いつ行くかを追加！ */}
				<div className="space-y-3">
					<label className="flex items-center gap-2 text-lg font-bold text-foreground">
						<Calendar className="text-primary" />
						いつ頃行く？
					</label>
					<input
						type="text"
						name="timing"
						placeholder="例：10月下旬、GW、来年の夏..."
						className="w-full p-4 bg-accent/30 rounded-2xl border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none"
					/>
				</div>
			</div>

			{/* 予算選択：ざっくりした予算感を聞くよ */}
			<div className="space-y-3">
				<label className="flex items-center gap-2 text-lg font-bold text-foreground">
					<Wallet className="text-primary" />
					予算はどれくらい？
				</label>
				<div className="relative">
					<select
						name="budget"
						className="w-full p-4 bg-accent/30 rounded-2xl border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
					>
						<option>なるべく安く</option>
						<option>そこそこ（普通）</option>
						<option>ちょっと贅沢</option>
						<option>お金に糸目はつけない</option>
					</select>
					<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
						▼
					</div>
				</div>
			</div>

			{/* 同行者選択：アイコン付きのカード形式でおしゃれに！ */}
			<div className="space-y-3">
				<label className="flex items-center gap-2 text-lg font-bold text-foreground">
					<Users className="text-primary" />
					誰と行く？
				</label>
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
					{COMPANION_OPTIONS.map((item) => (
						<label key={item.label} className="cursor-pointer group">
							<input
								type="radio"
								name="companions"
								value={item.label}
								className="hidden peer"
								defaultChecked={item.label === '友達'}
							/>
							<div className={`
								flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all h-full gap-2
								bg-accent/10 border-transparent
								peer-checked:bg-primary/5 peer-checked:border-primary peer-checked:shadow-md
								hover:bg-accent/20
							`}>
								<div className={`p-2 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
									<item.icon className="w-6 h-6" />
								</div>
								<span className="text-sm font-bold text-center">{item.label}</span>
							</div>
						</label>
					))}
				</div>
			</div>

			{/* 旅のスタイル選択：アイコンカードのチェックボックス！ */}
			<div className="space-y-3">
				<label className="flex items-center gap-2 text-lg font-bold text-foreground">
					<Heart className="text-primary" />
					どんな旅にしたい？
				</label>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
					{STYLE_OPTIONS.map((item) => (
						<label key={item.label} className="cursor-pointer group">
							<input
								type="checkbox"
								name="style"
								value={item.label}
								className="hidden peer"
							/>
							<div className={`
								flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all h-full gap-2
								bg-accent/10 border-transparent
								peer-checked:bg-secondary/20 peer-checked:border-primary/40 peer-checked:shadow-md
								hover:bg-accent/20
							`}>
								<div className={`p-2 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
									<item.icon className="w-6 h-6" />
								</div>
								<span className="text-sm font-bold text-center">{item.label}</span>
							</div>
						</label>
					))}
				</div>
			</div>

			{/* こだわり条件：自由入力欄だよ！ */}
			<div className="space-y-3">
				<label className="flex items-center gap-2 text-lg font-bold text-foreground">
					<Sparkles className="text-primary" />
					こだわり条件はある？（任意）
				</label>
				<textarea
					name="freeText"
					placeholder="例：海が見えるカフェに行きたい、歴史的な建物を中心に回りたい..."
					className="w-full p-4 bg-accent/30 rounded-2xl border-2 border-transparent focus:border-primary/50 focus:bg-white transition-all outline-none min-h-25 resize-none"
				/>
			</div>

			{/* 
        運命の生成ボタン！
        ローディング中はメッセージがパラパラ変わって、カバンが弾むよ 👜✨
      */}
			<button
				type="submit"
				disabled={loading}
				className="w-full py-5 rounded-2xl bg-linear-to-r from-primary to-cyan-400 text-white font-bold text-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
			>
				{loading ? (
					<>
						<Luggage className="animate-bounce" />
						<span className="animate-pulse">{LOADING_MESSAGES[messageIndex]}</span>
					</>
				) : (
					<>
						<Sparkles className="animate-pulse" />
						プランを作ってもらう！
					</>
				)}
			</button>
		</form>
	);
}
