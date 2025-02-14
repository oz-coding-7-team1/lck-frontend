"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { subscriptionApi } from "@/src/services/subscriptionApi";

export default function MyChoeae() {
  const router = useRouter();

  useEffect(() => {
    const fetchFavoritePlayer = async () => {
      try {
        const response = await subscriptionApi.getFavoritePlayer();
        const favoritePlayer = response.data;

        if (favoritePlayer && favoritePlayer.player_id) {
          router.push(`/player/${favoritePlayer.player_id}`);
        } else {
          router.push("/players");
        }
      } catch {
        router.push("/players");
      }
    };

    fetchFavoritePlayer();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Redirecting to your favorite player...</div>
    </div>
  );
}
