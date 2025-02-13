import { useEffect, useState } from "react";
import { Team } from "@/src/types/team";
import { fetchTeamById } from "@/src/utils/api";

export function useTeam(teamId: number) {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getTeam() {
      try {
        const data = await fetchTeamById(teamId);
        setTeam(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`팀 데이터를 불러오는 중 오류가 발생했습니다: ${err.message}`);
        } else {
          setError("팀 데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    }

    getTeam();
  }, [teamId]);

  return { team, loading, error };
}
