"use client";

import CommunityWrite from "@/src/components/community/CommunityWrite"; // CommunityWrite 컴포넌트
import { useAuth } from "@/src/context/AuthContext"; // 로그인 여부 확인
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommunityWritePage() {
  const pathname = usePathname(); // 현재 경로를 가져오는 훅

  const entityIdStr = pathname.split("/")[3]; // URL에서 'id' 값을 가져오기
  const entityId = Number(entityIdStr); // 'entityId'를 숫자로 변환

  const { user } = useAuth(); // 로그인 여부 확인
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  console.log(user);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login"; // 로그인되지 않은 경우 로그인 페이지로 리디렉션
    } else {
      setLoading(false); // 로그인 된 경우 로딩 종료
    }
  }, [user]);

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 상태일 때 표시할 메시지
  }

  if (isNaN(entityId) || !entityId) {
    return <p>잘못된 요청입니다.</p>; // entityId가 유효하지 않으면 오류 처리
  }

  return (
    <CommunityWrite
      type={"team"}
      entityId={entityId} // 유효한 entityId 전달
    />
  );
}
