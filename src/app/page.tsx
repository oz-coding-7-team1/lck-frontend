"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { encodePlayerName, encodeTeamName } from "../utils/urlUtils";

// Add interfaces for API responses
interface TopPlayer {
  id: number;
  nickname: string;
  realname: string;
  subscription_count?: number;
}

interface TeamRank {
  id: number;
  name: string;
}

interface PositionPlayer {
  id: number;
  nickname: string;
  realname: string;
  subscription_count: number;
}

// Update the constants at the top of the file
const DEFAULT_PLAYER_IMAGE = "/images/default-avatar.svg"; // Changed to .svg
const DEFAULT_TEAM_LOGO = "/images/default-team.svg"; // Changed to .svg

// Update the getPlayerImageSrc function to always return the default image for now
const getPlayerImageSrc = () => {
  return DEFAULT_PLAYER_IMAGE;
};

export default function Home() {
  const [topPlayers, setTopPlayers] = useState<TopPlayer[]>([]);
  const [topTeams, setTopTeams] = useState<TeamRank[]>([]);
  const [positionPlayers, setPositionPlayers] = useState<PositionPlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update the lanes array with proper icon dimensions
  const lanes = useMemo(
    () => [
      {
        name: "TOP",
        icon: "/icons/top.svg",
        key: "top",
        width: 24,
        height: 24,
      },
      {
        name: "JUNGLE",
        icon: "/icons/jungle.svg",
        key: "jungle",
        width: 24,
        height: 24,
      },
      {
        name: "MID",
        icon: "/icons/mid.svg",
        key: "mid",
        width: 24,
        height: 24,
      },
      {
        name: "BOT",
        icon: "/icons/bottom.svg",
        key: "AD Carry",
        width: 24,
        height: 24,
      },
      {
        name: "SUPPORT",
        icon: "/icons/support.svg",
        key: "support",
        width: 24,
        height: 24,
      },
    ],
    []
  );

  const [currentLane, setCurrentLane] = useState(0);

  // Fetch top 10 players
  const fetchTopPlayers = async () => {
    try {
      const response = await axios.get(
        "http://43.200.180.205/api/v1/players/top/"
      );
      setTopPlayers(response.data);
    } catch (error) {
      console.error("Error fetching top players:", error);
      setError("Failed to load top players");
    }
  };

  // Fetch top 5 teams
  const fetchTopTeams = async () => {
    try {
      const response = await axios.get(
        "http://43.200.180.205/api/v1/teams/rank/"
      );
      setTopTeams(response.data);
    } catch (error) {
      console.error("Error fetching top teams:", error);
      setError("Failed to load team rankings");
    }
  };

  // Update the fetchPositionPlayers function
  const fetchPositionPlayers = async (position: string) => {
    try {
      const response = await axios.get(
        "http://43.200.180.205/api/v1/players/position_top/"
      );

      // Get the players for the current position from the response
      const positionData = response.data[position] || [];
      setPositionPlayers(positionData);
    } catch (error) {
      console.error("Error fetching position players:", error);
      setError("Failed to load position rankings");
      setPositionPlayers([]);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchTopPlayers(),
          fetchTopTeams(),
          fetchPositionPlayers(lanes[currentLane].key), // Use key instead of endpoint
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [currentLane, lanes]);

  const handleNextLane = () => {
    setCurrentLane((prev) => (prev + 1) % lanes.length);
  };

  const handlePrevLane = () => {
    setCurrentLane((prev) => (prev - 1 + lanes.length) % lanes.length);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-gradient-to-b from-gray-200 to-transparent">
        <h1 className="py-8 text-2xl font-bold text-center text-gray-900">
          당신의 최애 선수에게 투표하세요
        </h1>
      </div>

      <div className="container flex-grow px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section className="space-y-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              선수 랭킹
            </h2>

            <div className="space-y-6">
              {/* First place player - large card */}
              {topPlayers.length > 0 && (
                <div className="block">
                  <Link
                    href={`/player/${encodePlayerName(topPlayers[0].nickname)}`}
                  >
                    <div className="aspect-[2/1] relative bg-white shadow-lg rounded-xl overflow-hidden">
                      <div className="absolute inset-0">
                        <Image
                          src={getPlayerImageSrc()}
                          alt={topPlayers[0].nickname}
                          layout="fill"
                          objectFit="cover"
                          className="opacity-80"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = DEFAULT_PLAYER_IMAGE;
                          }}
                        />
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="text-lg font-bold text-gray-600">
                          1st
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                          {topPlayers[0].nickname}
                          <Image
                            src={getPlayerImageSrc()}
                            alt={topPlayers[0].nickname}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </div>
                        <div className="text-lg text-gray-600">
                          {topPlayers[0].realname}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Second and third place - medium cards */}
              <div className="grid grid-cols-2 gap-6">
                {topPlayers.slice(1, 3).map((player, index) => (
                  <div className="block" key={player.id}>
                    <Link href={`/player/${encodePlayerName(player.nickname)}`}>
                      <div className="relative overflow-hidden bg-white shadow-lg aspect-[3/2] rounded-xl">
                        <div className="absolute inset-y-0 left-0 w-1/2">
                          <Image
                            src={getPlayerImageSrc()}
                            alt={player.nickname}
                            layout="fill"
                            objectFit="cover"
                            className="opacity-20"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = DEFAULT_PLAYER_IMAGE;
                            }}
                          />
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <div className="text-lg font-bold text-gray-600">
                            {index + 2}
                          </div>
                          <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                            {player.nickname}
                          </div>
                          <div className="text-lg text-gray-600">
                            {player.realname}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* 4th to 10th place - list items */}
              {topPlayers.slice(3, 10).map((player) => (
                <div
                  key={player.id}
                  className="flex items-center gap-6 p-6 bg-white rounded-lg shadow-md"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full">
                    <Image
                      src={getPlayerImageSrc()}
                      alt={player.nickname}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = DEFAULT_PLAYER_IMAGE;
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                      {player.nickname}
                    </div>
                    <div className="text-lg text-gray-600">
                      {player.realname}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-auto text-lg text-gray-500">
                    <Heart className="w-6 h-6 text-red-500" />
                    {player.subscription_count}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold text-gray-800">팀 랭킹</h2>
              <div className="p-10 space-y-8 bg-white rounded-lg shadow-md">
                {topTeams.map((team, index) => (
                  <Link
                    href={`/team/${encodeTeamName(team.name)}`}
                    key={team.id}
                  >
                    <div className="flex items-center gap-6 p-4">
                      <div className="text-lg font-bold text-gray-600">
                        {index + 1}
                      </div>
                      <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
                        <Image
                          src={DEFAULT_TEAM_LOGO}
                          alt={team.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-lg font-medium text-gray-900">
                        {team.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-800">
                라인별 선수 랭킹
              </h2>
              <div className="p-10 space-y-8 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
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
                {Array.isArray(positionPlayers) &&
                  positionPlayers.slice(0, 5).map((player, index) => (
                    <div
                      key={player.id}
                      className="flex items-center gap-6 p-4"
                    >
                      <div className="text-lg font-bold text-gray-600">
                        {index + 1}
                      </div>
                      <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
                        <Image
                          src={getPlayerImageSrc()}
                          alt={player.nickname || "Player"}
                          width={48}
                          height={48}
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = DEFAULT_PLAYER_IMAGE;
                          }}
                        />
                      </div>
                      <div className="flex-1 text-xl font-medium text-gray-900">
                        {player.nickname}
                      </div>
                      <div className="flex items-center gap-4 text-lg text-gray-500">
                        <Heart className="w-6 h-6 text-red-500" />
                        {player.subscription_count}
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
