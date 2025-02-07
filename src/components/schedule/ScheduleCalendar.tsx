"use client";

import { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
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

// 커스텀 이벤트 UI (Month 뷰 전용)
const CustomEvent = ({ event }: { event: ScheduleEvent }) => {
  const color = categoryColors[event.type] || "#ccc";

  return (
    <div className="flex items-center space-x-2 w-full">
      {event.allDay ? (
        <div
          className="w-full py-1 px-2 rounded-md"
          style={{ backgroundColor: color, color: "white" }}
        >
          <span className="text-sm">{event.title}</span>
        </div>
      ) : (
        <>
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          ></span>
          <span className="text-sm text-black">{moment(event.start).format("HH:mm")}</span>
          <span className="text-sm text-black truncate" style={{ maxWidth: "100%", overflow: "hidden", whiteSpace: "nowrap" }}>{event.title}</span>
        </>
      )}
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
        eventPropGetter={(event) => {
          const color = categoryColors[event.type] || "#ccc";

          // ✅ Month 뷰에서는 배경색 제거
          if (view === Views.MONTH) {
            return {
              style: {
                backgroundColor: "transparent",
                color: "black",
              },
            };
          }

          // ✅ Week & Day 뷰에서는 배경색 적용
          return {
            style: {
              backgroundColor: color,
              color: "white",
              borderRadius: "4px",
              padding: "4px",
            },
          };
        }}
        components={{
          event: view === Views.MONTH ? CustomEvent : undefined, // Month 뷰에서만 커스텀 UI 사용
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
