import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { playerApi } from "@/src/services/playerApi";  // playerApi 임포트
import { Player } from "@/src/types/api";

interface PlayerContextType {
  player: Player | null;
  loading: boolean;
  setPlayerId: (id: number) => void;  // 선수 ID 변경 함수 추가
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [playerId, setPlayerId] = useState<number | null>(null);

  useEffect(() => {
    if (playerId === null) return;  // playerId가 없으면 아무것도 하지 않음

    async function getPlayer() {
      setLoading(true);
      try {
        const { data } = await playerApi.getPlayerById(playerId);  // playerApi로 선수 정보 가져오기
        setPlayer(data);  // 선수 정보 상태 업데이트
      } catch (error) {
        console.error("선수 정보 로딩 실패", error);
        setPlayer(null);  // 실패 시 null로 설정
      } finally {
        setLoading(false);
      }
    }

    getPlayer();  // 선수 정보 가져오기
  }, [playerId]);

  return (
    <PlayerContext.Provider value={{ player, loading, setPlayerId }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("PlayerContext must be used within a PlayerProvider");
  return context;
}
