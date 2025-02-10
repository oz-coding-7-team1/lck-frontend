const API_BASE_URL = "https://api.example.com";

export async function fetchPlayerById(playerId: number) {
  const response = await fetch(`${API_BASE_URL}/players/${playerId}`);
  if (!response.ok) throw new Error("선수 데이터를 불러올 수 없습니다.");
  return response.json();
}

export async function fetchTeamById(teamId: number) {
  const response = await fetch(`${API_BASE_URL}/teams/${teamId}`);
  if (!response.ok) throw new Error("팀 데이터를 불러올 수 없습니다.");
  return response.json();
}

export async function getUser() {
  const response = await fetch(`${API_BASE_URL}/auth/me`, { credentials: "include" });
  if (!response.ok) throw new Error("사용자 정보를 불러올 수 없습니다.");
  return response.json();
}

export async function logout() {
  await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST", credentials: "include" });
}
