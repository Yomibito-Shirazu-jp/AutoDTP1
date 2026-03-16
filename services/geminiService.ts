
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this example, we'll rely on the environment variable being set.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateDraft = async (instructions: string) => {
  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: `以下の指示書に基づいて、DTP用の下書き原稿をMarkdown形式で生成してください。タイトル、見出し、本文、箇条書きなどを適切に使用してください。\n\n---\n指示書:\n${instructions}\n---`,
    });
    return response;
  } catch (error) {
    console.error("Error generating draft:", error);
    throw new Error("Failed to generate draft. Please check your API key and network connection.");
  }
};

export const editContent = async (content: string) => {
  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: `以下のMarkdown形式の原稿を校正・編集してください。誤字脱字、文法的な誤りを修正し、より自然でプロフェッショナルな文章にしてください。文体は統一し、敬語や語尾を適切に整形してください。修正後の原稿のみを返してください。\n\n---\n原文:\n${content}\n---`,
    });
    return response;
  } catch (error) {
    console.error("Error editing content:", error);
    throw new Error("Failed to edit content. Please check your API key and network connection.");
  }
};
