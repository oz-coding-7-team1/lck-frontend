"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/src/services/authApi"; // authApi 사용
import { User } from "@/src/types/api";

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
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      const token = response.data.token;

      if (token) {
        setAccessToken(token);
        localStorage.setItem("accessToken", token);

        const userResponse = await authApi.getUserInfo();
        setUser(userResponse.data);
        localStorage.setItem("user", JSON.stringify(userResponse.data));

        alert("로그인 성공!");
        router.push("/"); // 로그인 후 메인 페이지로 이동
      }
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인 실패! 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    alert("로그아웃 되었습니다.");
    router.push("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내에서 사용해야 합니다.");
  }
  return context;
};
