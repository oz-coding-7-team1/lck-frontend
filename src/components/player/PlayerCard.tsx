import { PlayerCardData } from "@/src/types/player";
import { positionIcons } from "@/src/utils/positionIcons";
import Image from "next/image";
import SocialLinks from "../common/SocialLinks";

interface PlayerCardProps {
  player: PlayerCardData;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <Image
        src={player.profileImage || "/placeholder.svg"}
        alt={player.name}
        width={64}
        height={64}
        className="rounded-full"
      />
      <div>
        <h3 className="text-lg font-bold flex items-center">
          {positionIcons[player.position] && (
            <Image
              src={positionIcons[player.position]}
              alt={player.position}
              width={20}
              height={20}
              className="mr-2"
            />
          )}
          {player.nickname}
        </h3>
        <p>{player.name}</p>
        <SocialLinks links={player.socialLinks} />
      </div>
    </div>
  );
}
