/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cloudImageApi } from "@/src/services/cloudImageApi"; // API 호출을 위한 import
import { CloudImage } from "@/src/types/api"; // CloudImage 타입을 사용

interface PlayerGalleryProps {
  playerId: number;
}

export default function PlayerGallery({ playerId }: { playerId: number }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<CloudImage[]>([]); // 이미지 목록 상태
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await cloudImageApi.getPlayerGalleryImages(playerId);
        
        const sortedImages = response.data.sort((a, b) => {
          // 최신 순으로 정렬: uploaded_at 값을 비교
          return new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime();
        });
        setImages(sortedImages);
      } catch (error) {
        console.error("이미지 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [playerId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">갤러리</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer ${
                index === 0 ? "col-span-2 row-span-2" : index === 7 ? "col-span-2" : "col-span-1"
              }`}
              onClick={() => setSelectedImage(image.image_url)} // 이미지 URL을 상태에 저장
            >
              <Image
                src={image.image_url}
                alt={`image.id`}
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      )}

      {/* 레이어 팝업 (모달) */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative p-4">
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              ✖
            </button>
            <Image
              src={selectedImage}
              alt="Selected Image"
              width={600}
              height={600}
              className="max-w-full max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
