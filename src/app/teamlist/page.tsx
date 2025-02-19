"use client";

import { useEffect, useState } from "react";
import { teamApi } from "@/src/services/teamApi";
import Link from "next/link";
import Image from "next/image";

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
        const response = await teamApi.getTeams();
        setTeams(response.data);
      } catch {
        setError("Failed to load teams");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  console.log(teams);

  if (isLoading) {
    return <div>Loading teams...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  //todo 팀별 구독수 따로 api 호출해서 가져오기

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">팀 목록</h1>
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
                    src={"/images/default-team.svg"}
                    alt={team.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity opacity-90 hover:opacity-100"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-xl font-bold text-gray-900">
                        {team.name}
                      </div>
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
