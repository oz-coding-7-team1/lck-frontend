import { ScheduleEvent } from "@/src/types/schedule";

interface ScheduleDetailModalProps {
  event: ScheduleEvent;
  onClose: () => void;
}

export default function ScheduleDetailModal({ event, onClose }: ScheduleDetailModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold">{event.title}</h2>
        <p className="text-gray-500">{event.type} | {event.location}</p>
        <p className="mt-2">📅 {event.start.toLocaleString()}</p>

        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
