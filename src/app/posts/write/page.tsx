"use client";

import { useSearchParams } from "next/navigation"; // 쿼리 파라미터를 가져오기 위한 훅
import CommunityWrite from "@/src/components/community/CommunityWrite"; // CommunityWrite 컴포넌트
import { useAuth } from "@/src/context/AuthContext"; // 로그인 여부 확인

export default function CommunityWritePage() {
  const searchParams = useSearchParams(); // 쿼리 파라미터 가져오기
  const type = searchParams.get("type"); 
  const entityId = searchParams.get("entityId");
  
  const { user } = useAuth(); // 로그인 여부 확인

  if (!user) {
    // 로그인되지 않은 경우 로그인 페이지로 리디렉션
    window.location.href = "/login";
    return null;
  }

  if (!type || !entityId) {
    return <p>잘못된 요청입니다.</p>; // type이나 entityId가 없으면 오류 처리
  }

  return (
    <CommunityWrite
      type={type as "team" | "player"}
      entityId={Number(entityId)}
      userId={user.id} 
    />
  );
}
