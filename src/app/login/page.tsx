"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react"; // ✅ 추가
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {data: ssesion, status} = useSession()
  console.log(ssesion, status)
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
    <div className={styles.container}>
      <h1>LOGIN</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputGroup}>
          <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? "처리 중..." : "LOGIN"}
        </button>
      </form>

      <div className={styles.socialLogin}>
        <p>소셜 로그인</p>
        <div className={styles.socialIcons}>
          <button className={styles.kakao} onClick={() => signIn("kakao", { callbackUrl: "/" })}>카카오</button>
          <button className={styles.google} onClick={() => signIn("google", { callbackUrl: "/" })}>구글</button>
          <button className={styles.naver} onClick={() => signIn("naver", { callbackUrl: "/" })}>네이버</button>
        </div>
      </div>

      <div className={styles.signupContainer}>
        <p>아직 회원이 아니신가요?</p>
        <button onClick={() => router.push("/join")} className={styles.signupButton}>회원가입</button>
      </div>
    </div>
  );
}
