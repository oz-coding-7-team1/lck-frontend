"use client";

import { useState } from "react";
import { playerApi } from "@/src/services/playerApi";
import { teamApi } from "@/src/services/teamApi";
import PlayerCard from "@/src/components/player/PlayerCard";
import TeamCard from "@/src/components/team/TeamCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

  const handleSearch = async () => {
    const playerResponse = await playerApi.getPlayers();
    const teamResponse = await teamApi.getTeams();

    setPlayers(
      playerResponse.data.filter((player) => player.nickname.includes(query))
    );
    setTeams(teamResponse.data.filter((team) => team.name.includes(query)));
  };

  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for players or teams"
          className="w-full p-3 border rounded-md"
        />
        <button
          onClick={handleSearch}
          className="p-3 ml-4 text-white bg-blue-500 rounded-md"
        >
          Search
        </button>
      </div>

      <h1 className="mb-4 text-2xl font-bold">Players</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      <h1 className="mt-12 mb-4 text-2xl font-bold">Teams</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
