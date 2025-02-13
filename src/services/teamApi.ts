import api from "./api";
import { Team, APIResponse, Schedule } from "@/src/types/api";

export const teamApi = {
  getTeams: () => api.get<APIResponse<Team[]>>("/teams/"),
  getTeamById: (id: number) => api.get<APIResponse<Team>>(`/teams/${id}/`),
  createTeam: (teamData: Team) =>
    api.post<APIResponse<Team>>("/teams/", teamData),
  updateTeam: (id: number, teamData: Team) =>
    api.put<APIResponse<Team>>(`/teams/${id}/`, teamData),
  deleteTeam: (id: number) => api.delete<APIResponse<void>>(`/teams/${id}/`),
  getTeamSchedule: (teamId: number) =>
    api.get<APIResponse<Schedule[]>>(`/teams/${teamId}/schedule/`),
  createTeamSchedule: (teamId: number, scheduleData: Schedule) =>
    api.post<APIResponse<Schedule>>(`/teams/${teamId}/schedule/`, scheduleData),
  getTeamScheduleById: (teamId: number, scheduleId: number) =>
    api.get<APIResponse<Schedule>>(`/teams/${teamId}/schedule/${scheduleId}/`),
  updateTeamSchedule: (
    teamId: number,
    scheduleId: number,
    scheduleData: Schedule
  ) =>
    api.patch<APIResponse<Schedule>>(
      `/teams/${teamId}/schedule/${scheduleId}/`,
      scheduleData
    ),
  deleteTeamSchedule: (teamId: number, scheduleId: number) =>
    api.delete<APIResponse<void>>(`/teams/${teamId}/schedule/${scheduleId}/`),
  getTopTeams: () => api.get<APIResponse<Team[]>>("/teams/rank/"),
};
