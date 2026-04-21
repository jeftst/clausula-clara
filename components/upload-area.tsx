interface UploadAreaProps {
  fileName?: string;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

export function UploadArea({ fileName, onChange, disabled }: UploadAreaProps) {
  return (
    <div className="card p-6">
      <div className="mb-4">
        <h2 className="section-title">Enviar contrato</h2>
        <p className="muted mt-1">Aceita PDF, DOCX e TXT de até 2 MB.</p>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-brand-500 hover:bg-brand-50">
        <span className="text-sm font-medium text-slate-700">
          Clique para selecionar um arquivo
        </span>
        <span className="mt-2 text-xs text-slate-500">
          Ideal para contratos com texto selecionável
        </span>
        <input
          type="file"
          className="hidden"
          accept=".pdf,.docx,.txt,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          disabled={disabled}
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        />
      </label>

      <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        {fileName ? `Arquivo selecionado: ${fileName}` : "Nenhum arquivo selecionado."}
      </div>
    </div>
  );
}
