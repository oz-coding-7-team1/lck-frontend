import { useState } from "react";
import { useRouter } from "next/navigation";
import { communityApi } from "@/src/services/communityApi"; // communityApi 가져오기
import { useAuth } from "@/src/context/AuthContext";

interface CommunityWriteProps {
  type: "team" | "player"; // 커뮤니티 타입
  entityId: number; // 팀 ID 또는 선수 ID
}

export default function CommunityWrite({ type, entityId }: CommunityWriteProps) {
  const router = useRouter();
  const { user } = useAuth(); // 로그인된 사용자 정보 확인

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // 게시글 작성 처리
  const handleSubmit = async () => {
    if (!title || !content) {
      alert("제목과 본문을 입력해주세요.");
      return;
    }

    // 게시글 데이터
    const postData = {
      title,
      content,
    };

    // API 요청 전에 postData 출력
    console.log("🔍 요청 데이터:", postData);

    try {
      let response;
      if (type === "player" && entityId) {
        // 선수 커뮤니티 게시글 생성
        console.log("🔍 API 요청: 선수 커뮤니티 게시글 생성");
        response = await communityApi.createPlayerPost(entityId, postData);
      } else if (type === "team" && entityId) {
        // 팀 커뮤니티 게시글 생성
        console.log("🔍 API 요청: 팀 커뮤니티 게시글 생성");
        response = await communityApi.createTeamPost(entityId, postData);
      }

      // 응답 데이터 출력
      console.log("🔍 응답 데이터:", response?.data);

      if (response?.data) {
        const createdPostId = response.data.id; // 서버에서 생성된 postId 가져오기
        alert("게시글이 작성되었습니다.");
        router.push(`${createdPostId}`); // 게시글 작성 후 해당 커뮤니티 페이지로 이동
      } else {
        alert("게시글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
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

      <button
        onClick={handleSubmit}
        className="w-full py-2 text-white bg-blue-500 rounded-lg"
      >
        작성 완료
      </button>
    </div>
  );
}
