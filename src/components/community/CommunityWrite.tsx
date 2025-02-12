"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function PostWrite() {
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

    // TODO: image를 제외한 post 먼저 생성하고,  image를 따로 업로드해서 연결할지, Image와 post를 한번에 생성할지 결정해야함.

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
