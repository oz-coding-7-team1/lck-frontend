"use client"; // 클라이언트 컴포넌트

import { usePathname } from "next/navigation";
import CommunityDetail from "@/src/components/community/CommunityDetail";

export default function PlayerCommunityDetailPage() {
  const pathname = usePathname(); // 현재 경로를 가져오는 훅

  const entityId = pathname.split("/")[2]; // URL에서 'id' 값을 가져오기
  const postId = pathname.split("/")[4]; // URL에서 'postId' 값을 가져오기

  // 쿼리 파라미터와 postId가 없으면 오류 메시지 반환
  if (!entityId || !postId) {
    return <p>잘못된 요청입니다.</p>;
  }

  return (
    <CommunityDetail
      type={"player"}  // 쿼리 파라미터 'type'을 그대로 전달
      entityId={Number(entityId)}  // 'entityId'는 숫자로 처리
      postId={Number(postId)}  // 'postId'는 숫자로 처리
    />
  );
}
