import { Player } from "../types/player";
import { Schedule } from "../types/schedule";
import api from "./api";

export const playerApi = {
  getPlayers: () => api.get<Player[]>("/players/"),
  getPlayerById: (id: number) => api.get<Player>(`/players/${id}`),
  createPlayer: (playerData: Player) => api.post<Player>("/players/", playerData),
  updatePlayer: (id: number, playerData: Player) =>
    api.put<Player>(`/players/${id}/`, playerData),
  deactivatePlayer: (id: number) => api.patch<Player>(`/players/${id}/`),
  deletePlayer: (id: number) => api.delete<void>(`/players/${id}/`),
  getPlayerSchedule: (playerId: number) =>
    api.get<Schedule[]>(`/players/${playerId}/schedule/`),
  createPlayerSchedule: (playerId: number, scheduleData: Schedule) =>
    api.post<Schedule>(`/players/${playerId}/schedule/`, scheduleData),
  getPlayerScheduleById: (playerId: number, scheduleId: number) =>
    api.get<Schedule>(`/players/${playerId}/schedule/${scheduleId}/`),
  updatePlayerSchedule: (
    playerId: number,
    scheduleId: number,
    scheduleData: Schedule
  ) =>
    api.patch<Schedule>(
      `/players/${playerId}/schedule/${scheduleId}/`,
      scheduleData
    ),
  deletePlayerSchedule: (playerId: number, scheduleId: number) =>
    api.delete<void>(`/players/${playerId}/schedule/${scheduleId}/`),
  getTopPlayersByPosition: () => api.get<Player[]>("/players/position_top/"),
  getTopPlayers: () => api.get<Player[]>("/players/top/"),
  getFavoritePlayer: async () => {
    try {
      const response = await api.get<Player>("/subscriptions/player/choeae/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching favorite player:", error);
      throw error;
    }
  },
};
