import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Search } from 'lucide-react';
import Link from 'next/link';
import './globals.css';

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
        <header className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              CHOEAELOL
            </Link>
            <div className="relative">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="pl-4 pr-10 py-2 border rounded-full w-[240px]"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </header>
        <main>
          {children}
          {/* Removed test routing links */}
        </main>
        <footer className="mt-20 py-4 text-center text-sm text-gray-500">
          <p>&copy; 2025 CHOEALOL. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
