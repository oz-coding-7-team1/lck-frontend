"use client";

import { Search, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const lastLogoutTime = sessionStorage.getItem("lastLogoutTime");
    const lastLoggedInUser = sessionStorage.getItem("lastLoggedInUser");

    if (lastLogoutTime && lastLoggedInUser) {
      console.log(
        `Last logout: ${lastLogoutTime} by user: ${lastLoggedInUser}`
      );
    }
  }, []);

  // Check login status when component mounts
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };

    // Initial check
    checkLoginStatus();

    // Listen for storage changes (in case of login/logout in other tabs)
    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("auth-change", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("auth-change", checkLoginStatus);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the search results page with the query
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear the search input
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMyPageClick = () => {
    if (isLoggedIn) {
      router.push("/mypage");
    } else {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    // Remove tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Update state
    setIsLoggedIn(false);

    // Dispatch event to notify other components
    window.dispatchEvent(new Event("auth-change"));

    // Redirect to home page
    router.push("/");
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
          href="/my-choeae"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          My Choeae
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

    if (isLoggedIn) {
      return (
        <>
          {commonItems}
          <Link
            href="/mypage"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            마이페이지
          </Link>
        </>
      );
    }

    return commonItems;
  };

  return (
    <header className="border-b bg-gray-50">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="text-xl font-bold text-rose-500">
          CHOEAELOL
        </Link>
        <form
          onSubmit={handleSearch}
          className="relative flex-1 max-w-xl px-4 mx-auto"
        >
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full py-2 pl-4 pr-10 bg-gray-100 border border-gray-200 rounded-full"
          />
          <button
            type="submit"
            className="absolute transform -translate-y-1/2 right-3 top-1/2"
          >
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </form>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white rounded-full bg-rose-500 hover:bg-rose-600"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 text-sm font-medium text-white rounded-full bg-rose-500 hover:bg-rose-600"
            >
              로그인
            </button>
          )}
          <button
            onClick={handleMyPageClick}
            title={isLoggedIn ? "마이페이지" : "로그인"}
          >
            <User
              className={`w-6 h-6 ${
                isLoggedIn ? "text-rose-500" : "text-gray-600"
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
      </div>
    </header>
  );
}
