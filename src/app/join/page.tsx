"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SignupPage.module.css";

export default function SignupPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!agreement) {
      alert("개인정보 처리방침에 동의해야 합니다.");
      return;
    }

    setLoading(true);

//TODO fetch대신 axios쓰기

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
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleSignup} className={styles.form}>
        <div className={styles.inputGroup}>
          <input type="text" placeholder="아이디" value={nickname} onChange={(e) => setNickname(e.target.value)} required className={styles.inputField} />
          <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.inputField} />
          <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.inputField} />
          <input type="password" placeholder="비밀번호 확인" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required className={styles.inputField} />
        </div>
        <div className={styles.termsContainer}>
          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="agree" checked={agreement} onChange={() => setAgreement(!agreement)} />
            <label htmlFor="agree"> 개인정보 처리방침 동의 </label>
          </div>
          <a href="/terms" target="_blank" className={styles.termsLink}>(약관 동의 보기)</a>
        </div>
        <button type="submit" className={styles.joinButton} disabled={loading}>
          {loading ? "처리 중..." : "JOIN"}
        </button>
      </form>
    </div>
  );
}
