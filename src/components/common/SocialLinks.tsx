const socialIcons: Record<string, string> = {
  instagram: "@/public/icons/instagram.svg",
  twitter: "@/public/icons/twitter.svg",
  youtube: "@/public/icons/youtube.svg",
  twitch: "@/public/icons/twitch.svg",
};

interface SocialLinksProps {
  links?: Record<string, string>;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  if (!links) return null;

  return (
    <div className="flex space-x-3 mt-3">
      {Object.entries(links).map(([platform, url]) => (
        <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
          <img src={socialIcons[platform] || ""} alt={platform} className="w-6 h-6" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;