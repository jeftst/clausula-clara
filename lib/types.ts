export type RiskLevel = "baixo" | "médio" | "alto";

export interface ValuesAndDeadlines {
  valor_principal: string;
  vigencia: string;
  reajuste: string;
  multa: string;
}

export interface AnalysisResult {
  tipo_documento: string;
  resumo_simples: string;
  valores_prazos: ValuesAndDeadlines;
  pontos_atencao: string[];
  explicacao_simples: string[];
  perguntas_antes_de_assinar: string[];
  nivel_atencao: RiskLevel;
}
