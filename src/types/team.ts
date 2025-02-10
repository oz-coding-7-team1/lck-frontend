
// 팀 타입 정의
export interface Team {
    id: number; // 팀의 고유 ID
    name: string; // 팀명
    koreanName: string; // 한국어 팀명
    logo: string; // 로고 이미지 url
    players: number[]; // 소속 선수 목록
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      youtube?: string;
      twitch?: string;
    }; // 팀의 SNS 링크
    fanVotes?: number; // 팬 투표 수
    backgroundImageUrl?: string; // 상단 배경 이미지
    logoImageUrl: string; //팀 로고 이미지
  }


export const sampleTeams: Team[] = [
    {
        id: 101,
        name: "T1",
        koreanName: "티원",
        logo: "/logos/t1.svg",
        players: [1, 2, 3],
        socialLinks: {
            instagram: "https://instagram.com/t1",
            xLogo: "https://twitter.com/t1",
            youtube: "https://youtube.com/t1",
            soop: "https://twitch.tv/t1",
          },
        fanVotes: 100000,
        backgroundImageUrl: "/images/team/T1/background.png",
        logoImageUrl: "/logos/T1_esports_logo.svg",
    }
];