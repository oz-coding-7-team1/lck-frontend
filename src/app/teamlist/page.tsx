"use client";

import { useEffect, useState } from "react";
import { teamApi } from "@/src/services/teamApi";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

interface Team {
  id: number;
  name: string;
  social: Record<string, string>; // Adjust based on your API response
}

export default function TeamListPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await teamApi.getTeams();
        setTeams(data);
      } catch (error) {
        setError("Failed to load teams");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (isLoading) {
    return <div>Loading teams...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Team List</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/team/${team.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="block"
            >
              <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src={team.backgroundImage || "/images/default-team.svg"}
                    alt={team.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity opacity-90 hover:opacity-100"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
                        <Image
                          src={team.logo || "/images/default-team.svg"}
                          alt={team.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-600">
                          {team.rank}
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {team.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Heart className="w-5 h-5 text-red-500" />
                      {team.votes ? team.votes.toLocaleString() : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
