export interface Player {
    id: string; // 선수의 고유 ID
    name: string; // 선수 이름
    nickname: string; // 게임 내 닉네임
    birthdate: string; // 생년월일 (YYYY-MM-DD 형식)
    nationality: string; // 국적
    debutDate: string; // 데뷔 날짜
    position: "TOP" | "JUNGLE" | "MID" | "AD" | "SUPPORT"; // 포지션
    teamId: string; // 소속 팀 ID
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      youtube?: string;
      twitch?: string;
    }; // SNS 링크
    fanVotes?: number; // 팬 투표 수
  }


export type PlayerCardData = Pick<Player, "id" | "name" | "nickname" | "position" | "socialLinks">;