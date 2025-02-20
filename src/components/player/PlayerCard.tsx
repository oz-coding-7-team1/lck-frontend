// import { positionIcons } from "@/src/utils/positionIcons";
import Image from "next/image";
import SocialLinks from "../common/SocialLinks";
import { positionIcons } from "@/src/utils/positionIcons";
// import SocialLinks from "../common/SocialLinks";

interface PlayerCardProps {
  player: any;
}

//todo type으로 에러나는 부분 모두 any로 수정

export default function PlayerCard({ player }: PlayerCardProps) {
  const position = player.position as keyof typeof positionIcons; // 타입을 명시적으로 지정
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
      <h3 className="text-lg font-bold flex">
      {player.position && positionIcons[position] && (
          <Image
            src={positionIcons[position]} // position에 맞는 아이콘 가져오기
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
        <SocialLinks
            links={player.social}
            iconClassName="w-6 h-6"
          />
      </div>
    </div>
  );
}
