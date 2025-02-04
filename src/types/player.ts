export interface Player {
    id: number; // 선수의 고유 ID
    name: string; // 선수 이름
    nickname: string; // 게임 내 닉네임
    birthdate: string; // 생년월일 (YYYY-MM-DD 형식)
    nationality: string; // 국적
    debutDate: string; // 데뷔 날짜
    position: "TOP" | "JUNGLE" | "MID" | "AD" | "SUPPORT"; // 포지션
    teamId: number; // 소속 팀 ID
    agency: string; // 소속사
    gamename: string; //롤 아이디
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      youtube?: string;
      twitch?: string;
    }; // SNS 링크
    fanVotes?: number; // 팬 투표 수
  }


export type PlayerCardData = Pick<Player, "id" | "name" | "nickname" | "position" | "socialLinks">;

// types/player.ts
export const samplePlayers: Player[] = [
    {
      id: 1,
      name: "이상혁",
      nickname: "FAKER",
      birthdate: "1996-05-07",
      nationality: "대한민국",
      debutDate: "2013-04-06",
      position: "MID",
      teamId: 101,
      agency: "FANABLE",
      gamename: "Hide on bush#KR1",
      socialLinks: {
        instagram: "https://instagram.com/faker",
        twitter: "https://x.com/faker",
        youtube: "https://youtube.com/faker",
        soop: "https://soop.tv/faker",
      },
      fanVotes: 5000,
    },
    {
      id: 2,
      name: "류민석",
      nickname: "KERIA",
      birthdate: "2002-10-14",
      nationality: "대한민국",
      debutDate: "2019-10-12",
      position: "SUPPORT",
      teamId: 101,
      agency: "FANABLE",
      gamename: "Keria#KR1",
      socialLinks: {
        instagram: "https://instagram.com/keria",
        x: "https://x.com/keria",
        youtube: "https://youtube.com/keria",
        soop: "https://soop.tv/keria",
      },
      fanVotes: 4500,
    },
    {
      id: 3,
      name: "이민형",
      nickname: "GUMAYUSI",
      birthdate: "2002-02-06",
      nationality: "대한민국",
      debutDate: "2019-11-25",
      position: "AD",
      teamId: 101,
      agency: "FANABLE",
      gamename: "Gumayusi#KR1",
      socialLinks: {
        instagram: "https://instagram.com/gumayusi",
        x: "https://x.com/gumayusi",
        youtube: "https://youtube.com/gumayusi",
        soop: "https://soop.tv/gumayusi",
      },
      fanVotes: 4700,
    },
  ];
  