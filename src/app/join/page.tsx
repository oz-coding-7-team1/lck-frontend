"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식을 입력하세요.");
      return false;
    }

    if (password.length < 8) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
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

  // 🔹 회원가입 처리 함수 (Django API 연동)
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const signupData = {
      email,
      nickname,
      password,
      terms_agreements: [
        {
          terms: 1,
          is_active: agree,
        },
      ],
    };

    try {
      const response = await axios.post(
        "http://43.200.180.205/api/v1/users/signup/",
        signupData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        router.push("/login");
      } else {
        alert("회원가입 실패! 다시 시도해 주세요.");
      }
    } catch (error: unknown) {
      const errorMessage =
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "회원가입 실패!";
      alert(errorMessage);
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
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
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
