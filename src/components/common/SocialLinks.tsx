const socialIcons: Record<string, string> = {
  instagram: "/icons/instagram-logo.svg",
  xLogo: "/icons/x-logo.svg",
  youtube: "/icons/youtube-logo-fill.svg",
  soop: "/icons/soop-logo.svg",
  chzzk: "/icons/chzzk-logo.svg",
};

interface SocialLinksProps {
  links?: Record<string, string>;
  iconClassName?: string; // Tailwind로 크기 조절 가능
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links, iconClassName = "w-6 h-6" }) => {
  if (!links) return null;

  return (
    <div className="flex space-x-3 mt-3">
      {Object.entries(links).map(([platform, url]) => {
        const iconSrc = socialIcons[platform]; // ✅ SVG 파일의 경로 가져오기
        if (!iconSrc) return null;

        return (
          <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
            <img src={iconSrc} alt={platform} className={iconClassName} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
