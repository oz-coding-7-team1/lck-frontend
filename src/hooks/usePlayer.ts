import { useEffect, useState } from "react";
import { Player } from "@/types/player";
import { fetchPlayerById } from "@/utils/api";

export function usePlayer(playerId: number) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getPlayer() {
      try {
        const data = await fetchPlayerById(playerId);
        setPlayer(data);
      } catch (err) {
        setError("선수 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    getPlayer();
  }, [playerId]);

  return { player, loading, error };
}
