import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth.context";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SlashURL - Free URL Shortener & Link Management Platform",
  
  description:
    "Shorten long URLs into simple, shareable links with SlashURL. Create, manage, track, and organize your short links from one powerful dashboard.",

  keywords: [
    "URL shortener",
    "free URL shortener",
    "URL shortening service",
    "short URL",
    "short link generator",
    "link shortener",
    "long URL shortener",
    "custom short links",
    "link management",
    "URL management",
    "short link generator",
    "URL analytics",
    "link tracking",
    "click tracking",
    "link sharing",
    "shortened URLs",
    "create short URLs",
    "manage short links",
    "track short links",
    "online URL shortener",
  ],

  authors: [
    {
      name: "SlashURL",
    },
  ],

  creator: "SlashURL",
  publisher: "SlashURL",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster 
              position="top-right"
              richColors
              closeButton
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
