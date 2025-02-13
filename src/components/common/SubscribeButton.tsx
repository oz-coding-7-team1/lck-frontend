'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface SubscribeButtonProps {
  onClick?: () => void;
  initialSubscribed?: boolean;
  teamId: number;  // teamId 추가
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ onClick, initialSubscribed = false, teamId }) => {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setIsSubscribed(!isSubscribed);

    try {
      // 구독 상태를 API로 전송
      const response = await axios.post(`/api/v1/subscribe/team/${teamId}`, {
        subscribed: !isSubscribed, // 현재 상태와 반대 값으로 전송
      });

      if (response.status === 200) {
        // 요청 성공 시 onClick 콜백 실행 
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
        backgroundColor: isSubscribed ? 'white' : 'none',
        color:  isSubscribed ? 'black' : 'white',
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

export default SubscribeButton;
