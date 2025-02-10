import { PlayerCardData } from "@/src/types/player";
import { positionIcons } from "@/src/utils/positionIcons";
import Image from "next/image";
import SocialLinks from "../common/SocialLinks";

interface PlayerCardProps {
  player: PlayerCardData;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="flex flex-col items-center p-4 space-x-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
        <Image
          src={player.profileImageUrl || "/profile-sample.svg"}
          alt={player.name}
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <div>
        <h3 className="text-lg font-bold flex items-center justify-center">
          {positionIcons[player.position] && (
            <Image
              src={positionIcons[player.position]}
              alt={player.position}
              width={20}
              height={20}
              className="mr-2"
            />
          )}
          {player.nickname.toUpperCase()}
        </h3>
        <p className="text-center">{player.name}</p>
        <SocialLinks links={player.socialLinks} />
      </div>
    </div>
  );
}
