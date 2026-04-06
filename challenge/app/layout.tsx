import Footer from "@/shared/components/Footer";
import Header from "@/shared/components/Header";
import QueryProvider from "@/shared/providers/QueryProvider";
import { ToastProvider } from "@/shared/providers/Toast";
import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const metadataBase = new URL(siteUrl ?? "http://localhost:3000");

const defaultTitle = "GoLedger Challenge";
const defaultDescription =
  "A simple app to manage your TV shows and watchlists";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: defaultTitle,
    template: `%s | ${defaultTitle}`,
  },
  description: defaultDescription,
  applicationName: defaultTitle,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName: defaultTitle,
  },
  twitter: {
    card: "summary",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${firaCode.variable}`}>
      <body>
        <QueryProvider>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
