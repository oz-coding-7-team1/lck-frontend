import React from "react";

interface PlayerCommunityProps {
  playerId: string;
}

function PlayerCommunity({ playerId }: PlayerCommunityProps) {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold">커뮤니티</h2>
      <p>{playerId}에 대한 팬들의 게시물이 여기에 표시됩니다.</p>
    </div>
  );
}

export default PlayerCommunity;