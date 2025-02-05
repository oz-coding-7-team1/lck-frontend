import moment from "moment";
import { ScheduleEvent } from "@/src/types/schedule";

interface ScheduleListProps {
  events: ScheduleEvent[]; // 경기 일정 리스트
}

export default function ScheduleList({ events }: ScheduleListProps) {

  return (
    <>

      {events.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {events.map((event) => (
            <li
              key={event.id}
              className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-100 cursor-pointer"
            >
              <div>
                <p className="font-bold">{event.title}</p>
                <p className="text-sm text-gray-500">
                  {moment(event.start).format("YYYY.MM.DD HH:mm")} | {event.location}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-3">등록된 경기 일정이 없습니다.</p>
      )}
    </>
  );
}
