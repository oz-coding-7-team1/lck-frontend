"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  nickname: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // ✅ localStorage에서 토큰과 사용자 정보 가져오기
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ 로그인 함수
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://43.200.180.205/api/v1/users/login/", {
        email,
        password,
      });

      console.log("🔍 로그인 응답 데이터:", response.data);

      const accessToken = response.data.access_token;
      const user = response.data.user;

      if (accessToken && user) {
        setAccessToken(accessToken);
        setUser(user);

        // ✅ localStorage에도 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        console.error("❌ Access Token 또는 사용자 정보가 없습니다.");
        return;
      }

      alert("로그인 성공! 메인 페이지로 이동합니다.");
      router.push("/");
    } catch (error) {
      console.error("❌ 로그인 요청 실패:", error);
      alert("로그인 실패! 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  // ✅ 로그아웃 함수
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    alert("로그아웃 되었습니다.");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ AuthContext를 쉽게 사용할 수 있도록 하는 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내에서 사용해야 합니다.");
  }
  return context;
};
