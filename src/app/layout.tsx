import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AuthContext from "../context/AuthContext";
import { Suspense } from "react";
import SideMenu from "@/src/components/SideMenu";

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
          <div className="flex">
            <SideMenu />
            <Suspense>
              <main className="flex-1 p-4">{children}</main>
            </Suspense>
          </div>
          <Footer />
        </AuthContext>
      </body>
    </html>
  );
}
