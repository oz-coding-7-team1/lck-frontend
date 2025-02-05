import SocialLinks from "@/src/components/common/SocialLinks";
import CommunitySimple from "@/src/components/community/CommunitySimple";
import PlayerCard from "@/src/components/player/PlayerCard";
import TeamSchedule from "@/src/components/team/TeamSchedule";
import { samplePlayers } from "@/src/types/player";
import { sampleTeams, Team } from "@/src/types/team";

export default async function TeamPage({ params }: { params: { id: string } }) {
  const teamId = Number(params.id);
  const team: Team | undefined = sampleTeams.find((t) => t.id === teamId);
  const teamPlayers = samplePlayers.filter((player) => team.players.includes(player.id));
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full" />
            <div>
              <h1 className="text-3xl font-bold">{team.name} ♥</h1>
              <SocialLinks links={team.socialLinks} />
            </div>
          </div>
          <button className="border px-4 py-2 rounded-lg">응원하기</button>
        </div>
      </div>

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
  );
}
