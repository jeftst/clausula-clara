interface TextInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TextInputArea({ value, onChange, disabled }: TextInputAreaProps) {
  return (
    <div className="card p-6">
      <div className="mb-4">
        <h2 className="section-title">Ou cole o texto do contrato</h2>
        <p className="muted mt-1">Útil quando o arquivo não está em formato textual.</p>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        placeholder="Cole aqui o conteúdo do contrato para análise..."
        className="min-h-[260px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}
