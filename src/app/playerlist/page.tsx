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
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Player List</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player, index) => (
            <div key={index} className="block">
              <Link href={`/player/${encodePlayerName(player.nickname)}`}>
                <PlayerCard player={player} />
              </Link>
              <div className="flex flex-col">
                <p>Player Info</p>
                <span>
                  <a
                    href="https://chzzk.com/example"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    External Link
                  </a>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
