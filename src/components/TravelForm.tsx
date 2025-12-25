'use client';

import { useState } from 'react';
import {
	MapPin,
	Calendar,
	Wallet,
	Users,
	Heart,
	Sparkles,
	Luggage,
} from 'lucide-react';
import { TravelFormData } from '@/types/plan';

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

			{/* 同行者選択：ラジオボタンでおしゃれに選べるようにしたよ */}
			<div className="space-y-3">
				<label className="flex items-center gap-2 text-lg font-bold text-foreground">
					<Users className="text-primary" />
					誰と行く？
				</label>
				<div className="flex flex-wrap gap-3">
					{['一人旅', '友達', 'カップル/夫婦', '家族'].map((item) => (
						<label key={item} className="cursor-pointer group">
							<input
								type="radio"
								name="companions"
								value={item}
								className="hidden peer"
								defaultChecked={item === '友達'}
							/>
							<span className="block px-6 py-3 rounded-full bg-accent/30 peer-checked:bg-primary peer-checked:text-white transition-all hover:bg-accent/50">
								{item}
							</span>
						</label>
					))}
				</div>
			</div>

			{/* 旅のスタイル選択：複数選べるチェックボックス形式！ */}
			<div className="space-y-3">
				<label className="flex items-center gap-2 text-lg font-bold text-foreground">
					<Heart className="text-primary" />
					どんな旅にしたい？
				</label>
				<div className="flex flex-wrap gap-3">
					{[
						'のんびり',
						'アクティブ',
						'グルメ',
						'観光名所',
						'穴場スポット',
						'映え',
					].map((item) => (
						<label key={item} className="cursor-pointer">
							<input
								type="checkbox"
								name="style"
								value={item}
								className="hidden peer"
							/>
							<span className="block px-6 py-3 rounded-full bg-accent/30 peer-checked:bg-secondary peer-checked:text-secondary-foreground border-2 border-transparent peer-checked:border-primary/20 transition-all hover:bg-accent/50">
								{item}
							</span>
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
        ローディング中はカバンが揺れる（予定）の可愛いアニメーションになるよ 
      */}
			<button
				type="submit"
				disabled={loading}
				className="w-full py-5 rounded-2xl bg-linear-to-r from-primary to-cyan-400 text-white font-bold text-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
			>
				{loading ? (
					<>
						<Luggage className="animate-bounce" />{' '}
						{/* カバンが弾むアニメーション！ */}
						最高のプランを考え中...
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
