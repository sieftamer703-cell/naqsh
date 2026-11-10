import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NAQSH | نقش — فن يصنع هوية المكان",
    template: "%s | NAQSH نقش",
  },
  description:
    "NAQSH | نقش — براند مصري متخصص في تابلوهات وديكورات الحائط للأفراد وتجار الجملة. فن يصنع هوية المكان.",
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "NAQSH | نقش",
    description: "فن يصنع هوية المكان — تابلوهات وديكورات حائط.",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@300;400;600;700;800&family=Reem+Kufi:wght@400;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
