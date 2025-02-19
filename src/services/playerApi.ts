import api from "./api";
import { Player, APIResponse, Schedule } from "@/src/types/api";


//todo APIResponse 다 뺴기 - 가져오는 데이터만 넣기

export const playerApi = {
  getPlayers: () => api.get<Player[]>("/players/"),
  getPlayerById: (id: number) => api.get<Player>(`/players/${id}`),
  createPlayer: (playerData: Player) =>
    api.post<APIResponse<Player>>("/players/", playerData),
  updatePlayer: (id: number, playerData: Player) =>
    api.put<APIResponse<Player>>(`/players/${id}/`, playerData),
  deactivatePlayer: (id: number) =>
    api.patch<APIResponse<Player>>(`/players/${id}/`),
  deletePlayer: (id: number) =>
    api.delete<APIResponse<void>>(`/players/${id}/`),
  getPlayerSchedule: (playerId: number) =>
    api.get<Schedule[]>(`/players/${playerId}/schedule/`),
  createPlayerSchedule: (playerId: number, scheduleData: Schedule) =>
    api.post<APIResponse<Schedule>>(
      `/players/${playerId}/schedule/`,
      scheduleData
    ),
  getPlayerScheduleById: (playerId: number, scheduleId: number) =>
    api.get<APIResponse<Schedule>>(
      `/players/${playerId}/schedule/${scheduleId}/`
    ),
  updatePlayerSchedule: (
    playerId: number,
    scheduleId: number,
    scheduleData: Schedule
  ) =>
    api.patch<APIResponse<Schedule>>(
      `/players/${playerId}/schedule/${scheduleId}/`,
      scheduleData
    ),
  deletePlayerSchedule: (playerId: number, scheduleId: number) =>
    api.delete<APIResponse<void>>(
      `/players/${playerId}/schedule/${scheduleId}/`
    ),
  getTopPlayersByPosition: () =>
    api.get<APIResponse<Player[]>>("/players/position_top/"),
  getTopPlayers: () => api.get<APIResponse<Player[]>>("/players/top/"),
  getFavoritePlayer: async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await api.get<Player>(
        "/subscriptions/player/choeae/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching favorite player:", error);
      throw error;
    }
  },
};
