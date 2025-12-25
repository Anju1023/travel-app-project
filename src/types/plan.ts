import { z } from 'zod';

export type TravelFormData = {
  destination: string;
  duration: string;
  timing: string; // いつ頃行くか（例：10月、来年の夏、12/24〜 など）
  budget: string;
  companions: string;
  style: string[];
  freeText?: string;
};

// --- Zod Schema Definitions ---

// 1日のスケジュールのスキーマ
const DayScheduleSchema = z.object({
  time: z.string(),
  place: z.string(),
  description: z.string(),
  lat: z.number(), // 緯度を追加！📍
  lng: z.number(), // 経度を追加！📍
});

// 1日のスキーマ
const DayPlanSchema = z.object({
  day: z.number(),
  schedule: z.array(DayScheduleSchema),
});

// ホテル情報のスキーマ
const HotelSchema = z.object({
  name: z.string(),
  area: z.string(),
  price: z.string(),
  features: z.array(z.string()),
  lat: z.number(), // ホテルの緯度📍
  lng: z.number(), // ホテルの経度📍
});

// 全体のプランデータのスキーマ
// これが「AIからのレスポンス」の正解の形だよ！
export const PlanDataSchema = z.object({
  title: z.string(),
  days: z.array(DayPlanSchema),
  hotels: z.array(HotelSchema),
});

// スキーマから型を自動生成！
// これで手書きの型定義とはおさらばできるよ✨
export type PlanData = z.infer<typeof PlanDataSchema>;