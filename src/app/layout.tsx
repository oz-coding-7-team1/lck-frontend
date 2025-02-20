import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Suspense } from "react";
import { AuthProvider } from '../context/AuthContext'; // ✅ AuthProvider 임포트

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider> {/* ✅ AuthProvider로 감싸줌 */}
            <Header />
            <Suspense>
              <main>{children}</main>
            </Suspense>
            <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
