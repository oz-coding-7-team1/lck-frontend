"use client";

import { Search, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const mockData = [
  { name: "FAKER", koreanName: "이상혁" },
  { name: "CHOVY", koreanName: "정지훈" },
  // ...existing mockData...
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    { name: string; koreanName: string }[]
  >([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { status } = useSession();

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

  useEffect(() => {
    // Check session storage for logout information
    const lastLogoutTime = sessionStorage.getItem("lastLogoutTime");
    const lastLoggedInUser = sessionStorage.getItem("lastLoggedInUser");

    if (lastLogoutTime && lastLoggedInUser) {
      console.log(
        `Last logout: ${lastLogoutTime} by user: ${lastLoggedInUser}`
      );
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
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
    if (status === "authenticated") {
      router.push("/mypage");
    } else {
      router.push("/login");
    }
  };

  // Update the navigation menu to show different options based on auth status
  const renderNavItems = () => {
    const commonItems = (
      <>
        <Link
          href="/"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Home
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
      </>
    );

    if (status === "authenticated") {
      return (
        <>
          {commonItems}
          <Link
            href="/mypage"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            내 프로필
          </Link>
        </>
      );
    }

    return commonItems;
  };

  return (
    <>
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
            <button
              onClick={handleMyPageClick}
              title={status === "authenticated" ? "내 프로필" : "로그인"}
            >
              <User
                className={`w-6 h-6 ${
                  status === "authenticated" ? "text-rose-500" : "text-gray-600"
                }`}
              />
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
      {menuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={() => setMenuOpen(false)}
        >
          <div className="fixed top-0 right-0 z-30 w-64 h-full bg-white shadow-lg">
            <button className="absolute top-4 right-4" onClick={toggleMenu}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <nav className="mt-16 space-y-4">{renderNavItems()}</nav>
          </div>
        </div>
      )}
    </>
  );
}
