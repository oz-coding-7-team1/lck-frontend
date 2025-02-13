import axios, { AxiosError } from "axios";

//const API_BASE_URL = "https://api.example.com";

export async function fetchPlayerById(playerId: number) {
  try {
    const response = await axios.get(`/players/${playerId}`);
    return response.data; // axios는 자동으로 응답 본문을 data로 반환합니다.
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "선수 데이터를 불러올 수 없습니다.");
    } else {
      throw new Error("선수 데이터를 불러올 수 없습니다.");
    }
  }
}

export async function fetchTeamById(teamId: number) {
  try {
    const response = await axios.get(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "팀 데이터를 불러올 수 없습니다.");
    } else {
      throw new Error("팀 데이터를 불러올 수 없습니다.");
    }
  }
}

export async function getUser() {
  try {
    const response = await axios.get(`/auth/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "사용자 정보를 불러올 수 없습니다.");
    } else {
      throw new Error("사용자 정보를 불러올 수 없습니다.");
    }
  }
}

export async function logout() {
  try {
    await axios.post(`/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "로그아웃 중 오류가 발생했습니다.");
    } else {
      throw new Error("로그아웃 중 오류가 발생했습니다.");
    }
  }
}
