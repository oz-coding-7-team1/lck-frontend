"use client";

import { useState } from "react";
import { ScheduleEvent } from "@/src/types/schedule";
import ScheduleList from "@/src/components/schedule/ScheduleList";

const initialEvents: ScheduleEvent[] = [
  {
    id: 1,
    teamId: 101,
    title: "T1 vs DK",
    start: new Date(2025, 2, 15, 19, 30),
    end: new Date(2025, 2, 15, 21, 30),
    category: "game",
    location: "서울 롤파크",
    allDay: false,
  },
  {
    id: 2,
    teamId: 101,
    title: "T1 vs KT",
    start: new Date(2025, 2, 24, 19, 30),
    end: new Date(2025, 2, 24, 21, 30),
    category: "game", 
    location: "서울 롤파크",
    allDay: false,
  },
  {
    id: 3,
    teamId: 102,
    title: "GEN.G vs DK",
    start: new Date(2025, 2, 18, 18, 0),
    end: new Date(2025, 2, 18, 20, 0),
    category: "game",
    location: "부산 e스포츠 아레나",
    allDay: false,
  },
  {
    id: 4,
    teamId: 101,
    title: "T1 팬미팅",
    start: new Date(2025, 2, 24, 19, 30),
    end: new Date(2025, 2, 24, 21, 30),
    category: "metting",
    location: "서울 롤파크",
    allDay: false,
  },
];

interface TeamScheduleProps {
  teamId: number;
}

export default function TeamSchedule({ teamId }: TeamScheduleProps) {
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents);

  // ✅ "경기" 카테고리만 필터링
  const teamEvents = events.filter((event) => event.teamId === teamId && event.category === "game");

  return (
    <>
      <h2 className="text-xl font-bold">🏆 팀 경기 일정</h2>
      {teamEvents.length > 0 ? (
        <ScheduleList events={teamEvents} />
      ) : (
        <p className="text-gray-500 mt-3">현재 등록된 경기 일정이 없습니다.</p>
      )}
    </>
  );
}
