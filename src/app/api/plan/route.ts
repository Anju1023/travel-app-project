import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { TravelFormData, PlanDataSchema } from '@/types/plan';
import { ZodError } from 'zod';

// Google Generative AI SDKを初期化するよ！
// APIキーは安全のために .env.local に隠してあるの。process.env で呼び出すよ。
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * 旅行プランを生成するAPIエンドポイント (POST /api/plan)
 * フロントエンド（あんじゅが触る画面）からのお願いを受け取って、AIにパスする役割だよ。
 */
export async function POST(request: Request) {
  try {
    // APIキーがないと動かないから、最初にお仕置き...じゃなくてチェックするね！
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'APIキーが設定されていません。.env.localを確認してね！' },
        { status: 500 }
      );
    }

    // 画面から送られてきた「行き先」や「予算」などのデータを取り出すよ
    const body: TravelFormData = await request.json();
    const { destination, duration, timing, budget, companions, style, freeText } = body;

    /**
     * Geminiに渡すための「魔法の呪文（プロンプト）」を組み立てるよ！
     * ここで「JSONで返してね」ってお願いするのが、アプリを壊さないための最大のコツなんだ。
     */
    const prompt = `
あなたはプロの旅行プランナーです。以下の条件に基づいて、最高の旅行プランを作成してください。
出力は必ずJSON形式のみとし、マークダウンのコードブロック(\`\`\`json ... \`\`\`)で囲まないで、生のリテラルJSONのみを返してください。

## 旅行条件
- 行き先: ${destination}
- 日程: ${duration}
- 旅行時期: ${timing || '指定なし'}
- 予算: ${budget}
- 同行者: ${companions}
- 旅行スタイル: ${style.join(', ')}
- その他要望: ${freeText || '特になし'}

## 重要：時期についての考慮
指定された「旅行時期」を考慮して、以下のような提案を行ってください：
- その季節ならではの観光スポット（例：桜、紅葉、雪景色、ビーチなど）
- その時期に開催されるイベントや祭りがあれば盛り込む
- 気候に合った活動（屋内・屋外）
- シーズンによる混雑具合やホテルの価格傾向のアドバイス（説明文の中に含める）

## 出力フォーマット (JSON)
以下のJSON構造を厳守してください：
{
  "title": "プランの魅力的なタイトル（季節感を入れて）",
  "days": [
    {
      "day": 1,
      "schedule": [
        {
          "time": "HH:MM",
          "place": "場所の名前",
          "description": "そこでの過ごし方や見どころを1文で。"
        }
      ]
    }
  ],
  "hotels": [
    {
      "name": "ホテル名",
      "area": "エリア名",
      "price": "1泊あたりの目安価格",
      "features": ["特徴1", "特徴2", "特徴3"]
    }
  ]
}

## 制約事項
- 日程は指定された日数分作成してください。
- タイムラインは現実的な移動時間を考慮してください。
- 宿泊先は予算感に合ったものを1〜2軒提案してください。
- 文体は「〜です、〜ます」調で、楽しそうな雰囲気にしてください。
`;

    /**
     * 最新の Gemini 3.0 Flash モデルを使用するよ！
     * responseMimeType: "application/json" を指定することで、
     * AIがうっかり余計なしゃべりを入れないように制御しているんだ。
     */
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview', 
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    // AIに「これ読んでプラン作って！」ってお願いするよ。ドキドキ...
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    /**
     * AIがたまに「```json ... ```」をつけてくることがあるから、
     * 念のためにそれをお掃除する処理だよ！
     */
    text = text.replace(/^```(json)?\n/, '').replace(/\n```$/, '');

    // まずは単純にJSONとしてパースできるかチェック
    let rawData;
    try {
      rawData = JSON.parse(text);
    } catch {
      throw new Error('AIが生成したデータが壊れていたみたい...。もう一回試してみて！');
    }

    // ここでZod先生の登場！データの中身が正しいか厳しくチェックしてもらうよ🛡️
    const planData = PlanDataSchema.parse(rawData);

    // 最後に、完成したプランをあんじゅの画面に送り返すよ！
    return NextResponse.json(planData);

  } catch (error: unknown) {
    console.error('API Error:', error);

    // Zodのチェックで引っかかった場合のエラー処理
    if (error instanceof ZodError) {
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       console.error('Validation Error Details:', (error as any).errors);
       return NextResponse.json(
        { error: '生成されたプランデータの形がおかしいみたい。ごめんね、もう一度試してくれる？' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: (error as Error).message || '旅行プランの生成中にエラーが発生しました。時間を置いて試してみてね！' },
      { status: 500 }
    );
  }
}