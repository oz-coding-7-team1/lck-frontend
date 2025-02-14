import api from "./api";
import { APIResponse, CloudImage } from "@/src/types/api";

export const cloudImageApi = {
  getPlayerImages: (playerId: number) =>
    api.get<APIResponse<CloudImage[]>>(
      `/cloud-images/player-images/${playerId}/`
    ),
  getTeamImages: (teamId: number) =>
    api.get<APIResponse<CloudImage[]>>(`/cloud-images/team-images/${teamId}/`),
};
