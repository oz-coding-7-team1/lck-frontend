"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // 개발 환경에서만 `console.error` 오버라이드 (로그 출력 방지)
  if (process.env.NODE_ENV === "development") {
    console.error = () => {}; // 개발 환경에서 console.error를 무시합니다.
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      //console.log("🔍 요청 데이터:", { email, password });

      const response = await axios.post(
        "http://43.200.180.205/api/v1/users/login/",
        { email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      //console.log("🔍 로그인 응답 데이터:", response.data);

      const accessToken = response.data.access_token;
      const user = response.data.user;

      if (accessToken && user) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        window.dispatchEvent(new Event("auth-change"));
      } else {
        console.error("❌ Access Token 또는 사용자 정보가 없습니다.");
        return;
      }

      alert("로그인 성공! 메인 페이지로 이동합니다.");
      router.push("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // 서버 응답이 있을 경우, 상세 메시지 출력
        const errorDetail = error.response.data.detail;

        if (errorDetail.includes("잘못된 비밀번호")) {
          setErrorMessage("비밀번호가 올바르지 않습니다.");
        } else if (errorDetail.includes("존재하지 않는 이메일")) {
          setErrorMessage("해당 이메일의 사용자를 찾을 수 없습니다.");
        } else {
          setErrorMessage("로그인 실패! 이메일 또는 비밀번호를 확인하세요.");
        }
      } else {
        // 서버 오류 발생 시
        setErrorMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 text-lg bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>

        {/* 에러 메시지 출력 */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

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
