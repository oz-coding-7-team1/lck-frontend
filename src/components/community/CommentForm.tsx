import { useState } from "react";
import { communityApi } from "@/src/services/communityApi";
import { PostComment } from "@/src/types/community";
import { useAuth } from "@/src/context/AuthContext";

interface CommentFormProps {
  entityId: number | null; // playerId 또는 teamId
  postId: number;
  type: "player" | "team";
  parentId?: number; // 대댓글을 위한 부모 댓글 ID (없으면 undefined)
  onCommentAdded: () => void;  // 댓글 작성 후 부모 컴포넌트에서 실행할 콜백 함수
}

export default function CommentForm({
  entityId,
  postId,
  type,
  parentId,
  onCommentAdded,
}: CommentFormProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth(); // 로그인 상태 확인

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      setError("댓글을 입력하세요.");
      return;
    }

    if (!user) {
      setError("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }

    setLoading(true);
    setError(null);

    // 댓글 데이터 준비
    const commentData: PostComment = {
      content,
      user: user?.id,  // 사용자 ID
      // 대댓글일 경우에만 parentId를 포함시킴
      ...(parentId && { parent: parentId }),
    };

    try {
      if (type === "player" && entityId) {
        await communityApi.createPlayerComment(entityId, postId, commentData); // 선수 댓글 작성
      } else if (type === "team" && entityId) {
        await communityApi.createTeamComment(entityId, postId, commentData); // 팀 댓글 작성
      }

      setContent("");  // 댓글 작성 후 입력 필드 초기화
      onCommentAdded();  // 부모 컴포넌트에서 댓글 추가 후 처리
    } catch (err) {
      setError("댓글 작성에 실패했습니다. 다시 시도해 주세요.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-red-500">로그인 후 댓글을 작성할 수 있습니다.</p>; // 로그인되지 않으면 메시지 표시
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold">댓글 작성</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded-lg mt-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 작성하세요..."
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-2 flex justify-between">
          <button
            type="submit"
            disabled={loading || !user}  // 로그인되지 않으면 버튼 비활성화
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            {loading ? "저장 중..." : "댓글 작성"}
          </button>
        </div>
      </form>
    </div>
  );
}
