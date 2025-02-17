"use client";

import { useAuth } from '@/src/context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth(); // ✅ useAuth에서 user 가져오기

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
