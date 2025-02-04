import { ScheduleEvent } from "@/src/types/schedule";

interface ScheduleDetailModalProps {
  event: ScheduleEvent;
  onClose: () => void;
  onDelete?: (eventId: number) => void; // 관리자 전용
  onEdit?: (event: ScheduleEvent) => void; // 관리자 전용
  isAdmin: boolean; // ✅ 관리자 여부 확인
}

export default function ScheduleDetailModal({ event, onClose, onDelete, onEdit, isAdmin }: ScheduleDetailModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold">{event.title}</h2>
        <p className="text-gray-500">{event.category} | {event.location}</p>
        <p className="mt-2">📅 {event.start.toLocaleString()}</p>

        <div className="flex justify-end space-x-2 mt-4">
          {/* ✅ 관리자만 수정 가능 */}
          {isAdmin && (
            <>
              <button onClick={() => onEdit?.(event)} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                수정
              </button>
              <button onClick={() => onDelete?.(event.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                삭제
              </button>
            </>
          )}
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
