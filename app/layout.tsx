import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cláusula Clara",
  description: "IA para explicar contratos e alertar sobre riscos antes da assinatura."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
