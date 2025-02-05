
// 팀 타입 정의
export interface Team {
    id: number; // 팀의 고유 ID
    name: string; // 팀명
    players: number[]; // 소속 선수 목록
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      youtube?: string;
      twitch?: string;
    }; // 팀의 SNS 링크
    fanVotes?: number; // 팬 투표 수
  }


export const sampleTeams: Team[] = [
    {
        id: 101,
        name: "T1",
        players: [1, 2, 3],
        socialLinks: {
            instagram: "https://instagram.com/t1",
            twitter: "https://twitter.com/t1",
            youtube: "https://youtube.com/t1",
            twitch: "https://twitch.tv/t1",
          },
        fanVotes: 100000,
    }
];