"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function CommunityWrite() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // "team" 또는 "player"
  const entityId = searchParams.get("id"); // 팀 ID 또는 선수 ID

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);

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

  const handleSubmit = () => {
    if (!title || !content) {
      alert("제목과 본문을 입력해주세요.");
      return;
    }

    const newPost = {
      id: Math.floor(Math.random() * 10000),
      author: "사용자 닉네임",
      title,
      content,
      images: images.map((file) => URL.createObjectURL(file)), // 업로드된 이미지 미리보기
      createdAt: new Date().toISOString().split("T")[0],
      likes: 0,
      comments: 0,
    };

    console.log("새 글 작성됨:", newPost);
    alert("게시글이 작성되었습니다.");
    router.push(type === "team" ? `/team/${entityId}` : `/player/${entityId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <button className="mb-4 text-blue-500" onClick={() => router.back()}>
        ← 뒤로가기
      </button>

      <h1 className="text-2xl font-bold mb-4">게시글 작성</h1>

      <div className="mb-4">
        <label className="block font-semibold">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded-lg"
          placeholder="제목을 입력하세요"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">본문</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded-lg h-40"
          placeholder="내용을 입력하세요"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">이미지 첨부 (최대 10개)</label>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="w-full" />
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
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
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
        className="w-full bg-blue-500 text-white py-2 rounded-lg"
      >
        작성 완료
      </button>
    </div>
  );
}
