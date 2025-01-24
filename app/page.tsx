import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-xl mb-12">
        당신의 최애 선수에게 투표하세요
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            Player Rank
          </h2>

          <div className="space-y-4">
            <Link href="/player/faker" className="block">
              <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="FAKER"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold">FAKER</div>
                  <div className="text-sm text-gray-600">이상혁</div>
                </div>
                <div className="ml-auto text-sm font-medium">1st</div>
              </div>
            </Link>

            {/* Similar blocks for CHOVY and GUMAYUSI */}
            <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="CHOVY"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold">CHOVY</div>
                <div className="text-sm text-gray-600">이지훈</div>
              </div>
              <div className="ml-auto text-sm font-medium">2nd</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="GUMAYUSI"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold">GUMAYUSI</div>
                <div className="text-sm text-gray-600">이민형</div>
              </div>
              <div className="ml-auto text-sm font-medium">3rd</div>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          <section>
            <h2 className="font-bold mb-4">Team Rank</h2>
            <div className="space-y-2">
              {[
                {
                  rank: '1st',
                  name: 'T1',
                  logo: '/placeholder.svg?height=32&width=32',
                },
                {
                  rank: '2',
                  name: 'GEN.G',
                  logo: '/placeholder.svg?height=32&width=32',
                },
                {
                  rank: '3',
                  name: 'Hanwha Life Esports',
                  logo: '/placeholder.svg?height=32&width=32',
                },
                {
                  rank: '4',
                  name: 'Dplus KIA',
                  logo: '/placeholder.svg?height=32&width=32',
                },
                {
                  rank: '5',
                  name: 'kt Rolster',
                  logo: '/placeholder.svg?height=32&width=32',
                },
              ].map((team) => (
                <Link
                  href={`/team/${team.name.toLowerCase()}`}
                  key={team.name}
                  className="block"
                >
                  <div className="bg-gray-50 p-4 rounded flex items-center gap-4">
                    <Image
                      src={team.logo || '/placeholder.svg'}
                      alt={team.name}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <span>{team.name}</span>
                    <span className="ml-auto text-sm">{team.rank}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-bold mb-4">Lane Rank</h2>
            <div className="space-y-2">
              {[
                { rank: '1st', position: 'TOP' },
                { rank: '2', position: 'MID' },
                { rank: '3', position: 'ADC' },
                { rank: '4', position: 'JGL' },
                { rank: '5', position: 'SUP' },
              ].map((lane) => (
                <div
                  key={lane.position}
                  className="bg-gray-50 p-4 rounded flex items-center gap-4"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <span>Player</span>
                  <span className="ml-auto text-sm">{lane.rank}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      {/* Removed link to test page */}
    </div>
  );
}
