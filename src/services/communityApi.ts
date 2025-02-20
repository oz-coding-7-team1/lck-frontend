import { Post, PostComment } from "../types/community";
import api from "./api";

const getAuthToken = () => {
  const token = localStorage.getItem("accessToken");
  //console.log("🔍 가져온 토큰:", token); // 디버깅: 토큰이 제대로 가져와지는지 확인
  if (!token) {
    console.error("❌ 토큰이 없습니다.");
  }
  return token;
};

export const communityApi = {
  // 선수 커뮤니티 게시글 조회
  getPlayerPosts: (playerId: number) =>
    api.get<Post[]>(`/communities/player/${playerId}/posts/`),

  // 선수 커뮤니티 게시글 생성
  createPlayerPost: (entityId: number, postData: FormData) =>
    api.post<Post>(`/players/${entityId}/posts/`, postData),

  // 선수 커뮤니티 게시글 상세 조회
  getPlayerPostById: (playerId: number, postId: number) =>
    api.get<Post>(`/communities/player/${playerId}/posts/${postId}/`),

  // 선수 커뮤니티 게시글 수정
  updatePlayerPost: (playerId: number, postId: number, postData: Post) =>
    api.put<Post>(
      `/communities/player/${playerId}/posts/${postId}/`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
        },
      }
    ),

  // 선수 커뮤니티 게시글 삭제
  deletePlayerPost: (playerId: number, postId: number) =>
    api.delete<void>(`/communities/player/${playerId}/posts/${postId}/`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 선수 커뮤니티 댓글 작성
  createPlayerComment: (
    playerId: number,
    postId: number,
    commentData: PostComment
  ) =>
    api.post<Comment>(
      `/communities/player/${playerId}/posts/${postId}/comments/`,
      commentData,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
        },
      }
    ),

  // 선수 커뮤니티 댓글 상세 조회
  getPlayerCommentById: (commentId: number) =>
    api.get<Comment>(`/communities/player/comments/${commentId}/`),

  // 선수 커뮤니티 댓글 수정
  updatePlayerComment: (commentId: number, commentData: PostComment) =>
    api.put<Comment>(
      `/communities/player/comments/${commentId}/`,
      commentData,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
        },
      }
    ),

  // 선수 커뮤니티 댓글 삭제
  deletePlayerComment: (commentId: number) =>
    api.delete<void>(`/communities/player/comments/${commentId}/`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 팀 커뮤니티 게시글 조회
  getTeamPosts: (teamId: number) =>
    api.get<Post[]>(`/communities/team/${teamId}/posts/`),

  // 팀 커뮤니티 게시글 생성
  createTeamPost: (entityId: number, postData: FormData) =>
    api.post<Post>(`/teams/${entityId}/posts/`, postData),

  // 팀 커뮤니티 게시글 상세 조회
  getTeamPostById: (teamId: number, postId: number) =>
    api.get<Post>(`/communities/team/${teamId}/posts/${postId}/`),

  // 팀 커뮤니티 게시글 수정
  updateTeamPost: (teamId: number, postId: number, postData: Post) =>
    api.put<Post>(`/communities/team/${teamId}/posts/${postId}/`, postData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 팀 커뮤니티 게시글 삭제
  deleteTeamPost: (teamId: number, postId: number) =>
    api.delete<void>(`/communities/team/${teamId}/posts/${postId}/`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 팀 커뮤니티 댓글 작성
  createTeamComment: (
    teamId: number,
    postId: number,
    commentData: PostComment
  ) =>
    api.post<Comment>(
      `/communities/team/${teamId}/posts/${postId}/comments/`,
      commentData,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
        },
      }
    ),

  // 팀 커뮤니티 댓글 상세 조회
  getTeamCommentById: (commentId: number) =>
    api.get<Comment>(`/communities/team/comments/${commentId}/`),

  // 팀 커뮤니티 댓글 수정
  updateTeamComment: (commentId: number, commentData: PostComment) =>
    api.put<Comment>(`/communities/team/comments/${commentId}/`, commentData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 팀 커뮤니티 댓글 삭제
  deleteTeamComment: (commentId: number) =>
    api.delete<void>(`/communities/team/comments/${commentId}/`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // Get the like status of a post
  getPostLikeStatus: async (postId: number, userId: number) => {
    return api.get<{ liked: boolean }>(`/posts/${postId}/like-status`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Authorization header
      },
      params: {
        userId, // Pass the userId as a query parameter if needed
      },
    });
  },

  // Unlike a post
  unlikePost: async (postId: number, userId: number) => {
    return api.delete<void>(`/posts/${postId}/likes`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Authorization header
      },
      data: {
        userId, // Pass the userId if needed
      },
    });
  },

  // Like a post
  likePost: async (postId: number, userId: number) => {
    return api.post<void>(
      `/posts/${postId}/likes`,
      {
        userId, // Pass the userId if needed
      },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Authorization header
        },
      }
    );
  },
};
