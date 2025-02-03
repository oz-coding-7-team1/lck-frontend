import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="py-20 bg-gradient-to-b from-gray-200 to-transparent">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          당신의 최애 선수에게 투표하세요
        </h1>
      </div>

      <div className="container flex-grow px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <section className="col-span-2 space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              Player Rank
            </h2>

            <div className="space-y-6">
              <Link href="/player/faker" className="block">
                <div className="aspect-[2/1] relative bg-white shadow-lg rounded-xl overflow-hidden">
                  <div className="absolute bottom-4 left-4">
                    <div className="text-sm text-gray-600">1st</div>
                    <div className="text-xl font-bold text-gray-900">FAKER</div>
                  </div>
                </div>
              </Link>

              <div className="grid grid-cols-2 gap-6">
                <Link href="/player/chovy" className="block">
                  <div className="relative overflow-hidden bg-white shadow-lg aspect-square rounded-xl">
                    <div className="absolute bottom-4 left-4">
                      <div className="text-sm text-gray-600">2nd</div>
                      <div className="font-bold text-gray-900">CHOVY</div>
                    </div>
                  </div>
                </Link>

                <Link href="/player/gumayusi" className="block">
                  <div className="relative overflow-hidden bg-white shadow-lg aspect-square rounded-xl">
                    <div className="absolute bottom-4 left-4">
                      <div className="text-sm text-gray-600">3rd</div>
                      <div className="font-bold text-gray-900">GUMAYUSI</div>
                    </div>
                  </div>
                </Link>
              </div>

              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i + 4}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-bold text-gray-900">KERIA</div>
                    <div className="text-sm text-gray-600">류민석</div>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">230,000</div>
                </div>
              ))}
            </div>
          </section>

          <div className="col-span-2 space-y-8">
            <section>
              <h2 className="mb-4 text-lg font-bold text-gray-800">
                Team Rank
              </h2>
              <div className="p-4 space-y-4 bg-white rounded-lg shadow-md">
                {[
                  { rank: '1st', name: 'T1', votes: '230,000' },
                  { rank: '2', name: 'GEN.G', votes: '220,000' },
                  { rank: '3', name: 'Hanwha Life Esports', votes: '210,000' },
                  { rank: '4', name: 'Dplus KIA', votes: '200,000' },
                  { rank: '5', name: 'kt Rolster', votes: '190,000' },
                ].map((team, index) => (
                  <Link href={`/team/${team.name.toLowerCase()}`} key={index}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div className="flex-1 font-medium text-gray-900">
                        {team.name}
                      </div>
                      <div className="text-sm text-gray-500">{team.votes}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-gray-800">
                Lane Rank
              </h2>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <button>
                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                  </button>
                  <div className="font-bold text-gray-900">TOP</div>
                  <button>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div className="flex-1 font-medium text-gray-900">
                        Player
                      </div>
                      <div className="text-sm text-gray-500">230,000</div>
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
