import { Player } from "./player";

// 팀 타입 정의
export interface Team {
    id: number; // 팀의 고유 ID
    name: string; // 팀명
    players: Player[]; // 소속 선수 목록
    social?: {
      insta?: string;
      X?: string;
      youtube?: string;
      facebook?: string;
      soop?: string;
      chzzk?: string;
    }; // 팀의 SNS 링크
    is_subscribed?: boolean;
    profile_image_url?: string;
    background_image_url?: string; // 배경이미지
  }

