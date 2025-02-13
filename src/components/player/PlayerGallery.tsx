"use client";

import { useState } from "react";
import Image from "next/image";

interface PlayerGalleryProps {
  playerId: number;
}

const sampleImages = [
  "/images/sample1.jpg",
  "/images/sample2.jpg",
  "/images/sample3.jpg",
  "/images/sample4.jpg",
  "/images/sample5.jpg",
  "/images/sample6.jpg",
  "/images/sample7.jpg",
  "/images/sample8.jpg",
];

export default function PlayerGallery({ playerId }: PlayerGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">갤러리</h2>
      <div className="grid grid-cols-4 gap-2">
        {sampleImages.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer ${
              index === 0 ? "col-span-2 row-span-2" : index === 7 ? "col-span-2" : "col-span-1"
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`Gallery Image ${index + 1}`}
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>

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
