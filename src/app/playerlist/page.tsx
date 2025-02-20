"use client";

import Link from "next/link";
import PlayerCard from "../../components/player/PlayerCard";
import { encodePlayerName } from "@/src/utils/urlUtils";
import { useEffect, useState } from "react";
import { subscriptionApi } from "@/src/services/subscriptionApi";
import { useAuth } from "@/src/context/AuthContext";

const PlayerListPage = () => {
  const { accessToken } = useAuth();
  const [players, setPlayers] = useState<any[]>([]); // Adjust type as necessary
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!accessToken) {
        setError("Access token is not available.");
        setLoading(false);
        return;
      }

      try {
        const response = await subscriptionApi.getFavoritePlayer(accessToken);
        if (response.data && Array.isArray(response.data.players)) {
          setPlayers(response.data.players);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (err) {
        console.error("Error fetching players:", err);
        setError("Failed to load players.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [accessToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">선수 목록</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => (
            <div key={player.id} className="block">
              <Link href={`/player/${encodePlayerName(player.nickname)}`}>
                <PlayerCard player={player} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerListPage;
