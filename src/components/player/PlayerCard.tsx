import Image from 'next/image';
import SocialLinks from '../common/SocialLinks';

interface PlayerCardProps {
  nickname: string;
  realName: string;
  laneIcon: string;
  profileImage: string;
  socialLinks: Record<string, string>;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  nickname,
  realName,
  laneIcon,
  profileImage,
  socialLinks,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 overflow-hidden bg-gray-300 rounded-full">
          <Image src={profileImage} alt={nickname} width={64} height={64} className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
            {nickname}
            <Image src={laneIcon} alt="Lane Icon" width={24} height={24} className="w-6 h-6" />
          </div>
          <div className="text-lg text-gray-600">{realName}</div>
        </div>
      </div>
      <SocialLinks links={socialLinks} />
    </div>
  );
};

export default PlayerCard;
