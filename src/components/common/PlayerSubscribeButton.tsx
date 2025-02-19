'use client';

import React, { useState } from 'react';
import { subscriptionApi } from '@/src/services/subscriptionApi'; // subscriptionApi를 임포트

interface PlayerSubscribeButtonProps {
  onClick?: () => void;
  initialSubscribed?: boolean;
  playerId: number;
}

const PlayerSubscribeButton: React.FC<PlayerSubscribeButtonProps> = ({ onClick, initialSubscribed = false, playerId }) => {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
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
        backgroundColor: 'transparent',
        border: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '24px',
      }}
    >
      {loading ? (
        '처리 중...'
      ) : isSubscribed ? (
        <span style={{ color: '#FF6347' }}>❤️</span> // 채워진 하트
      ) : (
        <span style={{ color: '#ccc' }}>🤍</span> // 빈 하트
      )}
    </button>
  );
};

export default PlayerSubscribeButton;
