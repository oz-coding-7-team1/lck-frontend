import { useState, useEffect } from "react";
import { communityApi } from "@/src/services/communityApi"; // 좋아요 관련 API 호출
import { useAuth } from "@/src/context/AuthContext"; // 로그인 상태 확인

interface LikeButtonProps {
  postId: number; // 좋아요 버튼이 속한 게시글의 ID
}

export default function LikeButton({ postId }: LikeButtonProps) {
  const [liked, setLiked] = useState(false); // 좋아요 여부 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const { user } = useAuth(); // 로그인된 사용자 정보

  useEffect(() => {
    // 페이지 로드 시 게시글의 좋아요 상태를 확인
    const fetchLikeStatus = async () => {
      if (!user) return; // 로그인되지 않으면 좋아요 상태 확인 불가

      try {
        const { data } = await communityApi.getPostLikeStatus(postId, user.id);
        setLiked(data.liked); // 서버에서 받은 좋아요 상태로 업데이트
      } catch (err) {
        console.error(err);
        setError("좋아요 상태를 불러오는 데 실패했습니다.");
      }
    };

    fetchLikeStatus();
  }, [postId, user]);

  const handleLike = async () => {
    if (!user) {
      setError("로그인 후 좋아요를 누를 수 있습니다.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userId = Number(user.id); // Convert user.id to number

      if (liked) {
        // 이미 좋아요가 되어 있으면 좋아요 취소
        await communityApi.unlikePost(postId, userId);
      } else {
        // 좋아요 안 되어 있으면 좋아요 추가
        await communityApi.likePost(postId, userId);
      }

      setLiked(!liked); // 좋아요 상태 토글
    } catch (err) {
      console.error(err);
      setError("좋아요 처리에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleLike}
        disabled={loading} // 로딩 중에는 버튼 비활성화
        className={`p-2 ${
          liked ? "bg-blue-500" : "bg-gray-300"
        } text-white rounded-lg`}
      >
        {loading ? "처리 중..." : liked ? "좋아요 취소" : "좋아요"}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
