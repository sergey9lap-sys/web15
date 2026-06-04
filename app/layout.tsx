import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Что запускать эксперту в 2026 году",
  description:
    "Бесплатная онлайн-встреча 15 июня о продуктах для экспертов и предпринимателей.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
