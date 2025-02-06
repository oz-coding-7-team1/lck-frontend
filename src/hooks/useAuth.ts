import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // 더미 유저 데이터 (백엔드가 없으므로 임시 데이터)
  const DUMMY_USER: User = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  };

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout(); // 데이터가 깨졌을 경우 로그아웃
      }
    }
    setIsLoading(false);
  }, []);

  // 로그인 함수 (더미 데이터 사용)
  const login = useCallback((token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(DUMMY_USER));

    setUser(DUMMY_USER);
    setIsAuthenticated(true);
    router.push("/dashboard");
  }, [router]);

  // 로그아웃 함수
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  }, [router]);

  return { user, isAuthenticated, isLoading, login, logout };
}
