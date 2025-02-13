"use client";

import ScheduleCalendar from "@/src/components/schedule/ScheduleCalendar";
import { ScheduleEvent } from "@/src/types/schedule";

interface PlayerScheduleProps {
  playerId: number;
  teamId: number;
}

// TODO: 서버에 요청할 때 부터 playerId, teamId를 보내서 일정 받아오기
// 샘플 데이터 (API 연동 시 변경)
const allEvents: ScheduleEvent[] = [
  {
    id: 1,
    category: "경기",
    title: "T1 vs DK",
    start: new Date(2025, 1, 15, 19, 30),
    end: new Date(2025, 1, 15, 21, 30),
    location: "서울 롤파크",
    teamId: 101, // 팀 일정
    allDay: false,
  },
  {
    id: 2,
    category: "방송",
    title: "Faker 개인 방송",
    start: new Date(2025, 1, 10, 18, 0),
    end: new Date(2025, 1, 10, 20, 0),
    location: "트위치",
    playerId: 1, // 선수 일정
    allDay: false,
  },
];

export default function PlayerSchedule({ playerId, teamId }: PlayerScheduleProps) {
  // 해당 선수의 개인 일정 + 소속 팀 경기 일정
  const playerEvents = allEvents.filter(
    (event) => event.playerId === playerId || event.teamId === teamId
  );

  return <ScheduleCalendar events={playerEvents} />;
}
