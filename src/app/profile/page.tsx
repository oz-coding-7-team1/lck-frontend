"use client";

import { useAuth } from '@/src/context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth(); // ✅ useAuth에서 user 가져오기

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold">Profile</h1>
      {user ? (
        <div className="p-6 bg-gray-100 rounded-md shadow-md">
          <p>👤 닉네임: {user.nickname}</p>
          <p>📧 이메일: {user.email}</p>
        </div>
      ) : (
        <p>사용자 정보가 없습니다. 로그인하세요.</p>
      )}
    </div>
  );
}
