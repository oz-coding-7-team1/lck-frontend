import Link from 'next/link';
import TeamCard from '../../components/team/TeamCard';
import { encodeTeamName } from '@/src/utils/urlUtils'; // 팀 이름을 URL-friendly하게 변환하는 함수

export default function TeamListPage() {
  const teams = [
    {
      name: 'T1',
      rank: '1st',
      logo: '/logos/t1.svg',
      votes: 230000,
    },
    {
      name: 'GEN.G',
      rank: '2nd',
      logo: '/logos/geng.svg',
      votes: 220000,
    },
    {
      name: 'Hanwha Life Esports',
      rank: '3rd',
      logo: '/logos/hle.svg',
      votes: 210000,
    },
    {
      name: 'Dplus KIA',
      rank: '4th',
      logo: '/logos/dk.svg',
      votes: 200000,
    },
    {
      name: 'kt Rolster',
      rank: '5th',
      logo: '/logos/kt.svg',
      votes: 190000,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Team List</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, index) => (
            <Link key={index} href={`/team/${encodeTeamName(team.name)}`}>
              <TeamCard
                name={team.name}
                rank={team.rank}
                logo={team.logo}
                votes={team.votes}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
