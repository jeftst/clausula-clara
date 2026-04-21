import type { ValuesAndDeadlines } from "@/lib/types";

const labels: Array<{ key: keyof ValuesAndDeadlines; title: string }> = [
  { key: "valor_principal", title: "Valor principal" },
  { key: "vigencia", title: "Vigência" },
  { key: "reajuste", title: "Reajuste" },
  { key: "multa", title: "Multa" }
];

export function ResultValues({ values }: { values: ValuesAndDeadlines }) {
  return (
    <div className="card p-6">
      <h3 className="section-title">Valores e prazos</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {labels.map(({ key, title }) => (
          <div key={key} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{values[key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
