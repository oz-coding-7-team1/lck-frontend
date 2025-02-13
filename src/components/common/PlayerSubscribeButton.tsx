'use client';

import React, { useState } from 'react';
import axios from 'axios';

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
    setIsSubscribed(!isSubscribed);

    try {
      // 구독 상태를 API로 전송 (Axios 사용)
      const response = await axios.post(`/api/v1/subscribe/player/${playerId}`, {
        subscribed: !isSubscribed, // 현재 상태와 반대 값으로 전송
      });

      if (response.status === 200) {
        // 요청 성공 시 onClick 콜백 실행 (선택적)
        if (onClick) onClick();
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
