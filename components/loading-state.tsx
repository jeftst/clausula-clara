export function LoadingState() {
  return (
    <div className="card flex items-center gap-4 p-6">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
      <div>
        <p className="font-semibold text-slate-900">Analisando cláusulas...</p>
        <p className="muted mt-1">
          Traduzindo o contrato para uma linguagem mais simples.
        </p>
      </div>
    </div>
  );
}
