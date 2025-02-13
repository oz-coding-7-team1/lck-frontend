import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchPlayerById } from "@/src/utils/api";
import { Player } from "@/src/types/player";

interface PlayerContextType {
  player: Player | null;
  loading: boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ playerId, children }: { playerId: number; children: ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPlayer() {
      try {
        const data = await fetchPlayerById(playerId);
        setPlayer(data);
      } catch {
        setPlayer(null);
      } finally {
        setLoading(false);
      }
    }

    getPlayer();
  }, [playerId]);

  return <PlayerContext.Provider value={{ player, loading }}>{children}</PlayerContext.Provider>;
}

export function usePlayerContext() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("PlayerContext must be used within a PlayerProvider");
  return context;
}
