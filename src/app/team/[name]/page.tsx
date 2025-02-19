import SocialLinks from "@/src/components/common/SocialLinks";
import SubscribeButton from "@/src/components/common/TeamSubscribeButton";
import CommunitySimple from "@/src/components/community/CommunitySimple";
import PlayerCard from "@/src/components/player/PlayerCard";
import TeamSchedule from "@/src/components/team/TeamSchedule";
import { playerApi } from "@/src/services/playerApi";
import { teamApi } from "@/src/services/teamApi";
import { encodeTeamName } from "@/src/utils/urlUtils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Team, Player } from "@/src/types/api";

type Props = {
  params: { name: string };
};

export default async function TeamPage({ params }: Props) {

  // 팀 이름을 URL-friendly 형식으로 변환
  const encodedTeamName = params.name;

  // 팀 데이터를 가져오는데 직접 getTeamById를 사용
  let team: Team | undefined;
  try {
    const teamsResponse = await teamApi.getTeams();
    const teamsData = teamsResponse?.data;

    if (!teamsData) {
      console.error("팀 데이터가 없습니다.");
      return notFound(); // 예시: 팀 데이터를 못 찾은 경우 404 처리
    }

    // 팀 이름으로 해당 팀을 찾기
    team = teamsData.find((t: Team) => encodeTeamName(t.name) === encodedTeamName);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return notFound(); // 팀을 찾을 수 없으면 404 처리
  }

  if (!team) return notFound(); // team이 없으면 404 처리

  // 팀에 속한 선수들 가져오기 (팀 ID로 필터링)
  const playersResponse = await playerApi.getPlayers();
  const teamPlayers = playersResponse.data.filter((player: Player) => player.team_id === team.id);

  return (
    <>
      <div
        className="bg-cover bg-center h-[580px] relative flex flex-col justify-end"
        style={{ backgroundImage: `url(${team.backgroundImageUrl})` }}
      >
        {/* 블러 처리된 검정색 투명 그라데이션 추가 */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-10"></div>
        
        {/* 콘텐츠는 하단에 배치 */}
        <div className="container mx-auto p-6 relative z-20">
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-full max-w-[180px] aspect-square bg-white rounded-full flex items-center justify-center">
                  <Image 
                    src={team.logoImageUrl} 
                    alt={team.name} 
                    width={150} 
                    height={150} 
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{team.name}</h1>
                  <SocialLinks links={team.social} iconClassName="w-6 h-6 filter invert brightness-0" />
                </div>
              </div>
              <SubscribeButton teamId={team.id} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="mt-6">
          <h2 className="text-xl font-bold">Team Player</h2>
          <div className="grid grid-cols-5 gap-4 mt-4">
            {teamPlayers.map((player: { id?: number; nickname: string; realname: string; profileImageUrl?: string | undefined; }) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-10 gap-20 mt-6">
          <div className="col-span-6">
            <CommunitySimple type="team" entityId={team.id} />
          </div>
          <div className="col-span-4">
            <TeamSchedule teamId={team.id} />
          </div>
        </div>
      </div>
    </>
  );
}
