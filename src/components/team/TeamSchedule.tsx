import Image from "next/image";
import { ScheduleEvent } from "@/src/types/schedule";
import { sampleTeams } from "@/src/types/team";

// 경기 데이터를 서버에서 가져오는 함수 (예제: 가짜 데이터)
async function getTeamEvents(teamId: number): Promise<ScheduleEvent[]> {
  const allEvents: ScheduleEvent[] = [
    {
      id: 1,
      teamId: 101,
      title: "T1 vs DK",
      start: new Date(2025, 2, 15, 19, 30),
      end: new Date(2025, 2, 15, 21, 30),
      category: "game",
      location: "서울 롤파크",
      allDay: false,
    },
    {
      id: 2,
      teamId: 101,
      title: "KT vs T1",
      start: new Date(2025, 2, 24, 19, 30),
      end: new Date(2025, 2, 24, 21, 30),
      category: "game", 
      location: "서울 롤파크",
      allDay: false,
    },
    {
      id: 3,
      teamId: 102,
      title: "GEN.G vs DK",
      start: new Date(2025, 2, 18, 18, 0),
      end: new Date(2025, 2, 18, 20, 0),
      category: "game",
      location: "부산 e스포츠 아레나",
      allDay: false,
    },
    {
      id: 4,
      teamId: 101,
      title: "T1 팬미팅",
      start: new Date(2025, 2, 24, 19, 30),
      end: new Date(2025, 2, 24, 21, 30),
      category: "meeting",
      location: "서울 롤파크",
      allDay: false,
    },
  ];

  // ✅ 현재 팀의 경기 일정만 필터링
  return allEvents.filter((event) => event.teamId === teamId && event.category === "game");
}

interface TeamScheduleProps {
  teamId: number;
}

export default async function TeamSchedule({ teamId }: TeamScheduleProps) {
  const team = sampleTeams.find((t) => t.id === teamId);
  if (!team) return <p className="text-gray-500">팀 정보를 찾을 수 없습니다.</p>;

  const teamEvents = await getTeamEvents(teamId); // ✅ 서버에서 데이터 가져오기

  return (
    <>
      <h2 className="text-xl font-bold">🏆 팀 경기 일정</h2>
      {teamEvents.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {teamEvents.map((event) => {
            // ✅ "vs"를 기준으로 상대 팀 이름 추출 (T1 vs KT → KT)
            const parts = event.title.split(" vs ");
            let opponentName = parts.find((name) => name !== team.name) || "상대 팀 없음";

            // ✅ 상대 팀이 먼저 나올 경우 현재 팀과 일치하지 않는 팀을 찾음 (KT vs T1 문제 해결)
            if (!parts.includes(team.name)) {
              opponentName = parts[1] || "상대 팀 없음";
            }

            // ✅ 상대 팀 로고 가져오기
            const opponentTeam = sampleTeams.find((t) => t.name === opponentName);

            // ✅ 날짜 및 시간 분리
            const formattedDate = event.start.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
            const formattedTime = event.start.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });

            return (
              <li key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg shadow">
                {/* 상대 팀 로고 표시 */}
                {opponentTeam && (
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
