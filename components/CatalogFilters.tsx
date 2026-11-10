"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "./Icons";

type Cat = { id: number; name: string; slug: string; count: number };

function buildHref(p: { q?: string; category?: string; sort?: string }) {
  const sp = new URLSearchParams();
  if (p.q) sp.set("q", p.q);
  if (p.category) sp.set("category", p.category);
  if (p.sort && p.sort !== "newest") sp.set("sort", p.sort);
  const s = sp.toString();
  return s ? `/catalog?${s}` : "/catalog";
}

export default function CatalogFilters({
  categories,
  q,
  category,
  sort,
  totalAll,
}: {
  categories: Cat[];
  q: string;
  category: string;
  sort: string;
  totalAll: number;
}) {
  const router = useRouter();
  const [text, setText] = useState(q);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (text.trim() === q) return;
    const t = setTimeout(() => {
      router.replace(buildHref({ q: text.trim(), category, sort }));
    }, 350);
    return () => clearTimeout(t);
  }, [text, q, category, sort, router]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-[1fr_220px]">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-dark" />
          <input
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ابحث باسم المنتج أو كود المنتج (SKU)"
            className="field !rounded-full !py-3 !pr-12"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => router.replace(buildHref({ q, category, sort: e.target.value }))}
          className="field !rounded-full !py-3"
          aria-label="ترتيب المنتجات"
        >
          <option value="newest">الأحدث أولاً</option>
          <option value="oldest">الأقدم أولاً</option>
          <option value="name">الاسم (أ → ي)</option>
          <option value="name-desc">الاسم (ي → أ)</option>
          <option value="sku">كود المنتج</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip href={buildHref({ q, sort })} active={!category}>
          الكل <small className="opacity-70">({totalAll})</small>
        </Chip>
        {categories.map((c) => (
          <Chip key={c.id} href={buildHref({ q, sort, category: c.slug })} active={category === c.slug}>
            {c.name} <small className="opacity-70">({c.count})</small>
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
        active
          ? "border-ink bg-ink text-gold-light"
          : "border-gold/40 bg-white text-ink hover:bg-gold/10"
      }`}
    >
      {children}
    </Link>
  );
}
