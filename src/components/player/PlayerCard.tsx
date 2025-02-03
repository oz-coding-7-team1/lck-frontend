import { PlayerCardData } from '@/src/types/player';
import { positionIcons } from '@/src/utils/positonIcons';
import Image from 'next/image';

interface PlayerCardProps {
  player: PlayerCardData;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      <Image
        src="/placeholder.svg"
        alt={player.name}
        width={64}
        height={64}
        className="rounded-full"
      />
      <div>
      <h3 className="text-lg font-bold flex items-center justify-center">
        <Image src={positionIcons[player.position]} alt={player.position} width={20} height={20} className="mr-2" />
        {player.nickname}
      </h3>
        <p>{player.name}</p>
        <p className="text-sm text-blue-500">{player.position}</p>
      <div className="flex justify-center mt-2 space-x-2">
        {player.socialLinks?.instagram && (
          <a href={player.socialLinks.instagram} target="_blank"></a>
        )}
        {player.socialLinks?.twitter && (
          <a href={player.socialLinks.twitter} target="_blank"></a>
        )}
        {player.socialLinks?.youtube && (
          <a href={player.socialLinks.youtube} target="_blank"></a>
        )}
      </div>
      </div>
    </div>
  );
}
