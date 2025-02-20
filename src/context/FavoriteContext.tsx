'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import { subscriptionApi } from "@/src/services/subscriptionApi"; // API 호출을 위한 import
import { Subscription } from "@/src/types/api"; // 타입 정의 가져오기
import { useAuth } from "@/src/context/AuthContext"; // 인증 상태를 관리하는 훅

// Context 타입 정의
interface FavoriteContextType {
  favoritePlayer: Subscription | null;
  favoriteTeam: Subscription | null;
  subscribePlayer: (playerId: number) => void;
  unsubscribePlayer: (playerId: number) => void;
  subscribeTeam: (teamId: number) => void;
  unsubscribeTeam: (teamId: number) => void;
  loading: boolean;
  error: string | null;
}

// Context 생성
const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

// FavoriteProvider 컴포넌트
export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { accessToken } = useAuth(); // 인증된 사용자 정보
  const [favoritePlayer, setFavoritePlayer] = useState<Subscription | null>(null);
  const [favoriteTeam, setFavoriteTeam] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 선수와 팀의 구독 상태를 가져오는 함수
  useEffect(() => {
    if (!accessToken) return;

    const fetchFavoriteData = async () => {
        setLoading(true);
        try {
          const playerResponse = await subscriptionApi.getFavoritePlayer(accessToken);
          const teamResponse = await subscriptionApi.getFavoriteTeam(accessToken);
          console.log("player ID 타입:", typeof playerResponse.data.id);
            console.log("team ID 타입:", typeof teamResponse.data.id);
      
          setFavoritePlayer({
            ...playerResponse.data,
            id: Number(playerResponse.data.id), // id를 숫자로 변환
          });
      
          setFavoriteTeam({
            ...teamResponse.data,
            id: Number(teamResponse.data.id), // id를 숫자로 변환
          });
      
        } catch (err) {
          console.error("Error fetching favorite data:", err);
          setError("데이터를 가져오는 데 실패했습니다.");
        } finally {
          setLoading(false);
        }
      };
      
    fetchFavoriteData();
  }, [accessToken]);

  const subscribePlayer = async (playerId: number) => {
    if (!accessToken) return;
    try {
      await subscriptionApi.subscribePlayer(playerId, accessToken);
      setFavoritePlayer({ ...favoritePlayer, subscribed: true } as Subscription); // 구독 상태 갱신
    } catch (err) {
      console.error("Error subscribing player:", err);
    }
  };

  const unsubscribePlayer = async (playerId: number) => {
    if (!accessToken) return;
    try {
      await subscriptionApi.unsubscribePlayer(playerId, accessToken);
      setFavoritePlayer({ ...favoritePlayer, subscribed: false } as Subscription); // 구독 취소 상태 갱신
    } catch (err) {
      console.error("Error unsubscribing player:", err);
    }
  };

  const subscribeTeam = async (teamId: number) => {
    if (!accessToken) return;
    try {
      await subscriptionApi.subscribeTeam(teamId, accessToken);
      setFavoriteTeam({ ...favoriteTeam, subscribed: true } as Subscription); // 구독 상태 갱신
    } catch (err) {
      console.error("Error subscribing team:", err);
    }
  };

  const unsubscribeTeam = async (teamId: number) => {
    if (!accessToken) return;
    try {
      await subscriptionApi.unsubscribeTeam(teamId, accessToken);
      setFavoriteTeam({ ...favoriteTeam, subscribed: false } as Subscription); // 구독 취소 상태 갱신
    } catch (err) {
      console.error("Error unsubscribing team:", err);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoritePlayer,
        favoriteTeam,
        subscribePlayer,
        unsubscribePlayer,
        subscribeTeam,
        unsubscribeTeam,
        loading,
        error,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

// useFavorite 훅을 사용하여 Context에서 데이터를 가져오는 함수
export const useFavorite = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite는 FavoriteProvider 내에서 사용해야 합니다.");
  }
  return context;
};
