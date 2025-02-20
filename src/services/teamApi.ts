import { Schedule } from "../types/schedule";
import { Team } from "../types/team";
import api from "./api"

export const teamApi = {
  getTeams: () => api.get<Team[]>("/teams/"),
  getTeamById: (id: number) => api.get<Team>(`/teams/${id}/`),
  createTeam: (teamData: Team) =>
    api.post<Team>("/teams/", teamData),
  updateTeam: (id: number, teamData: Team) =>
    api.put<Team>(`/teams/${id}/`, teamData),
  deleteTeam: (id: number) => api.delete<void>(`/teams/${id}/`),
  getTeamSchedule: (teamId: number) =>
    api.get<Schedule[]>(`/teams/${teamId}/schedule/`),
  createTeamSchedule: (teamId: number, scheduleData: Schedule) =>
    api.post<Schedule>(`/teams/${teamId}/schedule/`, scheduleData),
  getTeamScheduleById: (teamId: number, scheduleId: number) =>
    api.get<Schedule>(`/teams/${teamId}/schedule/${scheduleId}/`),
  updateTeamSchedule: (
    teamId: number,
    scheduleId: number,
    scheduleData: Schedule
  ) =>
    api.patch<Schedule>(
      `/teams/${teamId}/schedule/${scheduleId}/`,
      scheduleData
    ),
  deleteTeamSchedule: (teamId: number, scheduleId: number) =>
    api.delete<void>(`/teams/${teamId}/schedule/${scheduleId}/`),
  getTopTeams: () => api.get<Team[]>("/teams/rank/"),
  getFavoriteTeam: async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await api.get<Team>(
        "/subscriptions/team/choeae/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching favorite team:", error);
      throw error;
    }
  },
};
