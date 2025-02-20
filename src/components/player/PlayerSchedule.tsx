"use client";

import { useEffect, useState } from "react";
import { playerApi } from "@/src/services/playerApi"; // playerApi 사용
import { teamApi } from "@/src/services/teamApi"; // teamApi 사용
import ScheduleCalendar from "@/src/components/schedule/ScheduleCalendar";
import { Schedule, ScheduleEvent } from "@/src/types/schedule";

interface PlayerScheduleProps {
  playerId: number;
  teamId: number;
}

// 서버에서 받은 데이터를 ScheduleEvent 타입으로 변환하는 함수
const transformEvent = (eventData: Schedule): ScheduleEvent => {
  const startDate = new Date(eventData.start_date);
  const endDate = new Date(eventData.end_date);

  return {
    id: eventData.id,
    category: eventData.category, // category를 ScheduleEventCategory로 변환 (enum)
    title: eventData.title,
    start: startDate, // start_date를 Date로 변환
    end: endDate, // end_date를 Date로 변환
    location: eventData.place, // 장소
    player_id: eventData.player_id || undefined,
    team_id: eventData.team_id || undefined, // team_id를 Number로 변환
    allDay: startDate.toDateString() !== endDate.toDateString(), // 날짜만 비교
    detail: eventData.detail || "",
  };
};

export default function PlayerSchedule({
  playerId,
  teamId,
}: PlayerScheduleProps) {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // 선수 스케줄 받아오기
        const playerScheduleResponse = await playerApi.getPlayerSchedule(
          playerId
        );
        const playerSchedule = playerScheduleResponse.data.map(transformEvent); // 변환 함수 적용

        // teamId가 존재할 때만 팀 스케줄을 받아오기
        let teamSchedule: ScheduleEvent[] = [];
        if (teamId) {
          const teamScheduleResponse = await teamApi.getTeamSchedule(teamId);
          teamSchedule = teamScheduleResponse.data.map(transformEvent); // 변환 함수 적용
        }

        // 선수와 팀의 스케줄 합치기
        const combinedSchedule = [...playerSchedule, ...teamSchedule];

        setEvents(combinedSchedule); // 합친 스케줄 데이터를 상태에 설정
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
