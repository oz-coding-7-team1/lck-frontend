
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

export interface Subscription {
  id: number;
  user_id: number;
  player_id?: number;
  team_id?: number;
}

export interface CloudImage {
    id: number;
    player_id?: number;
    team_id?: number;
    category: string;
    image_url: string;
    uploaded_by: number;
    uploaded_at: Date;
}

export interface SubscriptionCount {
  count: number;
}