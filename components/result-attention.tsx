interface ResultAttentionProps {
  title: string;
  items: string[];
}

export function ResultAttention({ title, items }: ResultAttentionProps) {
  return (
    <div className="card p-6">
      <h3 className="section-title">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
