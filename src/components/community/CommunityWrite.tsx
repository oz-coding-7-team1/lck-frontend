// src/components/community/CommunityWrite.tsx
"use client"; // 클라이언트 컴포넌트

import { useState } from "react";
import { useRouter } from "next/navigation";
import { communityApi } from "@/src/services/communityApi"; // communityApi 가져오기
import Image from "next/image";

interface CommunityWriteProps {
  type: "team" | "player"; // 커뮤니티 타입
  entityId: number; // 팀 ID 또는 선수 ID
  userId: number; // 로그인한 사용자 ID
}

export default function CommunityWrite({ type, entityId, userId }: CommunityWriteProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      if (images.length + selectedFiles.length > 10) {
        alert("최대 10개의 이미지만 업로드할 수 있습니다.");
        return;
      }
      setImages([...images, ...selectedFiles]);
    }
  };

  // 게시글 작성 처리
  const handleSubmit = async () => {
    if (!title || !content) {
      alert("제목과 본문을 입력해주세요.");
      return;
    }

    // 게시글 데이터 준비
    const newPost = {
      title,
      content,
      images: images.map((file) => URL.createObjectURL(file)), // 이미지는 미리보기 URL로 저장
      likes: 0,
      comments: [],
      user_id: userId,
      created_at: new Date().toISOString(),
    };

    try {
      let response;
      if (type === "player" && entityId) {
        // 게시글 생성 (자동으로 postId 생성됨)
        response = await communityApi.createPlayerPost(entityId, newPost); // 선수 커뮤니티 게시글 생성
      } else if (type === "team" && entityId) {
        // 게시글 생성 (자동으로 postId 생성됨)
        response = await communityApi.createTeamPost(entityId, newPost); // 팀 커뮤니티 게시글 생성
      }

      if (response?.data) {
        const createdPostId = response.data.id; // 서버에서 생성된 postId 가져오기
        alert("게시글이 작성되었습니다.");
        router.push(`/posts/${createdPostId}`); // 게시글 작성 후 해당 커뮤니티 페이지로 이동
      } else {
        alert("게시글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container p-6 mx-auto">
      <button className="mb-4 text-blue-500" onClick={() => router.back()}>
        ← 뒤로가기
      </button>

      <h1 className="mb-4 text-2xl font-bold">게시글 작성</h1>

      <div className="mb-4">
        <label className="block font-semibold">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="제목을 입력하세요"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">본문</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 p-2 border rounded-lg"
          placeholder="내용을 입력하세요"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">이미지 첨부 (최대 10개)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full"
        />
        <div className="grid grid-cols-5 gap-2 mt-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(image)}
                alt={`첨부 이미지 ${index + 1}`}
                width={100}
                height={100}
                className="rounded-lg"
              />
              <button
                className="absolute top-0 right-0 px-2 py-1 text-xs text-white bg-red-500 rounded-full"
                onClick={() => setImages(images.filter((_, i) => i !== index))}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2 text-white bg-blue-500 rounded-lg"
      >
        작성 완료
      </button>
    </div>
  );
}
