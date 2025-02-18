export type ScheduleEventCategory = "경기" | "방송" | "팬미팅" | "기타";

export interface ScheduleEvent {
    id: number;
    category: ScheduleEventCategory;
    title: string;
    start: Date;
    end: Date;
    location: string;
    teamId?: number; // 팀 일정이면 존재
    playerId?: number; // 선수 일정이면 존재
    allDay: boolean;
    detail?: string;
  }