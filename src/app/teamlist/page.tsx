"use client";

import { teamApi } from "@/src/services/teamApi";
import TeamCard from "@/src/components/team/TeamCard";

export default async function TeamListPage() {
  const teams = await teamApi.getTeams();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Team List</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {teams.data.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
