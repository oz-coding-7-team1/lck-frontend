import { CloudImage } from "../types/api";
import api from "./api";

export const cloudImageApi = {
  getPlayerImages: (playerId: number) =>
    api.get<CloudImage[]>(
      `/cloud-images/players/${playerId}/`
    ),
  getPlayerGalleryImages: (playerId: number) =>
    api.get<CloudImage[]>(
      `/cloud-images/players/${playerId}/gallery`
    ),
  getTeamImages: (teamId: number) =>
    api.get<CloudImage[]>(
      `/cloud-images/teams/${teamId}/`
    ),
  getTeamGalleryImages: (teamId: number) =>
  api.get<CloudImage[]>(
      `/cloud-images/teams/${teamId}/gallery`
    ),
};
