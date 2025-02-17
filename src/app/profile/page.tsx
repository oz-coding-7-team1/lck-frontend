"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<{ email: string; nickname: string } | null>(null);

  useEffect(() => {
    // ✅ localStorage에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {user ? (
        <div className="bg-gray-100 p-6 rounded-md shadow-md">
          <p>👤 닉네임: {user.nickname}</p>
          <p>📧 이메일: {user.email}</p>
        </div>
      ) : (
        <p>사용자 정보가 없습니다. 로그인하세요.</p>
      )}
    </div>
  );
}
