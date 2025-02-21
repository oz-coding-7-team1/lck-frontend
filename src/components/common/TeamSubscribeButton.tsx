"use client";

import React, { useState } from "react";
import { subscriptionApi } from "@/src/services/subscriptionApi"; // subscriptionApi를 임포트
import { useAuth } from "@/src/context/AuthContext"; // useAuth 훅을 임포트
import { useRouter } from "next/navigation"; // useRouter 훅을 임포트

interface TeamSubscribeButtonProps {
  onClick?: () => void;
  initialSubscribed?: boolean; // initialSubscribed는 이제 undefined일 수 있음
  teamId: number;
}

const TeamSubscribeButton: React.FC<TeamSubscribeButtonProps> = ({
  onClick,
  initialSubscribed = false,
  teamId,
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(initialSubscribed); // 기본값을 false로 설정
  const [loading, setLoading] = useState(false);
  const { user, accessToken } = useAuth(); // 로그인 상태와 accessToken 가져오기
  const router = useRouter(); // useRouter 훅 사용

  const handleClick = async () => {
    if (!accessToken) {
      alert("로그인 후 응원할 수 있습니다."); // 로그인 하지 않은 경우 알림
      router.push("/login"); // 로그인 페이지로 이동
      return;
    }

    // accessToken이 null인 경우 처리
    if (!accessToken) {
      alert("유효한 토큰이 없습니다. 다시 로그인 해주세요.");
      return;
    }

    setLoading(true);
    setIsSubscribed(!isSubscribed); // 구독 상태를 반전시킴

    try {
      let response;
      if (isSubscribed) {
        // 구독 취소
        response = await subscriptionApi.unsubscribeTeam(teamId);
      } else {
        // 구독
        response = await subscriptionApi.subscribeTeam(teamId);
      }

      if (response.status === 200) {
        // 요청 성공 시 onClick 콜백 실행 (선택적)
        if (onClick) onClick();
      } else {
        throw new Error("서버 오류");
      }
    } catch (error) {
      console.error("구독 상태 전송 실패:", error);
      setIsSubscribed(isSubscribed); // 실패 시 이전 상태로 되돌리기
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        backgroundColor: isSubscribed ? "white" : "none",
        color: isSubscribed ? "black" : "white",
        outline: isSubscribed ? "none" : "1px solid white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "처리 중..." : isSubscribed ? "응원취소" : "응원하기"}
    </button>
  );
};

export default TeamSubscribeButton;
