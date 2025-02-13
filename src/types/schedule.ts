export interface ScheduleEvent {
    id: number;
    category: "경기" | "방송" | "팬미팅" | "기타";
    title: string;
    start: Date;
    end: Date;
    location: string;
    teamId?: string; // 팀 일정이면 존재
    playerId?: string; // 선수 일정이면 존재
    allDay: boolean;
    description?: string;
  }
  