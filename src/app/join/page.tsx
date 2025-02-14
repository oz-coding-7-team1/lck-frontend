"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi } from "@/src/services/authApi";

export default function SignupPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔹 유효성 검사 함수
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 검사
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식을 입력하세요.");
      return false;
    }

    if (password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return false;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }

    if (!nickname.trim()) {
      alert("닉네임을 입력하세요.");
      return false;
    }

    if (!agree) {
      alert("개인정보 처리방침에 동의해야 합니다.");
      return false;
    }

    return true;
  };

  // 🔹 회원가입 처리 함수
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const signupData = {
      email,
      password,
      nickname,
      agreements: [
        { terms_id: 1, agreed: 1 },
        { terms_id: 2, agreed: 1 },
      ],
    };

    try {
      const res = await authApi.register(signupData);

      if (res.status === 200) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        router.push("/login");
      } else {
        alert(res.data.message || "회원가입 실패!");
      }
    } catch {
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold">Sign Up</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-96">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mr-2"
            />
            <label htmlFor="agree"> 개인정보 처리방침 동의 </label>
          </div>
          <a href="/terms" target="_blank" className="text-blue-500 underline">
            (약관 동의 보기)
          </a>
        </div>

        <button
          type="submit"
          className={`w-full p-3 text-white rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "처리 중..." : "JOIN"}
        </button>
      </form>
    </div>
  );
}
