import type { RiskLevel } from "@/lib/types";

const styles: Record<RiskLevel, string> = {
  baixo: "bg-emerald-100 text-emerald-700",
  médio: "bg-amber-100 text-amber-700",
  alto: "bg-rose-100 text-rose-700"
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[level]}`}>
      Atenção {level}
    </span>
  );
}
