const socialIcons: Record<string, string> = {
    instagram: "/icons/instagram-logo.svg",
    xLogo: "/icons/x-logo.svg",
    youtube: "/icons/youtube-logo.svg",
    soop: "/icons/soop-logo.svg",
    chzzk: "/icons/chzzk-logo.svg",
  };
  
  interface SocialLinksProps {
    links?: Record<string, string>;
  }
  
  const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
    if (!links) return null;
  
    return (
      <div className="flex space-x-3 mt-3">
        {Object.entries(links).map(([platform, url]) => {
          const iconSrc = socialIcons[platform] ?? null; // ✅ 아이콘이 없으면 `null` 반환
  
          if (!iconSrc) return null; // ✅ `src=""` 방지
  
          return (
            <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
              <img src={iconSrc} alt={platform} className="w-6 h-6" />
            </a>
          );
        })}
      </div>
    );
  };
  
  export default SocialLinks;
  