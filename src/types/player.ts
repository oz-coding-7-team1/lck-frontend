export type playerPositionType = "top" | "jungle" | "mid" | "bot" | "support";

export interface Player {
  id: number; // 선수의 고유 ID
  realname: string; // 선수 이름
  nickname: string; // 게임 내 닉네임
  date_of_birth: string; // 생년월일 (YYYY-MM-DD 형식)
  nationality: string; // 국적
  debut_date: string; // 데뷔 날짜
  position: playerPositionType; // 포지션
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
  profile_image_url: string | "/images/default-avatar.svg"; //선수 프로필 이미지
  background_image_url: string //선수 배경 이미지
  is_subscribed?: boolean;
}

export type PlayerCardData = Pick<
  Player,
  "id" | "realname" | "nickname" | "position" | "social" | "profile_image_url"
>;


