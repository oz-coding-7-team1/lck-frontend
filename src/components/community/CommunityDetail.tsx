/* eslint-disable @next/next/no-img-element */
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

interface CommunityDetailProps {
  type: "team" | "player"; // 'team' 또는 'player' 타입
  entityId: number; // 팀 ID 또는 선수 ID
  postId: number;   // 게시글 ID
}

export default function CommunityDetail({ type, entityId, postId }: CommunityDetailProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 게시글과 댓글 데이터 가져오기
  useEffect(() => {
  console.log("type:", type);
  console.log("entityId:", entityId);
  console.log("postId:", postId);

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


  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container max-w-[695px] mx-auto p-6">
      <button className="mb-4 text-blue-500" onClick={() => window.history.back()}>
        ← 뒤로가기
      </button>

      <h1 className="text-2xl font-bold">{post?.title}</h1>
      <p className="text-gray-500">
        {post?.user} · {post?.created_at}
      </p>

      {/* 이미지 슬라이드 */}
      {post?.images?.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop
          className="mt-4"
        >
          {post.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`게시글 이미지 ${index + 1}`} className="rounded-lg w-full h-auto" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <p className="mt-4">{post?.content}</p>

      <div className="mt-4 flex items-center space-x-4">
        <button onClick={() => {}} className="text-lg">
          ❤️ {post?.likes}
        </button>
        <span>💬 {comments.length}</span>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">댓글</h3>
        <div className="mt-2 space-y-2">
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
