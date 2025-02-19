// import { positionIcons } from "@/src/utils/positionIcons";
import Image from "next/image";
// import SocialLinks from "../common/SocialLinks";

interface PlayerCardProps {
  player: {
    position: string;
    social: Record<string, string> | undefined;
    nickname: string;
    realname: string;
    profile_image_url?: string;
  };
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="flex flex-col items-center p-2 space-y-2 bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="w-24 h-24 overflow-hidden rounded-full">
        <Image
          src={player.profile_image_url || "/images/default-avatar.svg"}
          alt={player.nickname}
          width={96}
          height={96}
          className="object-cover"
        />
      </div>
      <h3 className="text-lg font-bold">{player.nickname}</h3>
      <p className="text-gray-500">{player.realname}</p>
      <p className="text-blue-500">포지션: {player.position}</p>
      <div className="flex space-x-1">
        {player.social &&
          Object.entries(player.social).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              {platform}
            </a>
          ))}
      </div>
    </div>
  );
}
