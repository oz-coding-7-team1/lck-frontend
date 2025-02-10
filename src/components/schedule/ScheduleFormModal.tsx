import { useState } from "react";
import { ScheduleEvent } from "@/src/types/schedule";

interface ScheduleFormModalProps {
  onClose: () => void;
  onSave: (event: ScheduleEvent) => void;
}

export default function ScheduleFormModal({ onClose, onSave }: ScheduleFormModalProps) {
  const [newEvent, setNewEvent] = useState<ScheduleEvent>({
    id: 0,
    title: "",
    start: new Date(),
    end: new Date(),
    category: "",
    location: "",
    allDay: false,
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 rounded-lg w-96 z-[99999]">
        <h2 className="text-xl font-bold mb-4">새 일정 추가</h2>

        <input
          type="text"
          placeholder="일정 제목"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />

        <input
          type="datetime-local"
          value={newEvent.start.toISOString().slice(0, 16)}
          onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
          className="w-full p-2 border rounded mb-2"
        />

        <input
          type="text"
          placeholder="위치"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />

        <select
          value={newEvent.category}
          onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="game">경기</option>
          <option value="boardcast">방송</option>
          <option value="metting">미팅</option>
          <option value="ect">기타</option>
        </select>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            취소
          </button>
          <button onClick={() => onSave(newEvent)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
