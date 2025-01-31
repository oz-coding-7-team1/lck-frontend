import Image from 'next/image';

interface PlayerCardProps {
  name: string;
  nickname: string;
  rank: string;
  votes: number;
}

export default function PlayerCard({
  name,
  nickname,
  rank,
  votes,
}: PlayerCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      <Image
        src="/placeholder.svg"
        alt={name}
        width={64}
        height={64}
        className="rounded-full"
      />
      <div>
        <h3 className="font-bold">{nickname}</h3>
        <p>{name}</p>
        <p className="text-sm text-gray-500">{rank}</p>
        <p className="text-sm">{votes.toLocaleString()} votes</p>
      </div>
    </div>
  );
}
