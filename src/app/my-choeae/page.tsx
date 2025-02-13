"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyChoeae() {
  const router = useRouter();

  useEffect(() => {
    // Get the favorite player ID from localStorage or any other state management solution
    const favoritePlayerId = localStorage.getItem("favoritePlayerId");

    if (favoritePlayerId) {
      // Redirect to the player's page
      router.push(`/player/${favoritePlayerId}`);
    } else {
      // If no favorite player is selected, redirect to players page
      router.push("/players");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Redirecting to your favorite player...</div>
    </div>
  );
}
