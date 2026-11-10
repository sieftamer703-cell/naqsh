import { LINKS } from "@/lib/config";
import { SOCIALS } from "./Icons";

export default function SocialLinks({
  className = "",
  itemClass = "border-gold/40 text-gold hover:bg-gold hover:text-ink",
}: {
  className?: string;
  itemClass?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={LINKS[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`grid h-10 w-10 place-items-center rounded-full border transition ${itemClass}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
