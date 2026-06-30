import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = "https://w3nbo.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "W3nbo Xu — AI Product Creator",
    template: "%s | W3nbo Xu",
  },
  description:
    "市场营销 × 人工智能双学科背景。从数据洞察到产品落地，用 AI 驱动 MVP 快速验证，将复杂技术转化为直观体验。",
  keywords: [
    "AI Product Manager",
    "AI产品经理",
    "数据驱动",
    "MVP",
    "全栈开发",
    "机器学习",
    "NLP",
    "用户研究",
    "W3nbo Xu",
  ],
  authors: [{ name: "W3nbo Xu" }],
  creator: "W3nbo Xu",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "W3nbo Xu — AI Product Creator",
    title: "W3nbo Xu — AI Product Creator",
    description:
      "市场营销 × 人工智能双学科背景。从数据洞察到产品落地，用 AI 驱动 MVP 快速验证，将复杂技术转化为直观体验。",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "W3nbo Xu — AI Product Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "W3nbo Xu — AI Product Creator",
    description:
      "市场营销 × 人工智能双学科背景。从数据洞察到产品落地，用 AI 驱动 MVP 快速验证。",
    images: [`${siteUrl}/og-image.png`],
    creator: "@w3nbo",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className={`${inter.className} overflow-x-hidden`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
