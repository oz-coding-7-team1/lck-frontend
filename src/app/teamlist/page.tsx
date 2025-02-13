"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function TeamListPage() {
  const teams = [
    {
      name: "T1",
      rank: "1st",
      logo: "/logos/t1.svg",
      votes: 230000,
      backgroundImage: "/team-img/t1-background.jpg",
    },
    {
      name: "GEN.G",
      rank: "2nd",
      logo: "/logos/geng.svg",
      votes: 220000,
    },
    {
      name: "Hanwha Life Esports",
      rank: "3rd",
      logo: "/logos/hle.svg",
      votes: 210000,
    },
    {
      name: "Dplus KIA",
      rank: "4th",
      logo: "/logos/dk.svg",
      votes: 200000,
    },
    {
      name: "kt Rolster",
      rank: "5th",
      logo: "/logos/kt.svg",
      votes: 190000,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Team List</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, index) => (
            <Link
              key={index}
              href={`/team/${team.name.toLowerCase()}`}
              className="block"
            >
              <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src={team.backgroundImage || team.logo}
                    alt={team.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity opacity-90 hover:opacity-100"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                        <Image
                          src={team.logo}
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
                      {team.votes.toLocaleString()}
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
