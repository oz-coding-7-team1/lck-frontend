export interface ScheduleEvent {
    id: number;
    type: "game" | "boardcast" | "metting" | "ect";
    title: string;
    start: Date;
    end: Date;
    location: string;
    teamId?: string; // 팀 일정이면 존재
    playerId?: string; // 선수 일정이면 존재
    allDay: boolean;
    description?: string;
  }
  