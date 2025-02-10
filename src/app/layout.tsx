"use client";

import { Inter } from "next/font/google";
import "../styles/globals.css";
import AuthContext from "../context/AuthContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthContext>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthContext>
      </body>
    </html>
  );
}
