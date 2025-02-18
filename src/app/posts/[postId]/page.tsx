"use client"; // 클라이언트 컴포넌트

import { usePathname, useSearchParams } from "next/navigation"; // next/navigation에서 제공하는 훅 사용
import CommunityDetail from "@/src/components/community/CommunityDetail";

export default function CommunityDetailPage() {
  const pathname = usePathname(); // 현재 경로를 가져오는 훅
  const searchParams = useSearchParams(); // 쿼리 파라미터 가져오기

  const type = searchParams.get("type");  // 쿼리 파라미터에서 type 값 가져오기
  const entityId = searchParams.get("id"); // 쿼리 파라미터에서 id 값 가져오기
  const postId = pathname.split("/").pop(); // URL에서 마지막 부분(postId)을 가져오기

  // 쿼리 파라미터와 postId가 없으면 오류 메시지 반환
  if (!type || !entityId || !postId) {
    return <p>잘못된 요청입니다.</p>;
  }

  return (
    <CommunityDetail
      type={type as "team" | "player"}  // 'type'을 'team' 또는 'player'로 처리
      entityId={Number(entityId)}  // 'entityId'는 숫자로 처리
      postId={Number(postId)}  // 'postId'는 숫자로 처리
    />
  );
}
