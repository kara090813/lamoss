import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaMoss Tech - 기술로 채우는 일상의 빈틈",
  description:
    "거대기업들이 놓친 작은 불편함들을 기술로 해결하는 테크 스타트업. Engineering Solutions in Life's Gaps.",
  keywords: ["LaMoss Tech", "라모스테크", "AI", "모바일앱", "스타트업"],
  openGraph: {
    title: "LaMoss Tech",
    description: "기술로 채우는 일상의 빈틈, 혁신으로 만드는 더 나은 삶",
    url: "https://www.lamoss.net",
    siteName: "LaMoss Tech",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
