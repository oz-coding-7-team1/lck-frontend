'use client';

import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const lanes = [
    { name: 'TOP', icon: '/icons/top.svg' },
    { name: 'JUNGLE', icon: '/icons/jungle.svg' },
    { name: 'MID', icon: '/icons/mid.svg' },
    { name: 'BOTTOM', icon: '/icons/bottom.svg' },
    { name: 'SUPPORT', icon: '/icons/support.svg' },
  ];
  const [currentLane, setCurrentLane] = useState(0);

  const handleNextLane = () => {
    setCurrentLane((prev) => (prev + 1) % lanes.length);
  };

  const handlePrevLane = () => {
    setCurrentLane((prev) => (prev - 1 + lanes.length) % lanes.length);
  };

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
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              Player Rank
            </h2>

            <div className="space-y-6">
              <Link href="/player/faker" className="block">
                <div className="aspect-[2/1] relative bg-white shadow-lg rounded-xl overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/faker-img/T1-Faker-wins-Worlds-2023-esports-greatest-comeback.jpeg"
                      alt="FAKER"
                      layout="fill"
                      objectFit="cover"
                      className="opacity-80"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-lg font-bold text-gray-600">1st</div>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                      FAKER
                      <Image
                        src="/icons/faker.svg"
                        alt="FAKER"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="text-lg text-gray-600">이상혁</div>
                  </div>
                </div>
              </Link>

              <div className="grid grid-cols-2 gap-6">
                <Link href="/player/chovy" className="block">
                  <div className="relative overflow-hidden bg-white shadow-lg aspect-square rounded-xl">
                    <div className="absolute inset-y-0 left-0 w-1/2">
                      <Image
                        src="/icons/chovy.svg"
                        alt="CHOVY"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-20"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="text-lg font-bold text-gray-600">2</div>
                      <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                        CHOVY
                        <Image
                          src="/icons/chovy.svg"
                          alt="CHOVY"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </div>
                      <div className="text-lg text-gray-600">정지훈</div>
                    </div>
                  </div>
                </Link>

                <Link href="/player/gumayusi" className="block">
                  <div className="relative overflow-hidden bg-white shadow-lg aspect-square rounded-xl">
                    <div className="absolute inset-y-0 left-0 w-1/2">
                      <Image
                        src="/icons/gumayusi.svg"
                        alt="GUMAYUSI"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-20"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="text-lg font-bold text-gray-600">3</div>
                      <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                        GUMAYUSI
                        <Image
                          src="/icons/gumayusi.svg"
                          alt="GUMAYUSI"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </div>
                      <div className="text-lg text-gray-600">이민형</div>
                    </div>
                  </div>
                </Link>
              </div>

              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i + 4}
                  className="flex items-center gap-6 p-6 bg-white rounded-lg shadow-md"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                      KERIA
                      <Image
                        src="/icons/keria.svg"
                        alt="KERIA"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="text-lg text-gray-600">류민석</div>
                  </div>
                  <div className="flex items-center gap-4 ml-auto text-lg text-gray-500">
                    <Heart className="w-6 h-6 text-red-500" />
                    230,000
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="col-span-2 space-y-6">
            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                Team Rank
              </h2>
              <div className="p-10 space-y-8 bg-white rounded-lg shadow-md">
                <div className="flex flex-col items-center gap-6 p-6 bg-gray-100 rounded-lg">
                  <div className="text-lg font-bold text-gray-600">1st</div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
                      <Image
                        src="/logos/t1.svg"
                        alt="T1"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="text-lg font-medium text-gray-900">T1</div>
                  </div>
                  <div className="flex items-center gap-4 text-lg text-gray-500">
                    <Heart className="w-6 h-6 text-red-500" />
                    230,000
                  </div>
                </div>
                {[
                  {
                    rank: 2,
                    name: 'GEN.G',
                    votes: '220,000',
                    logo: '/logos/geng.svg',
                  },
                  {
                    rank: 3,
                    name: 'Hanwha Life Esports',
                    votes: '210,000',
                    logo: '/logos/hle.svg',
                  },
                  {
                    rank: 4,
                    name: 'Dplus KIA',
                    votes: '200,000',
                    logo: '/logos/dk.svg',
                  },
                  {
                    rank: 5,
                    name: 'kt Rolster',
                    votes: '190,000',
                    logo: '/logos/kt.svg',
                  },
                ].map((team, index) => (
                  <Link
                    href={`/team/${team.name
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                    key={index}
                  >
                    <div className="flex items-center gap-6 p-4">
                      <div className="text-lg font-bold text-gray-600">
                        {team.rank}
                      </div>
                      <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
                        <Image
                          src={team.logo}
                          alt={team.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-lg font-medium text-gray-900">
                        {team.name}
                      </div>
                      <div className="flex items-center gap-4 text-lg text-gray-500">
                        <Heart className="w-6 h-6 text-red-500" />
                        {team.votes}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mt-4 mb-4 text-gray-800 mt-bold mt-text-xl">
                Lane Rank
              </h2>
              <div className="p-6 mt-4 space-y-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <button onClick={handlePrevLane}>
                    <ChevronLeft className="w-6 h-6 text-gray-500" />
                  </button>
                  <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Image
                      src={lanes[currentLane].icon}
                      alt={lanes[currentLane].name}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    {lanes[currentLane].name}
                  </div>
                  <button onClick={handleNextLane}>
                    <ChevronRight className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                <div className="flex flex-col items-center gap-6 p-6 bg-gray-100 rounded-lg">
                  <div className="text-lg font-bold text-gray-600">1st</div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
                      <Image
                        src="/icons/faker.svg"
                        alt="FAKER"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="text-lg font-medium text-gray-900">
                      FAKER
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-lg text-gray-500">
                    <Heart className="w-6 h-6 text-red-500" />
                    230,000
                  </div>
                </div>
                <div className="space-y-6">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="flex items-center gap-6 p-4">
                      <div className="text-lg font-bold text-gray-600">
                        {i + 2}
                      </div>
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div className="flex-1 text-xl font-medium text-gray-900">
                        Player
                      </div>
                      <div className="flex items-center gap-4 text-lg text-gray-500">
                        <Heart className="w-6 h-6 text-red-500" />
                        230,000
                      </div>
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
