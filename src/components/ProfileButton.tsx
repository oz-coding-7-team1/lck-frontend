"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProfileButton() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status when component mounts and when localStorage changes
    const checkLoginStatus = () => {
      const accessToken = localStorage.getItem("accessToken");
      setIsLoggedIn(!!accessToken);
    };

    // Initial check
    checkLoginStatus();

    // Add event listener for localStorage changes
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      // If logged in, clicking the profile icon should navigate to profile
      router.push("/myprofile");
    } else {
      // If not logged in, navigate to login page
      router.push("/login");
    }
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the profile navigation
    // Handle logout - remove both tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    router.push("/"); // Redirect to home page after logout
  };

  return (
    <div className="flex items-center gap-4">
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-gray-800"
        >
          로그아웃
        </button>
      )}
      <button
        onClick={handleClick}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Profile"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
    </div>
  );
}
