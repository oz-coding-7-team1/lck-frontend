import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-to-b from-gray-100 to-transparent py-12">
        <h1 className="text-center text-xl mb-12">
          당신의 최애 선수에게 투표하세요
        </h1>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <section className="space-y-6">
            <h2 className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              Player Rank
            </h2>

            <div className="space-y-6">
              <Link href="/player/faker" className="block">
                <div className="aspect-[2/1] relative bg-gray-100 rounded-lg overflow-hidden">
                  <div className="absolute bottom-4 left-4">
                    <div className="text-sm text-gray-600">1st</div>
                    <div className="font-bold text-xl">FAKER</div>
                  </div>
                </div>
              </Link>

              <div className="grid grid-cols-2 gap-4">
                <Link href="/player/chovy" className="block">
                  <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute bottom-4 left-4">
                      <div className="text-sm text-gray-600">2nd</div>
                      <div className="font-bold">CHOVY</div>
                    </div>
                  </div>
                </Link>

                <Link href="/player/gumayusi" className="block">
                  <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute bottom-4 left-4">
                      <div className="text-sm text-gray-600">3rd</div>
                      <div className="font-bold">GUMAYUSI</div>
                    </div>
                  </div>
                </Link>
              </div>

              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i + 4}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div>
                    <div className="font-bold">KERIA</div>
                    <div className="text-sm text-gray-600">류민석</div>
                  </div>
                  <div className="ml-auto text-sm text-gray-400">230,000</div>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-8">
            <section>
              <h2 className="font-bold mb-4">Team Rank</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                {[
                  { rank: '1st', name: 'T1', votes: '230,000' },
                  { rank: '2', name: 'GEN.G', votes: '220,000' },
                  { rank: '3', name: 'Hanwha Life Esports', votes: '210,000' },
                  { rank: '4', name: 'Dplus KIA', votes: '200,000' },
                  { rank: '5', name: 'kt Rolster', votes: '190,000' },
                ].map((team, index) => (
                  <Link href={`/team/${team.name.toLowerCase()}`} key={index}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium">{team.name}</div>
                      </div>
                      <div className="text-sm text-gray-400">{team.votes}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-bold mb-4">Lane Rank</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <button>
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="font-bold">TOP</div>
                  <button>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium">Player</div>
                      </div>
                      <div className="text-sm text-gray-400">230,000</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
