"use client";

import { useState, useEffect } from "react";
import { communityApi } from "@/src/services/communityApi";
import { Post, PostComment } from "@/src/types/community";
import Comment from "@/src/components/community/Comment";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CommentForm from "./CommentForm";
import Image from "next/image";

interface CommunityDetailProps {
  type: "team" | "player"; // 'team' 또는 'player' 타입
  entityId: number; // 팀 ID 또는 선수 ID
  postId: number; // 게시글 ID
}

export default function CommunityDetail({
  type,
  entityId,
  postId,
}: CommunityDetailProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 게시글과 댓글 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        let response;
        if (type === "player") {
          response = await communityApi.getPlayerPostById(entityId, postId); // 선수 게시글
        } else {
          response = await communityApi.getTeamPostById(entityId, postId); // 팀 게시글
        }
        setPost(response.data);
        setComments(response.data.comments || []);
      } catch (err) {
        setError("게시글을 불러오는 데 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [type, entityId, postId]);

  // 댓글 추가 후 처리 함수
  const handleCommentAdded = () => {
    // 댓글 목록을 다시 가져오거나, 댓글 수를 업데이트하는 로직
    const fetchComments = async () => {
      try {
        let response;
        if (type === "player") {
          response = await communityApi.getPlayerPostById(entityId, postId);
        } else {
          response = await communityApi.getTeamPostById(entityId, postId);
        }
        setComments(response.data.comments || []);
      } catch (err) {
        setError("댓글을 불러오는 데 오류가 발생했습니다.");
        console.error(err);
      }
    };

    fetchComments();
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container max-w-[695px] mx-auto p-6">
      <button
        className="mb-4 text-blue-500"
        onClick={() => window.history.back()}
      >
        ← 뒤로가기
      </button>

      <h1 className="text-2xl font-bold">{post?.title || '제목 없음'}</h1>
      <p className="text-gray-500">
        {post?.user || '알 수 없음'} · {post?.created_at || '날짜 없음'}
      </p>

      {/* 이미지 슬라이드 */}
      {post?.images && post.images.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop
          className="mt-4"
        >
          {post.images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img}
                alt={`게시글 이미지 ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <p className="mt-4">{post?.content}</p>

      <div className="mt-6">
        <h3 className="text-lg font-bold">댓글 {comments.length}</h3>
        <CommentForm
          type={type}
          entityId={entityId}
          postId={postId}
          onCommentAdded={handleCommentAdded} // 부모에서 함수 전달
        />
        <div className="mt-2 space-y-2">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              {...comment}
              postId={postId}
              type={type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
