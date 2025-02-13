export interface Player {
    id: number; // 선수의 고유 ID
    realname: string; // 선수 이름
    nickname: string; // 게임 내 닉네임
    date_of_birth: string; // 생년월일 (YYYY-MM-DD 형식)
    nationality: string; // 국적
    debut_date: string; // 데뷔 날짜
    position: "TOP" | "JUNGLE" | "MID" | "BOT" | "SUPPORT"; // 포지션
    team_id: number; // 소속 팀 ID
    agency: string; // 소속사
    gamename: string; //롤 아이디
    social?: {
      insta?: string;
      youtube?: string;
      facebook?: string;
      X?: string;
      soop?: string;
      chzzk?: string;
    }; // SNS 링크
    fanVotes?: number; // 팬 투표 수
    profileImageUrl: string; //선수 프로필 이미지
    backgroundImageUrl?: string; //선수 상단 배경 이미지
  }


export type PlayerCardData = Pick<Player, "id" | "realname" | "nickname" | "position" | "social" | "profileImageUrl">;

// types/player.ts
export const samplePlayers: Player[] = [
    {
      id: 1,
      realname: "이상혁",
      nickname: "Faker",
      date_of_birth: "1996-05-07",
      nationality: "대한민국",
      debut_date: "2013-04-06",
      position: "MID",
      team_id: 101,
      agency: "FANABLE",
      gamename: "Hide on bush#KR1",
      social: {
        insta: "https://instagram.com/faker",
        X: "https://x.com/faker",
        youtube: "https://youtube.com/faker",
        soop: "https://soop.tv/faker",
      },
      fanVotes: 5000,
      profileImageUrl: "/images/profile/Faker.png",
      backgroundImageUrl: "/images/background/Faker.png",
    },
    {
      id: 2,
      realname: "류민석",
      nickname: "Keria",
      date_of_birth: "2002-10-14",
      nationality: "대한민국",
      debut_date: "2019-10-12",
      position: "SUPPORT",
      team_id: 101,
      agency: "FANABLE",
      gamename: "Keria#KR1",
      social: {
        insta: "https://instagram.com/keria",
        X: "https://x.com/keria",
        youtube: "https://youtube.com/keria",
        soop: "https://soop.tv/keria",
      },
      fanVotes: 4500,
      profileImageUrl: "/images/profile/Keria.png",
    },
    {
      id: 3,
      realname: "이민형",
      nickname: "Gumayusi",
      date_of_birth: "2002-02-06",
      nationality: "대한민국",
      debut_date: "2019-11-25",
      position: "BOT",
      team_id: 101,
      agency: "FANABLE",
      gamename: "Gumayusi#KR1",
      social: {
        insta: "https://instagram.com/gumayusi",
        X: "https://x.com/gumayusi",
        youtube: "https://youtube.com/gumayusi",
        soop: "https://soop.tv/gumayusi",
      },
      fanVotes: 4700,
      profileImageUrl: "/images/profile/Gumayusi.png",
    },
  ];
  