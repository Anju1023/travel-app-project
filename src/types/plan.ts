export type TravelFormData = {
  destination: string;
  duration: string;
  timing: string; // いつ頃行くか（例：10月、来年の夏、12/24〜 など）
  budget: string;
  companions: string;
  style: string[];
  freeText?: string;
};

export type PlanData = {
  title: string;
  days: {
    day: number;
    schedule: {
      time: string;
      place: string;
      description: string;
    }[];
  }[];
  hotels: {
    name: string;
    area: string;
    price: string;
    features: string[];
  }[];
};