import Link from "next/link";
import PlayerCard from "../../components/player/PlayerCard";
import { encodePlayerName } from "@/src/utils/urlUtils";
import { playerApi } from "@/src/services/playerApi";

async function getPlayers() {
  const response = await playerApi.getPlayers();
  return response.data;
}

export default async function PlayerListPage() {
  const players = await getPlayers();

  // Check if players is defined and is an array
  if (!Array.isArray(players)) {
    console.error("Expected players to be an array, but got:", players);
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container px-4 py-8 mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Player List</h1>
          <p className="text-red-500">Failed to load players.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">선수 목록</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => (
            <div key={player.id} className="block">
              <Link href={`/player/${encodePlayerName(player.nickname)}`}>
                <PlayerCard player={player} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
