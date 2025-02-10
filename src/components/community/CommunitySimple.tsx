"use client"; // 클라이언트 컴포넌트

import { useState } from "react";
import Link from "next/link";
import { CommunityPost } from "@/src/types/community";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 추후 무한 스크롤 추가해야함

interface CommunityProps {
  type: "team" | "player";
  entityId: number; // 팀 ID 또는 선수 ID
}

const samplePosts: CommunityPost[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  author: "사용자 닉네임",
  title: `글쓰기 제목 ${i + 1}`,
  content: `본문 내용 미리보기...`,
  images: ["/images/sample1.jpg", "/images/sample2.jpg"],
  createdAt: "2025.01.01",
  likes: 200 + i,
  comments: 50 + i,
}));

export default function CommunitySimple({ type, entityId }: CommunityProps) {
  const [posts, setPosts] = useState<CommunityPost[]>(samplePosts);
  const [loading, setLoading] = useState(false);


  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">커뮤니티</h2>
        <Link href={`/posts/write?type=${type}&id=${entityId}`} className="border px-4 py-2 rounded-lg">
          글쓰기
        </Link>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <p className="font-bold">{post.author}</p>
            </div>

            <Link href={`/posts/${post.id}`} className="block mt-2">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-gray-500">{post.content}</p>
              {/* Swiper 적용된 이미지 슬라이드 */}
              {post.images.length > 0 && (
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
              <span>{post.createdAt}</span>
              <div className="flex space-x-4">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && <p className="text-center mt-4">로딩 중...</p>}
    </>
  );
}
