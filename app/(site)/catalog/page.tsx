import type { Metadata } from "next";
import Link from "next/link";
import { getCategoriesWithCounts, getProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import CatalogFilters from "@/components/CatalogFilters";
import { Ornament } from "@/components/Icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الكتالوج",
  description: "تصفّح كتالوج NAQSH | نقش من التابلوهات وديكورات الحائط.",
};

type SP = Promise<{ q?: string; category?: string; sort?: string; page?: string }>;

export default async function CatalogPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const category = sp.category ?? "";
  const sort = sp.sort ?? "newest";
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);

  const [categories, result] = await Promise.all([
    getCategoriesWithCounts(),
    getProducts({ q, category: category || undefined, sort, page, pageSize: 12 }),
  ]);
  const totalAll = categories.reduce((s, c) => s + c.count, 0);
  const totalPages = Math.max(1, Math.ceil(result.total / result.pageSize));

  const pageHref = (n: number) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (category) p.set("category", category);
    if (sort !== "newest") p.set("sort", sort);
    if (n > 1) p.set("page", String(n));
    const s = p.toString();
    return s ? `/catalog?${s}` : "/catalog";
  };

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-14 text-center text-cream">
        <div className="pattern-gold absolute inset-0 opacity-[0.07]" />
        <div className="relative px-5">
          <p className="font-bold text-gold-light">كتالوج NAQSH</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">اكتشف تشكيلتنا</h1>
          <p className="mx-auto mt-3 max-w-xl text-cream/70">
            ابحث بالاسم أو الكود، ثم اطلب المنتج مباشرة عبر واتساب.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <CatalogFilters categories={categories} q={q} category={category} sort={sort} totalAll={totalAll} />

        <p className="mt-8 text-sm text-ink/60">
          {result.total} {result.total === 1 ? "منتج" : "منتج"}
        </p>

        {result.items.length === 0 ? (
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-dashed border-gold/50 bg-white/60 px-6 py-14 text-center">
            <Ornament className="mx-auto h-10 w-10 text-gold" />
            <p className="mt-4 font-display text-lg font-bold">
              {q || category ? "لا توجد منتجات مطابقة" : "لا توجد منتجات بعد"}
            </p>
            <p className="mt-2 text-sm text-ink/60">
              {q || category ? "جرّب تغيير كلمات البحث أو التصنيف." : "سيتم إضافة المنتجات قريباً."}
            </p>
            {(q || category) && (
              <Link href="/catalog" className="btn btn-dark mt-5">عرض كل المنتجات</Link>
            )}
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {result.items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-3">
            {result.page > 1 && (
              <Link href={pageHref(result.page - 1)} className="btn btn-outline !py-2">→ السابق</Link>
            )}
            <span className="text-sm font-bold">
              صفحة {result.page} من {totalPages}
            </span>
            {result.page < totalPages && (
              <Link href={pageHref(result.page + 1)} className="btn btn-outline !py-2">التالي ←</Link>
            )}
          </nav>
        )}
      </section>
    </>
  );
}
