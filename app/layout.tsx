import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./lib/NextAuthProvider";
import RecoilContextProvider from "./lib/RecoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scheduler",
  description: "Created By Sheninth Jr",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilContextProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
