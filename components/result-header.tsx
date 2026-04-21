import type { AnalysisResult } from "@/lib/types";
import { RiskBadge } from "./risk-badge";

export function ResultHeader({ result }: { result: AnalysisResult }) {
  return (
    <div className="card p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
            Visão geral
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">{result.tipo_documento}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {result.resumo_simples}
          </p>
        </div>
        <RiskBadge level={result.nivel_atencao} />
      </div>
    </div>
  );
}
