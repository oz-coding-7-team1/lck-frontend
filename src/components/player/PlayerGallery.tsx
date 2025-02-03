import React from "react";

interface PlayerGalleryProps {
  playerId: string;
}

function PlayerGallery({ playerId }: PlayerGalleryProps) {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold">갤러리</h2>
      <p>{playerId}의 이미지들이 여기에 표시됩니다.</p>
    </div>
  );
}

export default PlayerGallery;