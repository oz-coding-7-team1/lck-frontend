"use client";

import React, { useState } from "react";
import { subscriptionApi } from "@/src/services/subscriptionApi"; // subscriptionApi를 임포트
import { useAuth } from "@/src/context/AuthContext"; // useAuth 훅을 임포트
import { useRouter } from "next/navigation"; // useRouter 훅을 임포트

interface PlayerSubscribeButtonProps {
  onClick?: () => void;
  initialSubscribed?: boolean; // initialSubscribed는 이제 undefined일 수 있음
  playerId: number;
}

const PlayerSubscribeButton: React.FC<PlayerSubscribeButtonProps> = ({
  onClick,
  initialSubscribed = false,
  playerId,
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(initialSubscribed); // 기본값을 false로 설정
  const [loading, setLoading] = useState(false);
  const { user, accessToken } = useAuth(); // 로그인 상태와 accessToken 가져오기
  const router = useRouter(); // useRouter 훅 사용

  console.log(accessToken);

  const handleClick = async () => {
    console.log();
    if (!accessToken) {
      alert("로그인 후 구독할 수 있습니다."); // 로그인 하지 않은 경우 알림
      router.push("/login"); // 로그인 페이지로 이동
      return;
    }

    // accessToken이 없으면 로그인 화면으로 이동
    if (!accessToken) {
      alert("유효한 토큰이 없습니다. 다시 로그인 해주세요.");
      router.push("/login"); // 로그인 페이지로 이동
      return;
    }

    setLoading(true);
    setIsSubscribed(!isSubscribed); // 구독 상태를 반전시킴

    try {
      let response;
      if (isSubscribed) {
        // 구독 취소
        response = await subscriptionApi.unsubscribePlayer(playerId);
      } else {
        // 구독
        response = await subscriptionApi.subscribePlayer(playerId);
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
      className="subscribe-button" // 스타일은 별도로 CSS 클래스로 관리
      aria-label={isSubscribed ? "구독 취소" : "구독"}
    >
      {loading ? (
        "처리 중..."
      ) : isSubscribed ? (
        <span className="text-red-500">❤️</span> // 채워진 하트
      ) : (
        <span className="text-gray-400">🤍</span> // 빈 하트
      )}
    </button>
  );
};

export default PlayerSubscribeButton;
