import Image from 'next/image';

interface TeamCardProps {
  name: string;
  rank: string;
  votes: number;
}

export default function TeamCard({ name, rank, votes }: TeamCardProps) {
  return (
    <div className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow-md">
      <Image src="/placeholder.svg" alt={name} width={64} height={64} />
      <div>
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-gray-500">{rank}</p>
        <p className="text-sm">{votes.toLocaleString()} votes</p>
      </div>
    </div>
  );
}
