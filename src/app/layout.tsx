import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import { Sidebar, TopNav } from "@/components/dashboard/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZorvynPay | Finance Dashboard",
  description: "Modern Finance Dashboard Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased selection:bg-primary/20">
        <AppProvider>
          <div className="flex bg-background transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen">
              <TopNav />
              <main className="flex-1 overflow-x-hidden p-6 lg:p-10">
                {children}
              </main>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
