'use client';

import React, { useState } from 'react';
import { subscriptionApi } from '@/src/services/subscriptionApi';  // subscriptionApi를 임포트

interface TeamSubscribeButtonProps {
  onClick?: () => void;
  initialSubscribed?: boolean;
  teamId: number;  // teamId 추가
}

const TeamSubscribeButton: React.FC<TeamSubscribeButtonProps> = ({ onClick, initialSubscribed = false, teamId }) => {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setIsSubscribed(!isSubscribed);  // 구독 상태를 반전시킴

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
        // 요청 성공 시 onClick 콜백 실행 
        if (onClick) onClick();
      } else {
        throw new Error('서버 오류');
      }
    } catch (error) {
      console.error('구독 상태 전송 실패:', error);
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
        backgroundColor: isSubscribed ? 'white' : 'none',
        color: isSubscribed ? 'black' : 'white',
        outline: isSubscribed ? 'none' : '1px solid white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
    >
      {loading ? '처리 중...' : isSubscribed ? '응원취소' : '응원하기'}
    </button>
  );
};

export default TeamSubscribeButton;
