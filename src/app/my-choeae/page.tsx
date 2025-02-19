"use client";

import { useEffect, useState } from "react";
import { playerApi } from "@/src/services/playerApi";
import { teamApi } from "@/src/services/teamApi";
import Image from "next/image";

const DEFAULT_PROFILE_IMAGE = "/images/default-avatar.svg";
const DEFAULT_TEAM_LOGO = "/images/default-team.svg";

// todo 타입 file player.ts 에 몰아서 관리

type teamProps = {
  id: number;
  name: string;
  social?: {
    X?: string;
    insta?: string;
    youtube?: string;
    facebook?: string;
    soop?: string;
  };
};

type playerProps = {
  id: number;
  realname: string;
  position: string;
  nickname: string;
  profile_image_url?: string;
  social?: {
    X?: string;
    insta?: string;
    youtube?: string;
    facebook?: string;
    soop?: string;
  };
};

export default function MyChoeae() {
  const [favoriteTeam, setFavoriteTeam] = useState<teamProps>();
  const [favoritePlayer, setFavoritePlayer] = useState<playerProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [playerResponse, teamResponse] = await Promise.all([
          playerApi.getFavoritePlayer(),
          teamApi.getFavoriteTeam(),
        ]);
        console.log(playerResponse);
        // Extract the data from the APIResponse
        setFavoritePlayer(playerResponse); // Assuming playerResponse is of type APIResponse<Player>
        setFavoriteTeam(teamResponse); // Assuming teamResponse is of type APIResponse<Team>
      } catch (err) {
        console.error("Failed to fetch favorite data:", err);
        setError("최애 선수 또는 팀을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  // todo 선수 팀 클릭시 해당 페이지 이동

  return (
    <div className="min-h-screen bg-white">
      <main className="container px-4 py-8 mx-auto">
        <h2 className="mb-8 text-2xl font-bold">My CHOEAE</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Team Card */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Team</h3>
            <div className="flex items-center gap-4 p-4 bg-white border rounded-lg">
              <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-full">
                <Image
                  src={DEFAULT_TEAM_LOGO}
                  alt={"Team logo"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-medium">
                  {favoriteTeam && favoriteTeam.name ? favoriteTeam.name : "T1"}
                </h4>
                <p className="text-sm text-gray-500">LCK</p>
              </div>
            </div>
          </div>
          {/* Player Card */}
          {favoritePlayer && favoritePlayer.profile_image_url && (
            <div>
              <h3 className="mb-4 text-lg font-medium">Player</h3>
              <div className="flex items-center gap-4 p-4 bg-white border rounded-lg">
                <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-full">
                  <Image
                    src={
                      favoritePlayer?.profile_image_url || DEFAULT_PROFILE_IMAGE
                    }
                    alt={favoritePlayer?.nickname || "Player photo"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-medium">
                    {favoritePlayer?.nickname || "Faker"}
                  </h4>
                  <p className="text-sm text-gray-500">LCK</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
