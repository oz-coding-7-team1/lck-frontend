import React from "react";

interface PlayerScheduleProps {
  playerId: string;
}

function PlayerSchedule({ playerId }: PlayerScheduleProps) {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold">스케줄</h2>
      <p>{playerId}의 경기 일정이 여기에 표시됩니다.</p>
    </div>
  );
}

export default PlayerSchedule;