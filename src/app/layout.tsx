import type { Metadata } from "next";
import { Josefin_Sans, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Ege Çam | Photography",
  description: "Photography portfolio by Ege Çam",
  icons: {
    icon: "/avatar-64.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${libreBaskerville.variable} antialiased`}
      >
        <div className="min-h-screen grid grid-cols-[280px_1fr]">
          {/* Left: Navigation */}
          <aside className="pt-[25vh] pb-16 px-12 flex flex-col min-h-screen">
            <Navigation />
          </aside>

          {/* Right: Main content (photos) */}
          <main className="py-20 pr-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
