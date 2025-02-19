// 팀 타입 정의
export interface Team {
    id: number; // 팀의 고유 ID
    name: string; // 팀명
    koreanName: string; // 한국어 팀명
    players: number[]; // 소속 선수 목록
    social?: {
      insta?: string;
      X?: string;
      youtube?: string;
      facebook?: string;
      soop?: string;
      chzzk?: string;
    }; // 팀의 SNS 링크
    fanVotes?: number; // 팬 투표 수
    backgroundImageUrl?: string; // 상단 배경 이미지
    logoImageUrl: string; //팀 로고 이미지
  }

