import Image from "next/image";
import { ScheduleEvent } from "@/src/types/schedule";
import { teamApi } from "@/src/services/teamApi"; // 팀 관련 API 사용

// 서버에서 팀 이벤트 데이터를 가져오는 함수
async function getTeamEvents(teamId: number): Promise<ScheduleEvent[]> {
  try {
    const response = await teamApi.getTeamSchedule(teamId); // teamApi로 팀 일정 받아오기
    const allEvents = response.data; // 서버로부터 받은 데이터

    // ✅ 현재 팀의 경기 일정만 필터링
    return allEvents.filter((event) => event.category === "경기");
  } catch (error) {
    console.error("팀 일정 가져오기 실패:", error);
    throw error; // 오류를 다시 던져서 호출자에게 전달
  }
}

interface TeamScheduleProps {
  teamId: number;
}

export default async function TeamSchedule({ teamId }: TeamScheduleProps) {
  let team;
  try {
    const teamResponse = await teamApi.getTeamById(teamId);
    team = teamResponse.data; // 팀 정보 가져오기
  } catch (error) {
    return <p className="text-gray-500">팀 정보를 찾을 수 없습니다.</p>;
  }

  if (!team) return <p className="text-gray-500">팀 정보를 찾을 수 없습니다.</p>;

  const teamEvents = await getTeamEvents(teamId); // ✅ 서버에서 데이터 가져오기

  return (
    <>
      <h2 className="text-xl font-bold">🏆 팀 경기 일정</h2>
      {teamEvents.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {teamEvents.map(async (event) => {
            // ✅ "vs"를 기준으로 상대 팀 이름 추출 (T1 vs KT → KT)
            const parts = event.title.split(" vs ");
            let opponentName = parts.find((name) => name !== team.name) || "상대 팀 없음";

            // ✅ 상대 팀이 먼저 나올 경우 현재 팀과 일치하지 않는 팀을 찾음 (KT vs T1 문제 해결)
            if (!parts.includes(team.name)) {
              opponentName = parts[1] || "상대 팀 없음";
            }

            // ✅ 상대 팀 로고 가져오기
            let opponentTeam;
            try {
              const teamResponse = await teamApi.getTeams(); // 팀 목록을 가져와 상대 팀을 찾아봄
              opponentTeam = teamResponse.data.find((t) => t.name === opponentName);
            } catch (error) {
              console.error("상대 팀 로고 가져오기 실패:", error);
            }

            // ✅ 날짜 및 시간 분리
            const formattedDate = event.start ? event.start.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" }) : "날짜 정보 없음";
            const formattedTime = event.start ? event.start.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }) : "시간 정보 없음";


            return (
              <li key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg shadow">
                {/* 상대 팀 로고 표시 */}
                {opponentTeam && opponentTeam.logoImageUrl && (
                  <Image src={opponentTeam.logoImageUrl} alt={opponentTeam.name} width={50} height={50} className="rounded-full" />
                )}
                <div>
                  <p className="text-lg font-semibold">{opponentName}</p>
                  <p className="text-gray-500">{formattedDate}</p>
                  <p className="text-gray-500">{formattedTime}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500 mt-3">현재 등록된 경기 일정이 없습니다.</p>
      )}
    </>
  );
}
