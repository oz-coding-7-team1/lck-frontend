import { playerApi } from "@/src/services/playerApi";
import { teamApi } from "@/src/services/teamApi";
import PlayerCard from "@/src/components/player/PlayerCard";
import TeamCard from "@/src/components/team/TeamCard";

export default async function MainPage() {
  const topPlayers = await playerApi.getTopPlayers();
  const topTeams = await teamApi.getTopTeams();

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Top Players</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {topPlayers.data.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      <h1 className="mt-12 mb-6 text-3xl font-bold">Top Teams</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {topTeams.data.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
