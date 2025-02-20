"use client";

import Link from "next/link";
import PlayerCard from "../../components/player/PlayerCard";
import { encodePlayerName } from "@/src/utils/urlUtils";
import { useEffect, useState } from "react";
import axios from "axios";

const PlayerListPage = () => {
  const [players, setPlayers] = useState<any[]>([]); // Adjust type as necessary
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          "https://api.umdoong.shop/api/v1/players/"
        );

        if (response.data) {
          setPlayers(response.data); // Assuming the response data is an array of players
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error:", err.message);
          setError("Failed to load players: " + err.message);
        } else {
          console.error("Unexpected error:", err);
          setError("Failed to load players.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

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
