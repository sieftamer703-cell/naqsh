import Link from "next/link";
import { count, eq } from "drizzle-orm";
import { db } from "@/db";
import { categories, products } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [[p], [c], [f]] = await Promise.all([
    db.select({ n: count() }).from(products),
    db.select({ n: count() }).from(categories),
    db.select({ n: count() }).from(products).where(eq(products.featured, true)),
  ]);

  const stats = [
    { label: "المنتجات", value: p.n, href: "/admin/products" },
    { label: "التصنيفات", value: c.n, href: "/admin/categories" },
    { label: "منتجات مميزة", value: f.n, href: "/admin/products" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">لوحة التحكم</h1>
      <p className="mt-2 text-ink/60">أدر تصنيفات ومنتجات كتالوج نقش من هنا.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-2xl border border-gold/30 bg-white p-6 transition hover:shadow-lg">
            <p className="text-sm text-ink/60">{s.label}</p>
            <p className="mt-2 font-display text-4xl font-bold text-gold-dark">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/categories" className="btn btn-outline">إدارة التصنيفات</Link>
        <Link href="/admin/products/new" className="btn btn-gold">+ إضافة منتج جديد</Link>
      </div>
    </div>
  );
}
