import Link from "next/link";
import PlayerCard from "../../components/player/PlayerCard";
import { encodePlayerName } from "@/src/utils/urlUtils"; // 닉네임을 URL-friendly하게 변환하는 함수

const players = [
  {
    nickname: "FAKER",
    name: "이상혁",
    position: "MID",
    profileImage: "/faker-img/T1-Faker-wins-Worlds-2023-esports-greatest-comeback.jpeg",
    socialLinks: {
      instagram: "https://www.instagram.com/faker",
      xLogo: "https://twitter.com/faker",
      youtube: "https://www.youtube.com/faker",
    },
  },
  {
    nickname: "CHOVY",
    name: "정지훈",
    position: "MID",
    profileImage: "/icons/chovy.svg",
    socialLinks: {
      instagram: "https://www.instagram.com/chovy",
      xLogo: "https://twitter.com/chovy",
    },
  },
  {
    nickname: "GUMAYUSI",
    name: "이민형",
    position: "AD",
    profileImage: "/icons/gumayusi.svg",
    socialLinks: {
      instagram: "https://www.instagram.com/gumayusi",
      xLogo: "https://twitter.com/gumayusi",
    },
  },
  {
    nickname: "KERIA",
    name: "류민석",
    position: "SUPPORT",
    profileImage: "/icons/keria.svg",
    socialLinks: {
      instagram: "https://www.instagram.com/keria",
      xLogo: "https://twitter.com/keria",
    },
  },
];

export default function PlayerListPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Player List</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player, index) => (
            <Link key={index} href={`/player/${encodePlayerName(player.nickname)}`} className="block">
              <PlayerCard player={player} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
