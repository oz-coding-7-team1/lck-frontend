import { positionIcons } from "@/src/utils/positionIcons";
import Image from "next/image";
import SocialLinks from "../common/SocialLinks";

interface PlayerCardProps {
  player: {
    position: string;
    social: Record<string, string> | undefined;
    nickname: string;
    realname: string;
    profileImageUrl?: string;
  };
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="flex flex-col items-center p-4 space-x-4 transition bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="w-full h-full overflow-hidden rounded-full aspect-w-1 aspect-h-1">
        <Image
          src={player.profileImageUrl || "/profile-sample.svg"}
          alt={player.nickname}
          layout="responsive"
          width={200}
          height={200}
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="flex items-center justify-center text-lg font-bold">
          {positionIcons[player.position as keyof typeof positionIcons] && (
            <Image
              src={positionIcons[player.position as keyof typeof positionIcons]}
              alt={player.position}
              width={20}
              height={20}
              className="mr-2"
            />
          )}
          {player.nickname.toUpperCase()}
        </h3>
        <p className="text-center">{player.realname}</p>
        <SocialLinks links={player.social} />
      </div>
    </div>
  );
}
