import { useEffect, useState } from "react";
import { Team } from "@/types/team";
import { fetchTeamById } from "@/utils/api";

export function useTeam(teamId: number) {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getTeam() {
      try {
        const data = await fetchTeamById(teamId);
        setTeam(data);
      } catch (err) {
        setError("팀 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    getTeam();
  }, [teamId]);

  return { team, loading, error };
}
