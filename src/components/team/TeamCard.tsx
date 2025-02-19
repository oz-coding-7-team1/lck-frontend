import Image from 'next/image';

interface TeamCardProps {
  team: {
    id: number;
    name: string;
    social: Record<string, string> | undefined;
    logoUrl?: string; // Assuming you have a logo URL
  };
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="flex flex-col items-center p-2 space-y-2 bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="w-24 h-24 overflow-hidden rounded-full">
        <Image
          src={team.logoUrl || "/images/default-team.svg"}
          alt={team.name}
          width={96}
          height={96}
          className="object-cover"
        />
      </div>
      <h3 className="text-lg font-bold">{team.name}</h3>
      <div className="flex space-x-1">
        {team.social &&
          Object.entries(team.social).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              {platform}
            </a>
          ))}
      </div>
    </div>
  );
}
