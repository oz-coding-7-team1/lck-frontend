import api from "./api";
import { Player, APIResponse, Schedule } from "@/src/types/api";

export const playerApi = {
  getPlayers: () => api.get<APIResponse<Player[]>>("/players/"),
  getPlayerById: (id: number) => api.get<APIResponse<Player>>(`/players/${id}`),
  createPlayer: (playerData: Player) =>
    api.post<APIResponse<Player>>("/players/", playerData),
  updatePlayer: (id: number, playerData: Player) =>
    api.put<APIResponse<Player>>(`/players/${id}/`, playerData),
  deactivatePlayer: (id: number) =>
    api.patch<APIResponse<Player>>(`/players/${id}/`),
  deletePlayer: (id: number) =>
    api.delete<APIResponse<void>>(`/players/${id}/`),
  getPlayerSchedule: (playerId: number) =>
    api.get<APIResponse<Schedule[]>>(`/players/${playerId}/schedule/`),
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
};
