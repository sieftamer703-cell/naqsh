import { generalWhatsAppLink } from "@/lib/config";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={generalWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="wa-pulse fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#1faa59] text-white shadow-xl transition hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
