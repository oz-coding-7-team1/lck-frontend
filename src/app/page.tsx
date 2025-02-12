"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { samplePlayers, Player } from "@/src/types/player";

export default function Home() {
  const lanes = useMemo(
    () => [
      { name: "TOP", icon: "/icons/top.svg" },
      { name: "JUNGLE", icon: "/icons/jungle.svg" },
      { name: "MID", icon: "/icons/mid.svg" },
      { name: "BOT", icon: "/icons/bottom.svg" }, // Changed from "BOTTOM" to "BOT"
      { name: "SUPPORT", icon: "/icons/support.svg" },
    ],
    []
  );

  const [currentLane, setCurrentLane] = useState(0);
  const [playersByLane, setPlayersByLane] = useState<Player[]>([]);

  useEffect(() => {
    // Filter players by current lane and sort by fanVotes
    const filteredPlayers = samplePlayers
      .filter((player) => player.position === lanes[currentLane].name)
      .sort((a, b) => (b?.fanVotes || 0) - (a?.fanVotes || 0));
    setPlayersByLane(filteredPlayers);
  }, [lanes, currentLane]);

  const handleNextLane = () => {
    setCurrentLane((prev) => (prev + 1) % lanes.length);
  };

  const handlePrevLane = () => {
    setCurrentLane((prev) => (prev - 1 + lanes.length) % lanes.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {" "}
      {/* Changed bg-gray-100 to bg-white */}
      <div className="py-16 bg-gradient-to-b from-gray-200 to-transparent">
        {" "}
        {/* Added py-10 */}
        <h1 className="text-2xl font-bold text-center text-gray-900">
          당신의 최애 선수에게 투표하세요
        </h1>
      </div>
      <div className="container flex-grow px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {" "}
          {/* Changed grid layout */}
          <section className="space-y-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              Player Rank
            </h2>

            <div className="space-y-6">
              <div className="block">
                <Link href="/player/faker">
                  <div className="aspect-[2/1] relative bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="absolute inset-0">
                      <Image
                        src="/faker-img/T1-Faker-wins-Worlds-2023-esports-greatest-comeback.jpeg"
                        alt="FAKER"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-80"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="text-lg font-bold text-gray-600">1st</div>
                      <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                        FAKER
                        <Image
                          src="/icons/faker.svg"
                          alt="FAKER"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </div>
                      <div className="text-lg text-gray-600">이상혁</div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="block">
                  <Link href="/player/chovy">
                    <div className="relative overflow-hidden bg-white shadow-lg aspect-[3/2] rounded-xl">
                      {" "}
                      {/* Adjusted aspect ratio */}
                      <div className="absolute inset-y-0 left-0 w-1/2">
                        <Image
                          src="/icons/chovy.svg"
                          alt="CHOVY"
                          layout="fill"
                          objectFit="cover"
                          className="opacity-20"
                        />
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="text-lg font-bold text-gray-600">2</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                          CHOVY
                          <Image
                            src="/icons/chovy.svg"
                            alt="CHOVY"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </div>
                        <div className="text-lg text-gray-600">정지훈</div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="block">
                  <Link href="/player/gumayusi">
                    <div className="relative overflow-hidden bg-white shadow-lg aspect-[3/2] rounded-xl">
                      {" "}
                      {/* Adjusted aspect ratio */}
                      <div className="absolute inset-y-0 left-0 w-1/2">
                        <Image
                          src="/icons/gumayusi.svg"
                          alt="GUMAYUSI"
                          layout="fill"
                          objectFit="cover"
                          className="opacity-20"
                        />
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="text-lg font-bold text-gray-600">3</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                          GUMAYUSI
                          <Image
                            src="/icons/gumayusi.svg"
                            alt="GUMAYUSI"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </div>
                        <div className="text-lg text-gray-600">이민형</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i + 4}
                  className="flex items-center gap-6 p-6 bg-white rounded-lg shadow-md"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                      Player {i + 4}
                      <Image
                        src={`/icons/player${i + 4}.svg`}
                        alt={`Player ${i + 4}`}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="text-lg text-gray-600">
                      Player Name {i + 4}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-auto text-lg text-gray-500">
                    <Heart className="w-6 h-6 text-red-500" />
                    {50000 + i * 1000}{" "}
                    {/* Replace Math.random() with a consistent value */}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="space-y-12">
            {" "}
            {/* Removed col-span classes and simplified */}
            <section>
              <h2 className="mt-4 text-xl font-bold text-gray-800">
                Team Rank
              </h2>
              <div className="p-10 mb-8 space-y-8 bg-white rounded-lg shadow-md">
                {" "}
                {/* Added mb-8 */}
                <div className="flex flex-col items-center gap-6 p-6 bg-gray-100 rounded-lg">
                  {" "}
                  {/* Adjusted padding */}
                  <div className="text-lg font-bold text-gray-600">1st</div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
                      {" "}
                      {/* Adjusted size */}
                      <Image
                        src="/logos/t1.svg"
                        alt="T1"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="text-lg font-medium text-gray-900">T1</div>
                  </div>
                  <div className="flex items-center gap-4 text-lg text-gray-500">
                    <Heart className="w-6 h-6 text-red-500" />
                    230,000
                  </div>
                </div>
                {[
                  {
                    rank: 2,
                    name: "GEN.G",
                    votes: "220,000",
                    logo: "/logos/geng.svg",
                  },
                  {
                    rank: 3,
                    name: "Hanwha Life Esports",
                    votes: "210,000",
                    logo: "/logos/hle.svg",
                  },
                  {
                    rank: 4,
                    name: "Dplus KIA",
                    votes: "200,000",
                    logo: "/logos/dk.svg",
                  },
                  {
                    rank: 5,
                    name: "kt Rolster",
                    votes: "190,000",
                    logo: "/logos/kt.svg",
                  },
                ].map((team, index) => (
                  <Link
                    href={`/team/${team.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    key={index}
                  >
                    <div className="flex items-center gap-6 p-4">
                      {" "}
                      {/* Adjusted gap and padding */}
                      <div className="text-lg font-bold text-gray-600">
                        {team.rank}
                      </div>
                      <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
                        {" "}
                        {/* Adjusted size */}
                        <Image
                          src={team.logo}
                          alt={team.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-lg font-medium text-gray-900">
                        {team.name}
                      </div>
                      <div className="flex items-center gap-4 text-lg text-gray-500">
                        <Heart className="w-6 h-6 text-red-500" />
                        {team.votes}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800">
                {" "}
                {/* Removed mt-20 since we're using space-y-12 above */}
                Lane Rank
              </h2>
              <div className="p-10 mt-4 space-y-8 bg-white rounded-lg shadow-md">
                {" "}
                {/* Adjusted padding */}
                <div className="flex items-center justify-between mb-6">
                  {" "}
                  {/* Adjusted margin */}
                  <button onClick={handlePrevLane}>
                    <ChevronLeft className="w-6 h-6 text-gray-500" />
                  </button>
                  <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Image
                      src={lanes[currentLane].icon}
                      alt={lanes[currentLane].name}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    {lanes[currentLane].name}
                  </div>
                  <button onClick={handleNextLane}>
                    <ChevronRight className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                {playersByLane.slice(0, 5).map((player, index) => (
                  <div key={player.id} className="flex items-center gap-6 p-4">
                    {" "}
                    {/* Adjusted gap and padding */}
                    <div className="text-lg font-bold text-gray-600">
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
                      {" "}
                      {/* Adjusted size */}
                      <Image
                        src={`/icons/${player.nickname.toLowerCase()}.svg`}
                        alt={player.nickname}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-xl font-medium text-gray-900">
                      {player.nickname}
                    </div>
                    <div className="flex items-center gap-4 text-lg text-gray-500">
                      <Heart className="w-6 h-6 text-red-500" />
                      {player.fanVotes}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
