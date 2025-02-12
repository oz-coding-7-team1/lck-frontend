import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AuthContext from "../context/AuthContext";
import { Suspense } from "react";

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
            <Suspense>
              <main>{children}</main>
            </Suspense>
          <Footer />
        </AuthContext>
      </body>
    </html>
  );
}
