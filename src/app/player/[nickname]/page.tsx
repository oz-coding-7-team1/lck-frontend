import PlayerSubscribeButton from "@/src/components/common/PlayerSubscribeButton";
import SocialLinks from "@/src/components/common/SocialLinks";
import CommunitySimple from "@/src/components/community/CommunitySimple";
import PlayerGallery from "@/src/components/player/PlayerGallery";
import PlayerSchedule from "@/src/components/player/PlayerSchedule";
import { Player, samplePlayers } from "@/src/types/player";
import { sampleTeams } from "@/src/types/team";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function PlayerPage({ params }: { params: Promise<{ nickname: string }> }) {
  // 닉네임을 소문자로 변환하여 매칭
  const nickname =  (await params).nickname

  const player: Player | undefined = samplePlayers.find(
    (p) => p.nickname.toLowerCase() === nickname.toLowerCase()
  );

  if (!player) return notFound();

  const team = sampleTeams.find((t) => t.id === player.team_id);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        <Image 
          src={player.profileImageUrl} 
          alt={player.nickname} 
          width={150} 
          height={150} 
        />
        <div>
          <h1 className="text-3xl font-bold">{player.nickname}<PlayerSubscribeButton playerId={player.id} /></h1>
          <p className="text-gray-500">{player.realname}</p>
          <p className="text-blue-500">♥ {player.fanVotes}</p>
        </div>
        <SocialLinks 
          links={player.social} 
          iconClassName="w-6 h-6 hover:opacity-75"
        />
      </div>

      <div className="grid grid-cols-10 gap-4 mt-6">
        <div className="col-span-3 p-4 border rounded-lg shadow">
          <h2 className="text-xl font-bold">PLAYER INFO.</h2>
          <p>
            <strong>이름</strong> {player.realname}
          </p>
          <p>
            <strong>생년월일</strong> {player.date_of_birth}
          </p>
          <p>
            <strong>국적</strong> {player.nationality}
          </p>
          <p>
            <strong>데뷔</strong> {player.debut_date}
          </p>
          <p>
            <strong>포지션</strong> {player.position}
          </p>
          <p>
            <strong>소속 팀</strong> {team ? team.name : '소속팀 없음'}
          </p>
          <p>
            <strong>소속사</strong> {player.agency}
          </p>
          <p>
            <strong>ID</strong> {player.gamename}
          </p>
        </div>
        <div className="col-span-7">
          <PlayerSchedule playerId={player.id} teamId={player.team_id} />
        </div>
      </div>

      <div className="grid grid-cols-10 gap-4 mt-6">
        <div className="col-span-6">
          <CommunitySimple type="player" entityId={player.id} />
        </div>
        <div className="col-span-4">
          <PlayerGallery  />
        </div>
      </div>
    </div>
  );
}
