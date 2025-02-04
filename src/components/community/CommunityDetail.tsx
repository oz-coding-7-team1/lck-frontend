"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Comment from "@/src/components/community/Comment";
import { CommunityPost } from "@/src/types/community";

const samplePost: CommunityPost = {
    id: 1,
    author: "사용자 닉네임",
    title: "글쓰기 제목",
    content: "여기에 본문이 들어갑니다.",
    images: ["/images/sample1.jpg", "/images/sample2.jpg", "/images/sample3.jpg"],
    createdAt: "2025.01.01",
    likes: 200,
    comments: 50,
  };
  
  export default function CommunityDetail({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [post, setPost] = useState(samplePost);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([
      { id: 1, author: "댓글 작성자1", content: "첫 번째 댓글", createdAt: "2025.01.01", likes: 10, isAuthor: false },
      { id: 2, author: "나", content: "내가 작성한 댓글", createdAt: "2025.01.02", likes: 5, isAuthor: true },
    ]);
  
    const handleLike = () => {
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };
  
    const handleAddComment = () => {
      if (!comment.trim()) return;
      const newComment = {
        id: comments.length + 1,
        author: "나",
        content: comment,
        createdAt: new Date().toISOString().split("T")[0],
        likes: 0,
        isAuthor: true,
      };
      setComments([...comments, newComment]);
      setComment("");
    };
  
    const handleDeleteComment = (id: number) => {
      setComments(comments.filter((c) => c.id !== id));
    };
  
    return (
      <div className="container mx-auto p-6">
        <button className="mb-4 text-blue-500" onClick={() => router.back()}>
          ← 뒤로가기
        </button>
  
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-gray-500">{post.author} · {post.createdAt}</p>
  
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
                  alt={`게시글 이미지 ${index + 1}`}
                  className="rounded-lg w-full h-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
  
        <p className="mt-4">{post.content}</p>
  
        <div className="mt-4 flex items-center space-x-4">
          <button onClick={handleLike} className="text-lg">
            {liked ? "❤️" : "🤍"} {likeCount}
          </button>
          <span>💬 {comments.length}</span>
        </div>
  
        <div className="mt-6">
          <h3 className="text-lg font-bold">댓글</h3>
          <div className="mt-2 space-y-2">
            {comments.map((cmt) => (
              <Comment key={cmt.id} {...cmt} onDelete={handleDeleteComment} />
            ))}
          </div>
        </div>
  
        <div className="mt-4 flex">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="border flex-1 p-2 rounded-lg"
          />
          <button
            onClick={handleAddComment}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            작성
          </button>
        </div>
      </div>
    );
  }
