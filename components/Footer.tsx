import Link from "next/link";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { BRAND, LINKS } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="pattern-gold absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-5 font-serif text-xl text-gold-light">{BRAND.tagline}</p>
          <p className="mt-3 max-w-xs text-sm leading-7 text-cream/70">
            براند مصري متخصص في تابلوهات وديكورات الحائط، نخدم الأفراد وتجار الجملة.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg text-gold-light">روابط سريعة</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li><Link href="/" className="hover:text-gold-light">الرئيسية</Link></li>
            <li><Link href="/catalog" className="hover:text-gold-light">الكتالوج</Link></li>
            <li><Link href="/#categories" className="hover:text-gold-light">التصنيفات</Link></li>
            <li><Link href="/#wholesale" className="hover:text-gold-light">تجار الجملة</Link></li>
            <li><Link href="/#contact" className="hover:text-gold-light">تواصل معنا</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-gold-light">تواصل معنا</h3>
          <div className="mt-4 space-y-3 text-sm">
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cream/80 hover:text-gold-light">
              <WhatsAppIcon /> <span dir="ltr">{LINKS.phone}</span>
            </a>
            <a href={LINKS.phoneHref} className="flex items-center gap-2 text-cream/80 hover:text-gold-light">
              <PhoneIcon /> اتصال مباشر
            </a>
          </div>
          <SocialLinks className="mt-6" />
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} NAQSH | نقش — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
