"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi } from "@/src/services/authApi";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.login(username, password);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      }
    } catch {
      alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-8">
      <h1 className="text-3xl font-bold">LOGIN</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center gap-4 w-96"
      >
        <div className="flex flex-col w-full gap-2">
          <input
            type="email"
            placeholder="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        </div>
        <button
          type="submit"
          className={`w-full p-3 text-white rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "처리 중..." : "LOGIN"}
        </button>
      </form>

      <div className="flex items-center gap-2">
        <p className="text-sm">아직 회원이 아니신가요?</p>
        <button
          onClick={() => router.push("/join")}
          className="text-sm text-blue-500 underline"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
