export interface Player {
  id: number;
  nickname: string;
  realname: string;
  profileImageUrl: string;
  team_id: number | null;
  position: string;
  nationality: string;
  date_of_birth: string;
  debut_date: string;
  agency: string;
  gamename: string;
  fanVotes: number;
  social: {
    twitter?: string;
    instagram?: string;
    twitch?: string;
  };
}

export interface Team {
  id: number;
  name: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
}

export interface TermAgreement {
  terms_id: number;
  agreed: number;
}

export interface RegisterUserData {
  email: string;
  password: string;
  nickname: string;
  agreements: TermAgreement[];
}

export interface APIResponse<T> {
  find(arg0: (p: Player) => boolean): unknown;
  name: ReactNode;
  data: T;
  status: number;
  message?: string;
}

export interface Schedule {
  id: number;
  title: string;
  category: string;
  detail: string;
  start_date: string;
  end_date: string;
  place: string;
  player_id?: number;
  team_id?: number;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
}

export interface Terms {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CloudImage {
  id: number;
  url: string;
  player_id?: number;
  team_id?: number;
}

export interface Subscription {
  id: number;
  user_id: number;
  player_id?: number;
  team_id?: number;
}
