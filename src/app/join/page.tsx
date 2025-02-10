"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!agree) {
      alert("개인정보 처리방침에 동의해야 합니다.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, email, password }),
      });

      if (res.ok) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        router.push("/login");
      } else {
        const data = await res.json();
        alert(data.message || "회원가입 실패!");
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-96">
        <div className="flex flex-col gap-3">
          <input type="text" placeholder="아이디" value={nickname} onChange={(e) => setNickname(e.target.value)} required className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md" />
          <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md" />
          <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md" />
          <input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md" />
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <input type="checkbox" id="agree" checked={agree} onChange={() => setAgree(!agree)} className="mr-2" />
            <label htmlFor="agree"> 개인정보 처리방침 동의 </label>
          </div>
          <a href="/terms" target="_blank" className="text-blue-500 underline">(약관 동의 보기)</a>
        </div>
        <button type="submit" className={`w-full p-3 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'}`} disabled={loading}>
          {loading ? "처리 중..." : "JOIN"}
        </button>
      </form>
    </div>
  );
}
