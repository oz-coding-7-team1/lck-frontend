export type ScheduleEventCategory = "경기" | "방송" | "팬미팅" | "기타";

export interface ScheduleEvent {
    id: number;
    category: ScheduleEventCategory;
    title: string;
    start: Date;
    end: Date;
    location: string;
    team_id?: number; // 팀 일정이면 존재
    player_id?: number; // 선수 일정이면 존재
    detail?: string;
    allDay?: boolean;
  }

  export interface Schedule {
    id: number;
    title: string;
    category: ScheduleEventCategory;
    detail: string;
    start_date: string;
    end_date: string;
    place: string;
    player_id?: number;
    team_id?: number;
    created_at: Date;
    updated_at: Date;
  }