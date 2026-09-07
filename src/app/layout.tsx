import type { Metadata } from "next";
import "@/styles.css";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Harsh — .NET Developer Portfolio",
  description:
    "Harsh is a .NET Developer building efficient, scalable web applications with C#, .NET, MySQL and Next.js. See selected work, skills and certification.",
  authors: [{ name: "Harsh" }],
  keywords: ["Harsh", ".NET Developer", "C#", "MySQL", "Next.js", "Full Stack Developer", "Portfolio"],
  openGraph: {
    title: "Harsh — .NET Developer Portfolio",
    description:
      "Harsh is a .NET Developer building efficient, scalable web applications with C#, .NET, MySQL and Next.js.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh — .NET Developer Portfolio",
    description:
      "Harsh is a .NET Developer building efficient, scalable web applications with C#, .NET, MySQL and Next.js.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Caveat:wght@600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
        <PortfolioProvider>
          {children}
          <Toaster position="top-right" richColors />
        </PortfolioProvider>
      </body>
    </html>
  );
}
