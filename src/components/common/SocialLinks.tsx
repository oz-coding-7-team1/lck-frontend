import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const socialIcons: Record<string, string> = {
  insta: "/icons/instagram-logo.svg",
  X: "/icons/x-logo.svg",
  youtube: "/icons/youtube-logo-fill.svg",
  soop: "/icons/soop-logo.svg",
  chzzk: "/icons/chzzk-logo.svg",
  facebook: "/icons/facebook-logo.svg",
};

interface SocialLinksProps {
  links?: Record<string, string>;
  iconClassName?: string; // Tailwind로 크기 조절 가능
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  links = {}, // 기본값으로 빈 객체 할당
  iconClassName = "w-6 h-6",
}) => {
  return (
    <div className="flex mt-3 space-x-3">
      {Object.entries(links).map(([platform, url]) => {
        const iconSrc = socialIcons[platform]; // 아이콘 경로 가져오기
        if (!iconSrc) return null;

        return (
          <Link
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={iconSrc} alt={platform} className={iconClassName} />
          </Link>
        );
      })}
    </div>
  );
};

export default SocialLinks;
