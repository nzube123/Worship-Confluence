import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import QueryProvider from "../components/provider/provider";

export const metadata: Metadata = {
  title: "Worship Confluence 2026 | Bride City i-Church",
  description:
    "Join Bride City i-Church for Worship Confluence 2026, a powerful gathering of worship, prophetic teaching, and community.",
  metadataBase: new URL("https://worship-confluence.vercel.app"),
  openGraph: {
    title: "Worship Confluence 2026 | Bride City i-Church",
    description:
      "Join Bride City i-Church for Worship Confluence 2026, a powerful gathering of worship, prophetic teaching, and community.",
    type: "website",
    url: "https://worship-confluence.vercel.app",
    siteName: "Worship Confluence 2026",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 1200,
        height: 630,
        alt: "Worship Confluence 2026 hero image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Worship Confluence 2026 | Bride City i-Church",
    description:
      "Join Bride City i-Church for Worship Confluence 2026, a powerful gathering of worship, prophetic teaching, and community.",
    images: [
      "https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-black text-white antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
