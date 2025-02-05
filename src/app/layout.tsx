import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Search, User, Menu } from 'lucide-react';
import Link from 'next/link';
import '../styles/globals.css'; // Ensure this path is correct

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CHOEAELOL',
  description: '당신의 최애 선수에게 투표하세요',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <header className="border-b bg-gray-50">
          <div className="container flex items-center justify-between h-16 px-4 mx-auto">
            <Link href="/" className="text-xl font-bold text-rose-500">
              CHOEAELOL
            </Link>
            <div className="flex-1 max-w-xl px-4 mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full py-2 pl-4 pr-10 bg-gray-100 border border-gray-200 rounded-full"
                />
                <button className="absolute -translate-y-1/2 right-3 top-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/mypage">
                <User className="w-6 h-6 text-gray-600" />
              </Link>
              <button>
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="py-2 mb-1 text-sm text-center text-gray-400">
          {/* Adjusted padding and margin */}
          <p>&copy; 2025 CHOEAELOL. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
