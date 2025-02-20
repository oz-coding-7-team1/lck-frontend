// Post 타입 정의 (게시글)
export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user: string;
  player_id?: number; // 선수 커뮤니티
  team_id?: number; // 팀 커뮤니티
  comments?: PostComment[];
  likes: number; // 게시물 좋아요수
  isLike?: boolean; //게시물 좋아요 클릭 여부
  images?: string[];
}

// Comment 타입 정의 (댓글)
export interface PostComment {
  id: number;
  content: string;
  created_at: string;
  updated_at?: string;
  user: string;
  parent_id?: number;
}
