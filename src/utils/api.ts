import axios, { AxiosError } from "axios";

// 기본 API URL 설정
const API_BASE_URL = "http://43.200.180.205/api/v1/";

const apiClient = axios.create({
  baseURL: API_BASE_URL, // 기본 URL을 지정
  headers: {
    "Content-Type": "application/json", // 요청 헤더 설정
  },
  withCredentials: true, // 인증 관련 쿠키 등을 자동으로 포함
});

// 선수 정보 가져오기
export async function fetchPlayerById(playerId: number) {
  try {
    const response = await apiClient.get(`/player/${playerId}`);
    return response.data; // axios는 자동으로 응답 본문을 data로 반환합니다.
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "선수 데이터를 불러올 수 없습니다.");
    } else {
      throw new Error("선수 데이터를 불러올 수 없습니다.");
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
      throw new Error(error.response?.data?.message || "팀 데이터를 불러올 수 없습니다.");
    } else {
      throw new Error("팀 데이터를 불러올 수 없습니다.");
    }
  }
}
