import { Post, PostComment } from "../types/community";
import api from "./api";
import { APIResponse } from "@/src/types/api";

// 인증 토큰을 가져오는 함수 (localStorage에서 토큰을 읽어옴)
const getAuthToken = () => {
  const token = localStorage.getItem("accessToken");
  console.log("🔍 가져온 토큰:", token); // 디버깅: 토큰이 제대로 가져와지는지 확인
  if (!token) {
    console.error("❌ 토큰이 없습니다.");
  }
  return token;
};


export const communityApi = {
  // 선수 커뮤니티 게시글 조회
  getPlayerPosts: (playerId: number) =>
    api.get<APIResponse<Post[]>>(`/communities/player/${playerId}/posts/`),

  // 선수 커뮤니티 게시글 생성
  createPlayerPost: (playerId: number, formData: FormData) =>
    api.post(`/communities/player/${playerId}/posts/`, formData, {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 선수 커뮤니티 게시글 상세 조회
  getPlayerPostById: (playerId: number, postId: number) =>
    api.get<APIResponse<Post>>(`/communities/player/${playerId}/posts/${postId}/`),

  // 선수 커뮤니티 게시글 수정
  updatePlayerPost: (playerId: number, postId: number, postData: Post) =>
    api.put<APIResponse<Post>>(`/communities/player/${playerId}/posts/${postId}/`, postData, {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 선수 커뮤니티 게시글 삭제
  deletePlayerPost: (playerId: number, postId: number) =>
    api.delete<APIResponse<void>>(`/communities/player/${playerId}/posts/${postId}/`, {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 선수 커뮤니티 댓글 작성
  createPlayerComment: (playerId: number, postId: number, commentData: PostComment) =>
    api.post<APIResponse<Comment>>(`/communities/player/${playerId}/posts/${postId}/comments/`, commentData, {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 선수 커뮤니티 댓글 상세 조회
  getPlayerCommentById: (commentId: number) =>
    api.get<APIResponse<Comment>>(`/communities/player/comments/${commentId}/`),

  // 선수 커뮤니티 댓글 수정
  updatePlayerComment: (commentId: number, commentData: PostComment) =>
    api.put<APIResponse<Comment>>(`/communities/player/comments/${commentId}/`, commentData, {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 선수 커뮤니티 댓글 삭제
  deletePlayerComment: (commentId: number) =>
    api.delete<APIResponse<void>>(`/communities/player/comments/${commentId}/`, {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 팀 커뮤니티 게시글 조회
  getTeamPosts: (teamId: number) =>
    api.get<APIResponse<Post[]>>(`/communities/team/${teamId}/posts/`),

  // 팀 커뮤니티 게시글 생성
  createTeamPost: (teamId: number, postData: Post) =>
    api.post<APIResponse<Post>>(`/communities/team/${teamId}/posts/`, postData, {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 팀 커뮤니티 게시글 상세 조회
  getTeamPostById: (teamId: number, postId: number) =>
    api.get<APIResponse<Post>>(`/communities/team/${teamId}/posts/${postId}/`),

  // 팀 커뮤니티 게시글 수정
  updateTeamPost: (teamId: number, postId: number, postData: Post) =>
    api.put<APIResponse<Post>>(`/communities/team/${teamId}/posts/${postId}/`, postData, {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 팀 커뮤니티 게시글 삭제
  deleteTeamPost: (teamId: number, postId: number) =>
    api.delete<APIResponse<void>>(`/communities/team/${teamId}/posts/${postId}/`, {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 팀 커뮤니티 댓글 작성
  createTeamComment: (teamId: number, postId: number, commentData: PostComment) =>
    api.post<APIResponse<Comment>>(`/communities/team/${teamId}/posts/${postId}/comments/`, commentData, {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 팀 커뮤니티 댓글 상세 조회
  getTeamCommentById: (commentId: number) =>
    api.get<APIResponse<Comment>>(`/communities/team/comments/${commentId}/`),

  // 팀 커뮤니티 댓글 수정
  updateTeamComment: (commentId: number, commentData: PostComment) =>
    api.put<APIResponse<Comment>>(`/communities/team/comments/${commentId}/`, commentData, {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),

  // 팀 커뮤니티 댓글 삭제
  deleteTeamComment: (commentId: number) =>
    api.delete<APIResponse<void>>(`/communities/team/comments/${commentId}/`, {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`, // Authorization 헤더에 토큰 추가
      },
    }),
};
