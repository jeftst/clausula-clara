export function ResultSummary({ items }: { items: string[] }) {
  return (
    <div className="card p-6">
      <h3 className="section-title">Explicação simples</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
