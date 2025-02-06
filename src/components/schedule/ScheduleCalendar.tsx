"use client";

import { useState } from "react";
import { Calendar, Views, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ScheduleEvent } from "@/src/types/schedule";
import ScheduleDetailModal from "@/src/components/schedule/ScheduleDetailModal";

const localizer = momentLocalizer(moment);

// ✅ 카테고리별 색상 설정
const categoryColors: Record<string, string> = {
  game: "#ff4d4d", // 경기
  broadcast: "#4da6ff", // 방송
  meeting: "#ffcc00", // 미팅
  etc: "#808080", // 기타
};

// 커스텀 이벤트 UI
const CustomEvent = ({ event }: { event: ScheduleEvent }) => {
  const color = categoryColors[event.type] || "#ccc";

  return (
    <div className="flex items-center space-x-2">
      {/* 하루 종일 일정이 아닌 경우 앞에 원형 아이콘 + 시작 시간 표시 */}
      {!event.allDay && (
        <>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></span>
          <span className="text-sm font-bold">{moment(event.start).format("HH:mm")}</span>
        </>
      )}
      <span className="text-sm">{event.title}</span>
    </div>
  );
};


interface ScheduleCalendarProps {
  events: ScheduleEvent[];
}

export default function ScheduleCalendar({ events }: ScheduleCalendarProps) {
  const [view, setView] = useState(Views.MONTH);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  return (
    <div className="p-4 border rounded-lg shadow relative">
      {/* 캘린더 UI */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={view}
        onView={(newView) => setView(newView)}
        style={{ height: 600 }}
        eventPropGetter={(event) => ({
          style: { backgroundColor: categoryColors[event.type] || "#ccc", color: "white" },
        })}
        components={{
          event: CustomEvent, // 커스텀 이벤트 UI 적용
        }}
        onSelectEvent={(event) => setSelectedEvent(event as ScheduleEvent)}
      />

      {/* 일정 상세 모달 */}
      {selectedEvent && (
        <ScheduleDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
