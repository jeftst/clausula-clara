const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_TEXT_LENGTH = 20000;

const ALLOWED_TYPES = [
  "text/plain",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

export function validateFile(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Formato não suportado. Use PDF, DOCX ou TXT.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Arquivo muito grande. Limite de 2 MB.");
  }
}

export function validateText(text: string) {
  const cleanText = text?.trim() ?? "";

  if (cleanText.length < 100) {
    throw new Error("Texto insuficiente para análise. Cole um contrato mais completo.");
  }

  if (cleanText.length > MAX_TEXT_LENGTH) {
    throw new Error("Contrato muito grande para esta versão gratuita.");
  }
}

export const appLimits = {
  maxFileSizeMb: 2,
  maxTextLength: MAX_TEXT_LENGTH,
  acceptedFormatsLabel: "PDF, DOCX e TXT"
};
