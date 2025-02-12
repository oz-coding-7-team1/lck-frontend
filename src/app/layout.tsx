"use client";

//TODO take out use client, header and footer move to components

import "./globals.css"; // Replace the existing CSS import with this
import { Inter } from "next/font/google";
import { Search, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AuthConetxt from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

const mockData = [
  { name: "FAKER", koreanName: "이상혁" },
  { name: "CHOVY", koreanName: "정지훈" },
  { name: "GUMAYUSI", koreanName: "이민형" },
  { name: "KERIA", koreanName: "류민석" },
  { name: "T1", koreanName: "T1" },
  { name: "GEN.G", koreanName: "젠지" },
  { name: "Hanwha Life Esports", koreanName: "한화생명 e스포츠" },
  { name: "Dplus KIA", koreanName: "디플러스 기아" },
  { name: "kt Rolster", koreanName: "kt 롤스터" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    { name: string; koreanName: string }[]
  >([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery) {
      const results = mockData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.koreanName.includes(searchQuery)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    // Add your search logic here
    console.log("Search button clicked", searchQuery);
    if (searchQuery) {
      // Example: Redirect to search results page
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMyPageClick = () => {
    router.push("/login");
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthConetxt>
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
                    onKeyDown={handleKeyDown}
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
                <button onClick={handleMyPageClick}>
                  <User className="w-6 h-6 text-gray-600" />
                </button>
                <button onClick={toggleMenu}>
                  {menuOpen ? (
                    <X className="w-6 h-6 text-gray-600" />
                  ) : (
                    <Menu className="w-6 h-6 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="py-2 mb-1 text-sm text-center text-gray-400">
            {/* Adjusted padding and margin */}
            <p>&copy; 2025 CHOEAELOL. All rights reserved.</p>
          </footer>
          {menuOpen && (
            <div
              className="fixed inset-0 z-20 bg-black bg-opacity-50"
              onClick={toggleMenu}
            >
              <div className="fixed top-0 right-0 z-30 w-64 h-full bg-white shadow-lg">
                <button className="absolute top-4 right-4" onClick={toggleMenu}>
                  <X className="w-6 h-6 text-gray-600" />
                </button>
                <nav className="mt-16 space-y-4">
                  <Link
                    href="/"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Home
                  </Link>
                  <Link
                    href="/my-choeae"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    My Choeae
                  </Link>
                  <Link
                    href="/myprofile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/playerlist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Player
                  </Link>
                  <Link
                    href="/teamlist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Team
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </AuthConetxt>
      </body>
    </html>
  );
}
