import PlayerCommunity from "@/src/components/player/PlayerCommunity";
import PlayerGallery from "@/src/components/player/PlayerGallery";
import PlayerSchedule from "@/src/components/player/PlayerSchedule";
import { Player, samplePlayers } from "@/src/types/player";

export default function PlayerPage({ params }: { params: { id: string } }) {
  const playerId = Number(params.id);
  const player: Player | undefined = samplePlayers.find((p) => p.id === playerId);
  const team = sampleTeams.find((t) => t.id === player?.teamId);

  if (!player) {
    return <div className="container mx-auto p-6">선수 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        <div>
          <h1 className="text-3xl font-bold">{player.nickname}</h1>
          <p className="text-gray-500">{player.name}</p>
          <p className="text-blue-500">♥ {player.fanVotes}</p>
        </div>
        <div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="col-span-1 p-4 border rounded-lg shadow">
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
        <div className="col-span-2">
          <PlayerSchedule playerId={player.id} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="col-span-1 p-4 border rounded-lg shadow">
          <PlayerCommunity playerId={player.id} />
        </div>
        <div className="col-span-2">
          <PlayerGallery playerId={player.id} />
        </div>
      </div>
    </div>
  );
}
