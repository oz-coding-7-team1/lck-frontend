import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/example", () => {
    return new HttpResponse(
      JSON.stringify({ data: [{ message: "Hello World" }] }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }),

  http.get("http://localhost/api/players", () => {
    return new Response(
      JSON.stringify({
        players: [
          { id: 1, name: "FAKER", koreanName: "이상혁" },
          { id: 2, name: "CHOVY", koreanName: "정지훈" },
          { id: 3, name: "GUMAYUSI", koreanName: "이민형" },
          { id: 4, name: "KERIA", koreanName: "류민석" },
        ],
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  }),

  http.get("http://localhost/api/teams", () => {
    return new Response(
      JSON.stringify({
        teams: [
          { id: 1, name: "T1", koreanName: "T1" },
          { id: 2, name: "GEN.G", koreanName: "젠지" },
          {
            id: 3,
            name: "Hanwha Life Esports",
            koreanName: "한화생명 e스포츠",
          },
          { id: 4, name: "Dplus KIA", koreanName: "디플러스 기아" },
          { id: 5, name: "kt Rolster", koreanName: "kt 롤스터" },
        ],
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  }),
];
