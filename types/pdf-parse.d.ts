declare module 'pdf-parse' {
  interface PDFParseResult {
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: unknown;
    version: string;
    text: string;
  }

  export default function pdfParse(dataBuffer: Buffer | Uint8Array): Promise<PDFParseResult>;
}
