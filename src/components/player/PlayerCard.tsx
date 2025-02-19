// import { positionIcons } from "@/src/utils/positionIcons";
import Image from "next/image";
// import SocialLinks from "../common/SocialLinks";

interface PlayerCardProps {
  player: any;
}

//todo type으로 에러나는 부분 모두 any로 수정

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
              href={url as string}
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
