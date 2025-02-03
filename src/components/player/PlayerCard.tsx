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
    <div className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow-md">
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
