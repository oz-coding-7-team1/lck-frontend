/*"use client";

import { useEffect, useState } from "react";
import ScheduleCalendar from "@/src/components/schedule/ScheduleCalendar";
import { ScheduleEvent } from "@/src/types/schedule";
import { playerApi } from "@/src/services/playerApi"; // playerApi 사용
import { teamApi } from "@/src/services/teamApi"; // teamApi 사용

interface PlayerScheduleProps {
  playerId: number;
  teamId: number;
}

// 서버에서 받은 데이터를 ScheduleEvent 타입으로 변환하는 함수
const transformEvent = (eventData: any): ScheduleEvent => {
  const startDate = new Date(eventData.start_date);
  const endDate = new Date(eventData.end_date);

  return {
    id: eventData.id,
    category: eventData.category,
    title: eventData.title,
    start: startDate,  // start_date를 Date로 변환
    end: endDate,      // end_date를 Date로 변환
    location: eventData.place,              // 장소
    playerId: eventData.player || undefined,
    teamId: eventData.team || undefined,
    allDay: startDate.toDateString() !== endDate.toDateString(), // 날짜만 비교
    detail: eventData.detail || "",
  };
};


export default function PlayerSchedule({ playerId, teamId }: PlayerScheduleProps) {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // 선수 스케줄 받아오기
        const playerScheduleResponse = await playerApi.getPlayerSchedule(playerId);
        const playerSchedule = playerScheduleResponse.data.map(transformEvent); // 변환 함수 적용

        // 팀 스케줄 받아오기
        const teamScheduleResponse = await teamApi.getTeamSchedule(teamId);
        const teamSchedule = teamScheduleResponse.data.map(transformEvent); // 변환 함수 적용

        // 선수와 팀의 스케줄을 합침
        const allEvents = [
          ...playerSchedule.map((event) => ({
            ...event,
            playerId,
            category: "선수",
          })),
          ...teamSchedule.map((event) => ({
            ...event,
            teamId,
            category: "팀",
          })),
        ];

        setEvents(allEvents); // 합친 스케줄 데이터를 상태에 설정
      } catch (err) {
        console.error("Error fetching schedule:", err);
        setError("스케줄을 불러오는 데 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [playerId, teamId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <ScheduleCalendar events={events} />;
}
*/

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
