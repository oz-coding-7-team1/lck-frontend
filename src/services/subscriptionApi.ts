import api from "./api";
import { SubscriptionCount } from "@/src/types/api";

export const getAuthToken = () => {
  const token = localStorage.getItem("accessToken");
  //console.log("🔍 가져온 토큰:", token); // 디버깅: 토큰이 제대로 가져와지는지 확인
  if (!token) {
    console.error("❌ 토큰이 없습니다.");
  }
  return token;
};

export const subscriptionApi = {
  subscribePlayer: (playerId: number) =>
    api.post<void>(
      `/subscriptions/player/${playerId}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
        },
      }
    ),

  unsubscribePlayer: (playerId: number) =>
    api.delete<void>(`/subscriptions/player/${playerId}/`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  getPlayerSubscriptionCount: (playerId: number) =>
    api.get<SubscriptionCount>(`/subscriptions/player/${playerId}/count/`),

  getFavoritePlayer: () => {
    return api.get(`/favorite/player`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    });
  },

  subscribeTeam: (teamId: number) =>
    api.post<void>(
      `/subscriptions/team/${teamId}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
        },
      }
    ),

  unsubscribeTeam: (teamId: number) =>
    api.delete<void>(`/subscriptions/team/${teamId}/`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  getTeamSubscriptionCount: (teamId: number) =>
    api.get<SubscriptionCount>(`/subscriptions/team/${teamId}/count/`),

  getFavoriteTeam: () => {
    return api.get(`/favorite/team`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    });
  },
};
