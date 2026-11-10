import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="NAQSH | نقش">
      {/* استبدل public/logo.svg بملف اللوجو الأصلي */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="شعار نقش" className="h-11 w-11" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-bold tracking-[0.18em] ${light ? "text-cream" : "text-ink"}`}
        >
          NAQSH
        </span>
        <span className="mt-1 font-display text-sm text-gold">نقش</span>
      </span>
    </Link>
  );
}
