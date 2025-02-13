import SocialLinks from "@/src/components/common/SocialLinks";
import SubscribeButton from "@/src/components/common/SubscribeButton";
import CommunitySimple from "@/src/components/community/CommunitySimple";
import PlayerCard from "@/src/components/player/PlayerCard";
import TeamSchedule from "@/src/components/team/TeamSchedule";
import { samplePlayers } from "@/src/types/player";
import { sampleTeams, Team } from "@/src/types/team";
import { decodeTeamName } from "@/src/utils/urlUtils";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function TeamPage({ params }: { params: Promise<{ name: string }> }) {
  // 🔹 URL에서 받은 `name`을 원래 팀 이름으로 변환
  const formattedName = decodeTeamName((await params).name);
  const team: Team | undefined = sampleTeams.find((t) => t.name.toLowerCase() === formattedName.toLowerCase());

  if (!team) return notFound();

  const teamPlayers = samplePlayers.filter((player) => team.players.includes(player.id));

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
              <SubscribeButton teamId={team.id}/>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="mt-6">
          <h2 className="text-xl font-bold">Team Player</h2>
          <div className="grid grid-cols-5 gap-4 mt-4">
            {teamPlayers.map((player) => (
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
