import { buildPrompt } from "./prompt";
import type { AnalysisResult } from "./types";

function cleanJsonText(text: string): string {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

function normalizeResult(data: Partial<AnalysisResult>): AnalysisResult {
  return {
    tipo_documento: data.tipo_documento || "Não identificado no texto",
    resumo_simples: data.resumo_simples || "Não foi possível resumir o contrato.",
    valores_prazos: {
      valor_principal: data.valores_prazos?.valor_principal || "Não identificado no texto",
      vigencia: data.valores_prazos?.vigencia || "Não identificado no texto",
      reajuste: data.valores_prazos?.reajuste || "Não identificado no texto",
      multa: data.valores_prazos?.multa || "Não identificado no texto"
    },
    pontos_atencao: data.pontos_atencao?.length
      ? data.pontos_atencao
      : ["Nenhum ponto de atenção claro foi identificado nesta análise."],
    explicacao_simples: data.explicacao_simples?.length
      ? data.explicacao_simples
      : ["A IA não conseguiu gerar uma explicação simples com segurança."],
    perguntas_antes_de_assinar: data.perguntas_antes_de_assinar?.length
      ? data.perguntas_antes_de_assinar
      : ["Quais pontos deste contrato precisam de confirmação antes da assinatura?"],
    nivel_atencao:
      data.nivel_atencao === "baixo" ||
      data.nivel_atencao === "médio" ||
      data.nivel_atencao === "alto"
        ? data.nivel_atencao
        : "médio"
  };
}

async function analyzeWithGemini(prompt: string): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY não configurada.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro Gemini: ${errorText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("A IA não retornou conteúdo válido.");
  }

  return normalizeResult(JSON.parse(cleanJsonText(rawText)));
}

async function analyzeWithGroq(prompt: string): Promise<AnalysisResult> {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

  if (!apiKey) {
    throw new Error("GROQ_API_KEY não configurada.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro Groq: ${errorText}`);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content;

  if (!rawText) {
    throw new Error("A IA não retornou conteúdo válido.");
  }

  return normalizeResult(JSON.parse(cleanJsonText(rawText)));
}

export async function analyzeContractWithAI(text: string): Promise<AnalysisResult> {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  const prompt = buildPrompt(text);

  if (provider === "groq") {
    return analyzeWithGroq(prompt);
  }

  return analyzeWithGemini(prompt);
}
