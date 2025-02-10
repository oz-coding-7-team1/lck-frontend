"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  console.log(session, status);
  const router = useRouter();

  const dummyUsername = "admin";
  const dummyPassword = "123456";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (username === dummyUsername && password === dummyPassword) {
        alert("로그인 성공! 메인 페이지로 이동합니다.");
        router.push("/");
      } else {
        alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-8">
      <h1 className="text-3xl font-bold">LOGIN</h1>
      <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 w-96">
        <div className="flex flex-col gap-2 w-full">
          <input 
            type="text" 
            placeholder="아이디" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md"
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>
        <button 
          type="submit" 
          className={`w-full p-3 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'}`} 
          disabled={loading}
        >
          {loading ? "처리 중..." : "LOGIN"}
        </button>
      </form>

      <div className="flex flex-col items-center w-full">
        <p>소셜 로그인</p>
        <div className="flex gap-2 w-full justify-center">
          <button className="w-32 h-10 bg-yellow-400 text-black border border-black rounded-md" onClick={() => signIn("kakao", { callbackUrl: "/" })}>카카오</button>
          <button className="w-32 h-10 bg-white text-black border border-black rounded-md" onClick={() => signIn("google", { callbackUrl: "/" })}>구글</button>
          <button className="w-32 h-10 bg-green-500 text-white border border-black rounded-md" onClick={() => signIn("naver", { callbackUrl: "/" })}>네이버</button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm">아직 회원이 아니신가요?</p>
        <button onClick={() => router.push("/join")} className="text-sm text-blue-500 underline">회원가입</button>
      </div>
    </div>
  );
}
