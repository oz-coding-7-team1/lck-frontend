import api from "./api";
import { Subscription, SubscriptionCount } from "@/src/types/api";


export const subscriptionApi = {
  subscribePlayer: (playerId: number, accessToken: string) =>
    api.post<void>(`/subscriptions/player/${playerId}/`,
      {
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
      },
    }),
    
  unsubscribePlayer: (playerId: number, accessToken: string) =>
    api.delete<void>(`/subscriptions/player/${playerId}/`,
      {
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
      },
    }),

  getPlayerSubscriptionCount: (playerId: number) =>
    api.get<SubscriptionCount>(`/subscriptions/player/${playerId}/count/`,),

  getFavoritePlayer: (accessToken: number) =>
    api.get<Subscription>("/subscriptions/player/choeae/", {
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
      },
    }),
  subscribeTeam: (teamId: number, accessToken: string) =>
    api.post<void>(`/subscriptions/team/${teamId}/`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
      },
    }),

  unsubscribeTeam: (teamId: number, accessToken: string) =>
    api.delete<void>(`/subscriptions/team/${teamId}/`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
      },
    }),

  getTeamSubscriptionCount: (teamId: number) =>
    api.get<SubscriptionCount>(`/subscriptions/team/${teamId}/count/`),

  getFavoriteTeam: (accessToken: string) =>
    api.get<Subscription>("/subscriptions/team/choeae/", {
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
      },
    }),
};
