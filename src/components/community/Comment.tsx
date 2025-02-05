"use client";

import { useState } from "react";

interface CommentProps {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
  isAuthor: boolean;
  onDelete: (id: number) => void;
}

export default function Comment({ id, author, content, createdAt, likes, isAuthor, onDelete }: CommentProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded-lg flex flex-col">
      <div className="flex justify-between items-center">
        <p className="font-bold">{author}</p>
        <span className="text-gray-500 text-sm">{createdAt}</span>
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
        <button onClick={handleLike} className="text-lg">
          {liked ? "❤️" : "🤍"} {likeCount}
        </button>

        {isAuthor && (
          <div className="flex space-x-2">
            {isEditing ? (
              <button onClick={handleSaveEdit} className="text-blue-500">저장</button>
            ) : (
              <button onClick={handleEdit} className="text-gray-500">수정</button>
            )}
            <button onClick={() => onDelete(id)} className="text-red-500">삭제</button>
          </div>
        )}
      </div>
    </div>
  );
}
