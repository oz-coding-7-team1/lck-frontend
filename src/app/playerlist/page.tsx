import Link from "next/link";
import PlayerCard from "../../components/player/PlayerCard";
import { encodePlayerName } from "@/src/utils/urlUtils"; // 닉네임을 URL-friendly하게 변환하는 함수
import { samplePlayers } from "@/src/types/player";

const players = samplePlayers

export default function PlayerListPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Player List</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player, index) => (
            <Link key={index} href={`/player/${encodePlayerName(player.nickname)}`} className="block">
              <PlayerCard player={player} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
