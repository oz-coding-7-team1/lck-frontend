// import { positionIcons } from "@/src/utils/positionIcons";
import Image from "next/image";
import SocialLinks from "../common/SocialLinks";
import { positionIcons } from "@/src/utils/positionIcons";

interface PlayerCardProps {
  player: any;
}

//todo type으로 에러나는 부분 모두 any로 수정

export default function PlayerCard({ player }: PlayerCardProps) {
  const position = player.position as keyof typeof positionIcons; // Type assertion for position
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
      <h3 className="flex text-lg font-bold">
        {player.position && positionIcons[position] && (
          <Image
            src={positionIcons[position]} // Get the icon for the position
            alt={player.position}
            width={24}
            height={24}
            className="object-contain"
          />
        )}
        {player.nickname}
      </h3>
      <p className="text-gray-500">{player.realname}</p>
      <div className="flex space-x-1">
        {player.social && typeof player.social === "object" ? (
          <SocialLinks links={player.social} iconClassName="w-6 h-6" />
        ) : (
          <p>No social links available</p> // Fallback if no social links
        )}
      </div>
    </div>
  );
}
