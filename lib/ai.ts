import { buildPrompt } from "./prompt";
import { AnalysisResult } from "./types";

export async function analyzeContractWithAI(
  text: string
): Promise<AnalysisResult> {
  const prompt = buildPrompt(text);

  try {
    console.log("Tentando Gemini...");
    return await callGemini(prompt);
  } catch (error) {
    console.warn("Gemini falhou, tentando Groq...");
    return await callGroq(prompt);
  }
}

// ================= GEMINI =================
async function callGemini(prompt: string): Promise<AnalysisResult> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Erro Gemini: ${JSON.stringify(data)}`);
  }

  const textResponse =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

  return safeJsonParse(textResponse);
}

// ================= GROQ =================
async function callGroq(prompt: string): Promise<AnalysisResult> {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Erro Groq: ${JSON.stringify(data)}`);
  }

  const textResponse = data.choices?.[0]?.message?.content || "{}";

  return safeJsonParse(textResponse);
}

// ================= JSON SAFE =================
function safeJsonParse(text: string): AnalysisResult {
  try {
    return JSON.parse(text);
  } catch {
    console.warn("JSON inválido, tentando corrigir...");

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  }
}