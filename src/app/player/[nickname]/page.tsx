import SocialLinks from "@/src/components/common/SocialLinks";
import CommunitySimple from "@/src/components/community/CommunitySimple";
import PlayerGallery from "@/src/components/player/PlayerGallery";
import PlayerSchedule from "@/src/components/player/PlayerSchedule";
import { Player, samplePlayers } from "@/src/types/player";
import { sampleTeams } from "@/src/types/team";
import { notFound } from "next/navigation";

export default function PlayerPage({ params }: { params: { nickname: string } }) {
  // 닉네임을 소문자로 변환하여 매칭
  const player: Player | undefined = samplePlayers.find(
    (p) => p.nickname.toLowerCase() === params.nickname.toLowerCase()
  );

  if (!player) return notFound();

  const team = sampleTeams.find((t) => t.id === player.teamId);

  return (
    <div className="container p-6 mx-auto">
      <div className="flex flex-col items-center">
        <div>
          <h1 className="text-3xl font-bold">{player.nickname}</h1>
          <p className="text-gray-500">{player.name}</p>
          <p className="text-blue-500">♥ {player.fanVotes}</p>
        </div>
        <SocialLinks links={player.socialLinks} />
      </div>
      
      <div className="grid grid-cols-10 gap-4 mt-6">
        <div className="col-span-3 p-4 border rounded-lg shadow">
          <h2 className="text-xl font-bold">PLAYER INFO.</h2>
          <p><strong>이름</strong> {player.name}</p>
          <p><strong>생년월일</strong> {player.birthdate}</p>
          <p><strong>국적</strong> {player.nationality}</p>
          <p><strong>데뷔</strong> {player.debutDate}</p>
          <p><strong>포지션</strong> {player.position}</p>
          <p><strong>소속 팀</strong> {team ? team.name : "소속팀 없음"}</p>
          <p><strong>소속사</strong> {player.agency}</p>
          <p><strong>ID</strong> {player.gamename}</p>
        </div>
        <div className="col-span-7">
          <PlayerSchedule playerId={player.id} teamId={player.teamId} />
        </div>
      </div>

      <div className="grid grid-cols-10 gap-4 mt-6">
        <div className="col-span-6">
          <CommunitySimple type="player" entityId={player.id} />
        </div>
        <div className="col-span-4">
          <PlayerGallery playerId={player.id} />
        </div>
      </div>
    </div>
  );
}
