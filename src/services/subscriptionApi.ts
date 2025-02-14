import api from "./api";
import { APIResponse, Subscription } from "@/src/types/api";

export const subscriptionApi = {
  subscribePlayer: (playerId: number) =>
    api.post<APIResponse<void>>(`/subscriptions/player/${playerId}/`),
  unsubscribePlayer: (playerId: number) =>
    api.delete<APIResponse<void>>(`/subscriptions/player/${playerId}/`),
  getPlayerSubscriptionCount: (playerId: number) =>
    api.get<APIResponse<number>>(`/subscriptions/player/${playerId}/count/`),
  getFavoritePlayer: () =>
    api.get<APIResponse<Subscription>>("/subscriptions/player/choeae/"),
  subscribeTeam: (teamId: number) =>
    api.post<APIResponse<void>>(`/subscriptions/team/${teamId}/`),
  unsubscribeTeam: (teamId: number) =>
    api.delete<APIResponse<void>>(`/subscriptions/team/${teamId}/`),
  getTeamSubscriptionCount: (teamId: number) =>
    api.get<APIResponse<number>>(`/subscriptions/team/${teamId}/count/`),
  getFavoriteTeam: () =>
    api.get<APIResponse<Subscription>>("/subscriptions/team/choeae/"),
};
