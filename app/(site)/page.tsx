import Link from "next/link";
import { getCategoriesWithCounts, getFeaturedProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import HeroArt from "@/components/HeroArt";
import SocialLinks from "@/components/SocialLinks";
import { Ornament, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { BRAND, LINKS, generalWhatsAppLink, wholesaleWhatsAppLink } from "@/lib/config";

export const dynamic = "force-dynamic";

const WHY = [
  { n: "٠١", t: "تصاميم أصيلة", d: "نقوش مستوحاة من التراث المصري والعربي بلمسة عصرية تناسب كل مساحة." },
  { n: "٠٢", t: "جودة في كل تفصيلة", d: "خامات مختارة بعناية وتشطيب دقيق يضمن أن يبقى العمل الفني جميلاً لسنوات." },
  { n: "٠٣", t: "تنوع يناسب كل ذوق", d: "تشكيلات متنوعة من التابلوهات وديكورات الحائط للمنازل والمحلات والمكاتب." },
  { n: "٠٤", t: "خدمة تواصل مباشرة", d: "فريقنا متاح عبر واتساب للإجابة عن استفساراتك ومساعدتك في اختيار الأنسب." },
  { n: "٠٥", t: "أنظمة جملة مرنة", d: "شراكات واضحة مع التجار وأصحاب المعارض بكميات وتشكيلات تناسب سوقك." },
  { n: "٠٦", t: "هوية تصنع المكان", d: "كل قطعة تُضيف شخصية وروحاً للمكان، لا مجرد زينة على الحائط." },
];

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    getCategoriesWithCounts(),
    getFeaturedProducts(8),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <div className="pattern-gold absolute inset-0 opacity-[0.07]" />
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-xs font-bold text-gold-light">
              <Ornament className="h-4 w-4" /> براند مصري • تابلوهات وديكورات حائط
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.15] md:text-7xl">
              <span className="block tracking-[0.15em] text-gold-light">NAQSH</span>
              <span className="block">نقش</span>
            </h1>
            <p className="mt-4 font-serif text-3xl text-gold-light md:text-4xl">{BRAND.tagline}</p>
            <p className="mt-6 max-w-xl text-base leading-8 text-cream/75">
              في نقش نحوّل الجدران الصامتة إلى حكايات بصرية. نقدّم تابلوهات وديكورات حائط
              تجمع بين روح التراث وأناقة التصميم العصري، للأفراد الباحثين عن التميّز
              ولتجار الجملة الباحثين عن شريك موثوق.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/catalog" className="btn btn-gold">استكشف الكتالوج</Link>
              <a href="#contact" className="btn btn-outline-light">تواصل معنا</a>
            </div>
            <SocialLinks className="mt-10" />
          </div>
          <div className="relative h-[420px] md:h-[520px]">
            <HeroArt />
          </div>
        </div>
      </section>

      {/* BRAND STRIP */}
      <section className="border-y border-gold/30 bg-sand">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5 font-display text-lg text-gold-dark">
          <span>✦ تابلوهات فنية</span>
          <span>✦ ديكورات حائط</span>
          <span>✦ للأفراد</span>
          <span>✦ لتجار الجملة</span>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20">
        <div className="text-center">
          <p className="font-bold text-gold-dark">التصنيفات</p>
          <h2 className="section-title mt-2">اختر ما يناسب مساحتك</h2>
        </div>
        {categories.length === 0 ? (
          <EmptyState text="سيتم إضافة التصنيفات قريباً." />
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/catalog?category=${encodeURIComponent(c.slug)}`}
                className="group relative overflow-hidden rounded-2xl border border-gold/25 bg-white p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-xl"
              >
                <div className="pattern-gold absolute inset-0 opacity-0 transition group-hover:opacity-10" />
                <Ornament className="relative h-9 w-9 text-gold" />
                <h3 className="relative mt-5 font-display text-xl font-bold">{c.name}</h3>
                {c.description && (
                  <p className="relative mt-2 line-clamp-2 text-sm leading-6 text-ink/60">{c.description}</p>
                )}
                <p className="relative mt-4 text-sm font-bold text-gold-dark">
                  {c.count} {c.count === 1 ? "منتج" : "منتجات"} ←
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* FEATURED */}
      <section className="bg-sand/60 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-bold text-gold-dark">المنتجات المميزة</p>
              <h2 className="section-title mt-2">من أحدث أعمالنا</h2>
            </div>
            <Link href="/catalog" className="btn btn-outline">عرض كل المنتجات</Link>
          </div>
          {featured.length === 0 ? (
            <EmptyState text="يتم تجهيز مجموعة المنتجات، ترقّبوا الإضافات قريباً." />
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="text-center">
          <p className="font-bold text-gold-dark">لماذا نقش؟</p>
          <h2 className="section-title mt-2">لماذا تختار NAQSH</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w) => (
            <div key={w.n} className="rounded-2xl border border-gold/20 bg-white p-7">
              <span className="font-display text-4xl font-bold text-gold/60">{w.n}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{w.t}</h3>
              <p className="mt-2 text-sm leading-7 text-ink/65">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHOLESALE */}
      <section id="wholesale" className="relative scroll-mt-20 overflow-hidden bg-ink text-cream">
        <div className="pattern-gold absolute inset-0 opacity-[0.07]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2">
          <div>
            <p className="font-bold text-gold-light">تجار الجملة</p>
            <h2 className="section-title mt-2">شريكك في سوق ديكورات الحائط</h2>
            <p className="mt-5 max-w-lg leading-8 text-cream/75">
              هل تمتلك معرضاً أو محلاً أو تعمل في تجارة الديكور؟ نقش تقدّم لك تشكيلات
              متجددة وتعاملاً مباشراً وواضحاً يساعدك على النمو.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={wholesaleWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                <WhatsAppIcon /> اطلب كتالوج الجملة
              </a>
              <a href={LINKS.phoneHref} className="btn btn-outline-light">
                <PhoneIcon /> <span dir="ltr">{LINKS.phone}</span>
              </a>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              "تشكيلات متجددة باستمرار",
              "كميات مرنة تناسب نشاطك",
              "تواصل مباشر وسريع عبر واتساب",
              "كتالوج إلكتروني بأكواد واضحة لكل منتج",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-2xl border border-gold/25 bg-white/5 p-5">
                <Ornament className="mt-1 h-5 w-5 shrink-0 text-gold-light" />
                <span className="text-sm font-semibold leading-7">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20">
        <div className="text-center">
          <p className="font-bold text-gold-dark">تواصل معنا</p>
          <h2 className="section-title mt-2">يسعدنا سماعك</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/65">
            للاستفسار عن المنتجات أو الطلبات الخاصة أو التعامل بالجملة، راسلنا في أي وقت.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <a
            href={generalWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-gold/25 bg-white p-6 transition hover:border-[#1faa59] hover:shadow-lg"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#1faa59] text-white">
              <WhatsAppIcon className="h-7 w-7" />
            </span>
            <span>
              <span className="block font-display text-lg font-bold">واتساب</span>
              <span className="block text-ink/70" dir="ltr" style={{ textAlign: "right" }}>{LINKS.phone}</span>
            </span>
          </a>
          <a
            href={LINKS.phoneHref}
            className="flex items-center gap-4 rounded-2xl border border-gold/25 bg-white p-6 transition hover:border-gold hover:shadow-lg"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-gold-light">
              <PhoneIcon className="h-6 w-6" />
            </span>
            <span>
              <span className="block font-display text-lg font-bold">اتصال مباشر</span>
              <span className="block text-ink/70" dir="ltr" style={{ textAlign: "right" }}>{LINKS.phone}</span>
            </span>
          </a>
        </div>
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="font-display text-lg">تابعنا على السوشيال ميديا</p>
          <SocialLinks itemClass="h-12 w-12 border-gold/50 text-gold-dark hover:bg-gold hover:text-ink" />
        </div>
      </section>
    </>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-dashed border-gold/50 bg-white/60 px-6 py-12 text-center">
      <Ornament className="mx-auto h-10 w-10 text-gold" />
      <p className="mt-4 text-ink/70">{text}</p>
    </div>
  );
}
