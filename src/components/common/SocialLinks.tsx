import Link from 'next/link';
import Image from 'next/image';

const socialIcons: Record<string, string> = {
  instagram: '/icons/instagram-logo.svg',
  xLogo: '/icons/x-logo.svg',
  youtube: '/icons/youtube-logo.svg',
  soop: '/icons/soop-logo.svg',
  chzzk: '/icons/chzzk-logo.svg',
};

interface SocialLinksProps {
  links?: Record<string, string>;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  if (!links) return null;

  return (
    <div className="flex mt-3 space-x-3">
      {Object.entries(links).map(([platform, url]) => {
        const iconSrc = socialIcons[platform] ?? null; // ✅ 아이콘이 없으면 `null` 반환

        if (!iconSrc) return null; // ✅ `src=""` 방지

        return (
          <div key={platform}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Image src={iconSrc} alt={platform} className="w-6 h-6" width={24} height={24} />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default SocialLinks;
