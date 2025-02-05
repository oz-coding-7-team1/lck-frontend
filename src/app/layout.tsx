'use client';

import { Inter } from 'next/font/google';
import { Search, User, Menu } from 'lucide-react';
import Link from 'next/link';
import '../styles/globals.css'; // Ensure this path is correct
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const mockData = [
  { name: 'FAKER', koreanName: '이상혁' },
  { name: 'CHOVY', koreanName: '정지훈' },
  { name: 'GUMAYUSI', koreanName: '이민형' },
  { name: 'KERIA', koreanName: '류민석' },
  { name: 'T1', koreanName: 'T1' },
  { name: 'GEN.G', koreanName: '젠지' },
  { name: 'Hanwha Life Esports', koreanName: '한화생명 e스포츠' },
  { name: 'Dplus KIA', koreanName: '디플러스 기아' },
  { name: 'kt Rolster', koreanName: 'kt 롤스터' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ name: string; koreanName: string }[]>([]);

  const handleSearch = () => {
    // Add your search logic here
    console.log('Search button clicked', searchQuery);
    if (searchQuery) {
      const results = mockData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.koreanName.includes(searchQuery)
      );
      setSearchResults(results);
      console.log('Search results:', results);
      // Example: Redirect to search results page
      window.location.href = `/search?query=${searchQuery}`;
    }
  };

  interface SearchResult {
    name: string;
    koreanName: string;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const results: SearchResult[] = mockData.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.koreanName.includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

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
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-full py-2 pl-4 pr-10 bg-gray-100 border border-gray-200 rounded-full"
                />
                <button
                  className="absolute -translate-y-1/2 right-3 top-1/2"
                  onClick={handleSearch}
                >
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {searchResults.map((result, index) => (
                      <Link
                        key={index}
                        href={`/search?query=${result.name}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {result.name} ({result.koreanName})
                      </Link>
                    ))}
                  </div>
                )}
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
