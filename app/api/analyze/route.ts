import { NextResponse } from "next/server";
import { analyzeContractWithAI } from "@/lib/ai";
import { extractTextFromFile } from "@/lib/extract-text";
import { validateFile, validateText } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("Iniciando análise...");

    const formData = await req.formData();
    const textInput = formData.get("text");
    const file = formData.get("file");

    let contractText = "";

    if (typeof textInput === "string" && textInput.trim()) {
      contractText = textInput.trim();
    }

    if (!contractText && file instanceof File) {
      validateFile(file);
      contractText = (await extractTextFromFile(file)).trim();
    }

    if (!contractText) {
      return NextResponse.json(
        { error: "Envie um arquivo ou cole o texto do contrato." },
        { status: 400 }
      );
    }

    validateText(contractText);

    const result = await analyzeContractWithAI(contractText);

    console.log("Análise concluída");

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro inesperado ao analisar o contrato.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
