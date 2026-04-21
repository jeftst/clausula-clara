"use client";

import { useMemo, useState } from "react";
import { LoadingState } from "@/components/loading-state";
import { ResultAttention } from "@/components/result-attention";
import { ResultHeader } from "@/components/result-header";
import { ResultQuestions } from "@/components/result-questions";
import { ResultSummary } from "@/components/result-summary";
import { ResultValues } from "@/components/result-values";
import { TextInputArea } from "@/components/text-input-area";
import { UploadArea } from "@/components/upload-area";
import { appLimits } from "@/lib/validators";
import type { AnalysisResult } from "@/lib/types";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const canSubmit = useMemo(() => {
    return Boolean(file || text.trim());
  }, [file, text]);

  async function handleAnalyze() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      }

      if (text.trim()) {
        formData.append("text", text.trim());
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Não foi possível analisar o contrato.");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setFile(null);
    setText("");
    setResult(null);
    setError("");
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      <section className="mb-8 rounded-[32px] bg-white/70 px-6 py-10 shadow-soft backdrop-blur md:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            Cláusula Clara
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Entenda seu contrato antes de assinar.
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Envie um contrato e receba uma explicação clara sobre prazos, valores,
            multas e pontos que merecem atenção.
          </p>
          <div className="mt-6 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            Análise informativa. Não substitui revisão jurídica profissional.
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <UploadArea fileName={file?.name} onChange={setFile} disabled={loading} />
        <TextInputArea value={text} onChange={setText} disabled={loading} />
      </section>

      <section className="mt-6 flex flex-col gap-3 md:flex-row">
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={!canSubmit || loading}
          className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Analisando contrato..." : "Analisar contrato"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Limpar
        </button>
      </section>

      <section className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
        Limites desta versão gratuita: {appLimits.acceptedFormatsLabel}, até {appLimits.maxFileSizeMb} MB
        por arquivo e até {appLimits.maxTextLength.toLocaleString("pt-BR")} caracteres por análise.
      </section>

      {error ? (
        <section className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </section>
      ) : null}

      {loading ? (
        <section className="mt-6">
          <LoadingState />
        </section>
      ) : null}

      {result ? (
        <section className="mt-8 space-y-6">
          <ResultHeader result={result} />
          <div className="grid gap-6 lg:grid-cols-2">
            <ResultValues values={result.valores_prazos} />
            <ResultSummary items={result.explicacao_simples} />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <ResultAttention title="Pontos de atenção" items={result.pontos_atencao} />
            <ResultQuestions items={result.perguntas_antes_de_assinar} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
