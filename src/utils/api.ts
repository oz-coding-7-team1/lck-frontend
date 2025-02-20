import axios, { AxiosError } from "axios";

// Update the base URL
const API_BASE_URL = "https://api.umdoong.shop/api/v1/";

const apiClient = axios.create({
  baseURL: API_BASE_URL, // Set the new base URL
  headers: {
    "Content-Type": "application/json", // Set the request headers
  },
  withCredentials: true, // Include credentials in requests
});

// Export the apiClient
export { apiClient };

// 선수 정보 가져오기
export async function fetchPlayerById(playerId: number) {
  try {
    const response = await apiClient.get(`/player/${playerId}`);
    return response.data; // Return the response data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch player data."
      );
    } else {
      throw new Error("Failed to fetch player data.");
    }
  }
}

// 팀 정보 가져오기
export async function fetchTeamById(teamId: number) {
  try {
    const response = await apiClient.get(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "팀 데이터를 불러올 수 없습니다."
      );
    } else {
      throw new Error("팀 데이터를 불러올 수 없습니다.");
    }
  }
}
