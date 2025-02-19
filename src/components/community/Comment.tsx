"use client";

import { useState } from "react";
import { communityApi } from "@/src/services/communityApi";
import { PostComment } from "@/src/types/community";

export default function Comment({
  id,
  user,
  content,
  created_at,
  type, // 추가된 type (team or player)
}: PostComment & { postId: number; type: "team" | "player" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);


  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = async () => {
    setIsEditing(false);
    if (type === "player") {
      // 수정된 댓글을 서버에 저장
      await communityApi.updatePlayerComment(id, { content: editedContent });
    } else {
      // 수정된 댓글을 서버에 저장
      await communityApi.updateTeamComment(id, { content: editedContent });
    }
  };

  const handleDelete = async () => {
    if (type === "player") {
      // 선수 댓글 삭제
      await communityApi.deletePlayerComment(id);
    } else {
      // 팀 댓글 삭제
      await communityApi.deleteTeamComment(id);
    }
    onDelete(id);
  };

  return (
    <div className="p-4 border rounded-lg flex flex-col">
      <div className="flex justify-between items-center">
        <p className="font-bold">{user}</p>
        <span className="text-gray-500 text-sm">{created_at}</span>
      </div>

      {isEditing ? (
        <textarea
          className="w-full border p-2 rounded-lg mt-2"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <p className="mt-2">{content}</p>
      )}

      <div className="mt-2 flex justify-between text-gray-500 text-sm">

        
          <div className="flex space-x-2">
            {isEditing ? (
              <button onClick={handleSaveEdit} className="text-blue-500">
                저장
              </button>
            ) : (
              <button onClick={handleEdit} className="text-gray-500">
                수정
              </button>
            )}
            <button onClick={handleDelete} className="text-red-500">
              삭제
            </button>
          </div>
      </div>
    </div>
  );
}
