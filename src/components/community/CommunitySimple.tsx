/* eslint-disable @next/next/no-img-element */
"use client"; // 클라이언트 컴포넌트

import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Post } from "@/src/types/community";
import { communityApi } from "@/src/services/communityApi";

interface CommunityProps {
  type: "team" | "player"; // 팀 또는 선수 커뮤니티
  entityId: number; // 팀 ID 또는 선수 ID
}

export default function CommunitySimple({ type, entityId }: CommunityProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (type === "player") {
          response = await communityApi.getPlayerPosts(entityId); // 선수 커뮤니티 게시글 조회
        } else {
          response = await communityApi.getTeamPosts(entityId); // 팀 커뮤니티 게시글 조회
        }
        setPosts(response.data); 
      } catch (err) {
        setError("게시글을 불러오는 데 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [type, entityId]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">커뮤니티</h2>
        <Link href={`/community/${type}/${entityId}/posts/write`} className="border px-4 py-2 rounded-lg">
          글쓰기
        </Link>
      </div>

      <div className="space-y-6">
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg shadow">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <p className="font-bold">{post.user}</p>
              </div>

              {/* 링크에 type, entityId 쿼리 파라미터 추가 */}
              <Link href={`/community/${type}/${entityId}/posts/${post.id}`} className="block mt-2">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-gray-500">{post.content}</p>
                {/* Swiper 적용된 이미지 슬라이드 */}
                {post.images?.length > 0 && (
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    loop
                    className="mt-4"
                  >
                    {post.images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={img}
                          alt={`이미지 ${index + 1}`}
                          className="rounded-lg w-full h-auto"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </Link>

              <div className="mt-2 flex justify-between text-gray-500 text-sm">
                <span>{post.created_at}</span>
                <div className="flex space-x-4">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments?.length || 0}</span> 
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
