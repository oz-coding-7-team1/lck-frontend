import PlayerCard from '../../components/player/PlayerCard';

export default function PlayerListPage() {
  const players = [
    {
      nickname: 'FAKER',
      realName: '이상혁',
      laneIcon: '/icons/mid.svg',
      profileImage:
        '/faker-img/T1-Faker-wins-Worlds-2023-esports-greatest-comeback.jpeg',
      socialLinks: {
        instagram: 'https://www.instagram.com/faker',
        xLogo: 'https://twitter.com/faker',
        youtube: 'https://www.youtube.com/faker',
      },
    },
    {
      nickname: 'CHOVY',
      realName: '정지훈',
      laneIcon: '/icons/mid.svg',
      profileImage: '/icons/chovy.svg',
      socialLinks: {
        instagram: 'https://www.instagram.com/chovy',
        xLogo: 'https://twitter.com/chovy',
      },
    },
    {
      nickname: 'GUMAYUSI',
      realName: '이민형',
      laneIcon: '/icons/bottom.svg',
      profileImage: '/icons/gumayusi.svg',
      socialLinks: {
        instagram: 'https://www.instagram.com/gumayusi',
        xLogo: 'https://twitter.com/gumayusi',
      },
    },
    {
      nickname: 'KERIA',
      realName: '류민석',
      laneIcon: '/icons/support.svg',
      profileImage: '/icons/keria.svg',
      socialLinks: {
        instagram: 'https://www.instagram.com/keria',
        xLogo: 'https://twitter.com/keria',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Player List</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player, index) => (
            <PlayerCard
              key={index}
              nickname={player.nickname}
              realName={player.realName}
              laneIcon={player.laneIcon}
              profileImage={player.profileImage}
              socialLinks={player.socialLinks}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
