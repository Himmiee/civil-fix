import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#246BF5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "CivicFix | Report & Track Local Infrastructure Issues",
  description: "Empowering citizens to easily report, track, and resolve local community and infrastructure issues like potholes, broken streetlights, and damaged public spaces.",
  keywords: ["civic tech", "report potholes", "neighborhood repair", "local council reporter", "community reporting platform", "CivicFix"],
  authors: [{ name: "CivicFix Team" }],
  metadataBase: new URL("https://civilfix.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CivicFix | Report & Track Local Infrastructure Issues",
    description: "Empowering citizens to easily report, track, and resolve local community issues. Together, we build better neighborhoods.",
    url: "https://civilfix.com",
    siteName: "CivicFix",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivicFix | Resolve Neighborhood Issues",
    description: "Report potholes, broken lights, and neighborhood damage to local councils dynamically.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
